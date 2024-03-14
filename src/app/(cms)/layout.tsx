export const metadata = {
  title: 'CMS Landi Academy',
  description: 'A CMS for Landi Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
