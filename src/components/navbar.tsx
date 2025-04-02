"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span className="ml-2 text-xl font-bold">REBEL ROVER</span>
          </div>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/"
            className={cn("text-sm font-medium transition-colors hover:text-primary", isActive("/") && "text-primary")}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/about") && "text-primary",
            )}
          >
            About Us
          </Link>
          <Link
            href="/destinations"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/destinations") && "text-primary",
            )}
          >
            Destinations
          </Link>
          <Link
            href="/travel-stories"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/travel-stories") && "text-primary",
            )}
          >
            Travel Stories
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/contact") && "text-primary",
            )}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>{session.user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container mx-auto px-4 pb-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") && "text-primary",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/about") && "text-primary",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/destinations"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/destinations") && "text-primary",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="/travel-stories"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/travel-stories") && "text-primary",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Travel Stories
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/contact") && "text-primary",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t border-gray-200 pt-4">
              {status === "authenticated" ? (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{session.user.name}</span>
                  </div>
                  <Link
                    href="/bookings"
                    className="block py-2 text-sm hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="block py-2 text-sm hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                      setIsMenuOpen(false)
                    }}
                    className="mt-2 flex w-full items-center gap-2 text-sm text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

