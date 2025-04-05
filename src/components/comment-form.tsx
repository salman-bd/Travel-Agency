"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { submitComment } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

const commentSchema = z.object({
  comment: z.string().min(3, { message: "Comment must be at least 3 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  saveInfo: z.boolean().default(false),
})

type CommentFormValues = z.infer<typeof commentSchema>

interface CommentFormProps {
  blogId: string
}

export default function CommentForm({ blogId }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Get saved info from localStorage if available
  const savedInfo =
    typeof window !== "undefined"
      ? {
          name: localStorage.getItem("comment-name") || "",
          email: localStorage.getItem("comment-email") || "",
          website: localStorage.getItem("comment-website") || "",
        }
      : { name: "", email: "", website: "" }

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
      name: savedInfo.name,
      email: savedInfo.email,
      website: savedInfo.website,
      saveInfo: false,
    },
  })

  async function onSubmit(data: CommentFormValues) {
    setIsSubmitting(true)

    try {
      // Save info to localStorage if requested
      if (data.saveInfo) {
        localStorage.setItem("comment-name", data.name)
        localStorage.setItem("comment-email", data.email)
        localStorage.setItem("comment-website", data.website || "")
      }

      const result = await submitComment({
        blogId,
        content: data.comment,
        name: data.name,
        email: data.email,
        website: data.website || "",
      })

      if (result.success) {
        toast({
          title: "Comment submitted",
          description: "Your comment has been submitted successfully and is awaiting approval.",
        })
        form.reset({
          comment: "",
          name: data.saveInfo ? data.name : "",
          email: data.saveInfo ? data.email : "",
          website: data.saveInfo ? data.website : "",
          saveInfo: data.saveInfo,
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to submit comment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Comment *</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your comment here..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email *</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourwebsite.com" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="saveInfo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Save my name, email, and website in this browser for the next time I comment.</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-full bg-black px-8 py-4 text-lg font-medium text-white hover:bg-black/90 h-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </Button>
      </form>
    </Form>
  )
}

