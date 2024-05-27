// export { auth as middleware } from "@/auth"

import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const reqUrl = new URL(req.url)
  if (
    !req.auth &&
    reqUrl?.pathname !== "/auth/signin" &&
    reqUrl?.pathname !== "/auth/register"
  ) {
    return NextResponse.redirect(
      new URL(
        `/auth/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    )
  }
})

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
}
