import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default:  'Leadership Infrastructure Systems',
    template: '%s | Leadership Infrastructure Systems',
  },
  description: 'A structured diagnostic and implementation methodology for organisations scaling under leadership pressure.',
  robots: { index: true, follow: true },
  openGraph: {
    title:       'Leadership Infrastructure Systems',
    description: 'Diagnose and fix the structural leadership problems that emerge as companies scale.',
    type:        'website',
    siteName:    'Leadership Infrastructure Systems',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Leadership Infrastructure Systems',
    description: 'Diagnose and fix the structural leadership problems that emerge as companies scale.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // scroll-smooth and font-smoothing are set in globals.css — no class duplication needed
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface text-ink">
        <Navigation />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
