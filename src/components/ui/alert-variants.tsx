import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const alertVariantStyles = cva("", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 bg-destructive/10 text-destructive",
      success: "border-green-200 bg-green-50 text-green-800",
      info: "border-info/50 bg-info/10 text-info",
      warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface CustomAlertProps {
  variant?: "default" | "destructive" | "success" | "info" | "warning"
  title?: string
  description: string
  className?: string
}

export function CustomAlert({ variant = "default", title, description, className }: CustomAlertProps) {
  return (
    <Alert className={cn(alertVariantStyles({ variant }), className)}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

