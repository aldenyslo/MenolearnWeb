import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const ErrorMessage = ({
  message,
}: {
  message: string
}) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
    // <p className="text-red-700 text-sm font-semibold text-left ml-2 mb-1">
    //   {message}
    // </p>
  )
}

export default ErrorMessage
