import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcryptjs"
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import db from "@/lib/db"
import { sendWelcomeEmail } from "@/lib/email"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
    verifyRequest: "/verify-email",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      version: "2.0",
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

        const user = await db.user.findUnique({
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
        if (!user.emailVerified && user.verificationToken) {
          throw new Error("EMAIL_NOT_VERIFIED")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // If user signs in with OAuth provider, mark them as verified
      if (account && account.provider !== "credentials") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        })

        // If this is a new user signing in with OAuth
        if (!existingUser) {
          // Create the user with emailVerified
          await db.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date(),
              verificationToken: null,
            },
          })

          // Send welcome email
          if (user.email) {
            await sendWelcomeEmail(user.email, user.name || "User")
          }
        }
        return true
      }

      return true
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date | null
      }
      return session
    },
    async jwt({ token, user, account, profile, credentials }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role

        // Get additional user data from database
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { emailVerified: true },
        })

        if (dbUser) {
          token.emailVerified = dbUser.emailVerified
        }

        // If this is a social login and first time
        if (account && account.provider !== "credentials") {
          // Send welcome email for new social users
          if (account.providerAccountId && !token.emailVerified) {
            // This would be handled in the signIn callback
          }
        }
      }

      // Return previous token if the user hasn't changed
      if (Date.now() < (token.exp as number) * 1000) {
        return token
      }

      // Refresh the token if needed
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          emailVerified: true,
        },
      })

      if (!dbUser) {
        return token
      }

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        emailVerified: dbUser.emailVerified,
        exp: Math.floor(Date.now() / 1000) + (credentials?.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24), // 30 days if remember me is checked, otherwise 1 day
      }
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // If this is a new user signing in with OAuth
      if (isNewUser && account && account.provider !== "credentials") {
        // Send welcome email
        if (user.email) {
          await sendWelcomeEmail(user.email, user.name || "User")
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

