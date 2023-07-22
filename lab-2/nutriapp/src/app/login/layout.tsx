
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login route',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
       suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
