import type { Metadata } from "next"
import { GeistSans, GeistMono } from 'geist/font'
import "./globals.css"
import { MarketingCampaignProvider } from '@/contexts/MarketingCampaignContext'

export const metadata: Metadata = {
  title: "Marketing Campaign Designer",
  description: "Design your in-game marketing campaign",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <MarketingCampaignProvider>
          <main className="container mx-auto p-4">{children}</main>
        </MarketingCampaignProvider>
      </body>
    </html>
  )
}

