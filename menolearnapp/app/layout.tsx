import type { Metadata } from "next"
import { Poppins as FontSans } from "next/font/google"
import "./globals.css"

import Header from "@/components/Header"
import Providers from "@/components/Providers"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "MenoLearn",
  description:
    "MenoLearn, the place for menopause education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "scroll-smooth font-sans text-blue-800 from-grey-100 from-60% to-blue-100 to-100%",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </Providers>
    </html>
  )
}
