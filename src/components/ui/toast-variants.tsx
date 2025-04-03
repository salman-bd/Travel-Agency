import { toast } from "sonner"

export const showSuccessToast = (title: string, message: string) => {
  toast(title, {
    description: message,
    className: "bg-green-50 border-green-200 text-green-800",
  })
}

export const showErrorToast = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    className: "bg-red-50 border-red-200 text-red-800",
  })
}

export const showInfoToast = (title: string, message: string) => {
  toast.info(title, {
    description: message,
    className: "bg-blue-50 border-blue-200 text-blue-800",
  })
}

export const showWarningToast = (title: string, message: string) => {
  toast.warning(title, {
    description: message,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
  })
}

