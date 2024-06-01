const ErrorMessage = ({
  message,
}: {
  message: string | undefined
}) => {
  return (
    <p className="text-red-700 text-sm font-semibold text-left ml-2 mb-1">
      {message}
    </p>
  )
}

export default ErrorMessage
