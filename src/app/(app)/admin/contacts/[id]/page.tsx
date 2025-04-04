"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { Mail, User, Calendar, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getContactById, respondToContact } from "@/lib/actions"

export default async function ContactDetailsPage({ params }: { params: { id: string } }) {
  const contact = await getContactById(params.id)

  if (!contact) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Contact Message</h2>
          <p className="text-muted-foreground">View and respond to contact message from {contact.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard/contacts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contacts
            </Button>
          </Link>
          <form action={respondToContact.bind(null, contact.id)}>
            <Button
              type="submit"
              size="sm"
              variant={contact.responded ? "outline" : "default"}
              disabled={contact.responded}
              className={contact.responded ? "bg-gray-100 hover:bg-gray-100" : "bg-[#069aba] hover:bg-[#069aba]/90"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {contact.responded ? "Marked as Responded" : "Mark as Responded"}
            </Button>
          </form>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl font-bold">{contact.subject}</CardTitle>
              <Badge
                variant={contact.responded ? "outline" : "default"}
                className={contact.responded ? "border-green-500 text-green-500" : "bg-[#069aba]"}
              >
                {contact.responded ? "Responded" : "New Message"}
              </Badge>
            </div>
            <CardDescription className="flex flex-col space-y-1 text-sm text-muted-foreground md:flex-row md:items-center md:space-x-2 md:space-y-0">
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{contact.name}</span>
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center">
                <Mail className="mr-1 h-4 w-4" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{format(new Date(contact.createdAt), "PPP 'at' p")}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm">{contact.message}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 px-6 py-4">
            <div className="flex w-full flex-col space-y-2">
              <h4 className="text-sm font-medium">Quick Reply</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, "_blank")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${contact.phone || ""}`, "_blank")}
                  disabled={!contact.phone}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

