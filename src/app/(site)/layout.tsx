import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './chrome.css'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  )
}
