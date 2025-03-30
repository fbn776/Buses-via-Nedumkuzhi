import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bus Timings via Nedumkuzhi',
  description: 'Get the timings of buses from Nedumkuzhi to various locations',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
