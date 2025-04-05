import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import prisma from "@/lib/db"
import { compare } from "bcryptjs"
import type { User as NextAuthUser } from "next-auth"
import { sendWelcomeEmail } from "@/lib/sendEmails"



interface User extends NextAuthUser {
  id: string
  email: string
  name: string
  isVerified: boolean
  image?: string
  role: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user || !user.password) {
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        // Check if user is verified
        if (!user.isVerified && user.verificationCode) {
          throw new Error("EMAIL_NOT_VERIFIED")
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } as User
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For social logins, we need to handle additional data that the adapter doesn't store
      if (account?.provider && ["google", "github", "facebook"].includes(account.provider)) {
        const email = profile?.email
        if (!email) {
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account, profile }) {
      // console.log('Account data in JWT :', account);
      // console.log('User data in JWT :', user);
      // console.log('User profile in JWT :', profile);
      
      // Initial sign in
      if (account && user) {
        // For social logins, update the user with additional data
        if (["google", "github", "facebook"].includes(account.provider)) {
          try {
            // Find the user that was just created by the adapter
            const dbUser = await prisma.user.findUnique({
              where: { email: user.email! },
            })
            if (dbUser) {
              // Update with additional fields
              const updatedUser = await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                  emailVerified: new Date(),
                  isVerified: true,
                },
              })
              // console.log('Updated User: ', updatedUser);
              
              // If this is a new user, send welcome email
              if (updatedUser.createdAt && new Date().getTime() - new Date(updatedUser.createdAt).getTime() < 60000) {
                // User was created less than a minute ago, likely new
                try {
                  await sendWelcomeEmail(user.email, user.name)
                } catch (emailError) {
                  console.error("Failed to send welcome email:", emailError)
                }
              }
              // Update token with user data
              token.id = updatedUser.id
              token.isVerified = updatedUser.isVerified
            }
          } catch (error) {
            console.error("Error updating user in JWT callback:", error)
          }
        } else {
          // For credentials provider
          token.id = user.id
          token.isVerified = user.isVerified
          token.role = user.role
        }
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isVerified = token.isVerified as boolean
      }
      console.log('Session: ', session);
      return session
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
    // newUser: "/welcome",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
