import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { respondToContact } from "@/lib/actions"
import db from "@/lib/db"
import { formatDistanceToNow } from "date-fns"
import { Mail, Calendar, CheckCircle } from "lucide-react"

export default async function ContactsPage() {
  // Get contacts from database
  const contacts = await db.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-500 mt-1 md:mt-0">Manage customer inquiries</p>
      </div>

      {contacts.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Mail className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-center text-gray-500 text-lg">No contact messages yet</p>
            <p className="text-center text-gray-400 text-sm mt-1">When customers send inquiries, they'll appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden border-none shadow-md">
              <CardHeader className="flex flex-row items-start justify-between pb-2 border-b">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-gray-900">{contact.subject}</CardTitle>
                    <Badge
                      variant={contact.responded ? "outline" : "default"}
                      className={
                        contact.responded
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-[#069aba] hover:bg-[#069aba]/90"
                      }
                    >
                      {contact.responded ? "Responded" : "New"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="font-medium">{contact.name}</span>
                    <span>•</span>
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="whitespace-pre-wrap text-gray-700">{contact.message}</p>
                </div>
                <div className="flex justify-end">
                  {!contact.responded && (
                    <form
                      action={async () => {
                        "use server"
                        await respondToContact(contact.id)
                      }}
                    >
                      <Button type="submit" className="bg-[#069aba] hover:bg-[#069aba]/90">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Responded
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

