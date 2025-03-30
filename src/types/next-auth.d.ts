import type { Role } from "@prisma/client"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: Role
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    exp?: number
  }
}

