import type { Metadata } from "next"
import {
  Inter,
  Volkhov,
  Josefin_Sans,
} from "next/font/google"
import "./globals.css"

import Header from "@/components/Header"
import Providers from "@/components/Providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const volkhov = Volkhov({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-volkhov",
})

const josefin_sans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-josefin-sans",
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
          className={`${volkhov.variable} ${josefin_sans.variable} bg-white grid justify-center mx-auto my-4 ${inter.variable}`}
        >
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  )
}
