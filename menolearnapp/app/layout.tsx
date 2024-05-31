import type { Metadata } from "next"
import {
  Inter,
  Volkhov,
  Josefin_Sans,
  Poppins,
} from "next/font/google"
import "./globals.css"

import Header from "@/components/Header"
import Providers from "@/components/Providers"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
          className={`${poppins.variable} border-2 h-screen scroll-smooth font-poppins text-blue-800 from-grey-100 from-60% to-blue-100 to-100%`}
        >
          {children}
        </body>
      </Providers>
    </html>
  )
}
