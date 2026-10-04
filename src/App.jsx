import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Process from './components/Process'
import Experience from './components/Experience'
import About from './components/About'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import CaseStudy from './components/CaseStudy'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'
import { EmailDialogProvider } from './components/EmailPopup'
import WhatsAppChat from './components/WhatsAppChat'

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Process />
        <Experience />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  const match = path.match(/^\/case-study\/([^/]+)$/)

  return (
    <ThemeProvider>
      <LocaleProvider>
        <EmailDialogProvider>
        <div className="min-h-screen bg-paper bg-[radial-gradient(ellipse_at_top,_rgba(167,139,219,0.16),_transparent_48%),radial-gradient(ellipse_at_bottom_right,_rgba(90,62,142,0.1),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(212,194,245,0.14),_transparent_42%)] text-ink transition-colors duration-300 dark:bg-midnight dark:bg-none dark:text-[#EDE7F8]">
          <ScrollProgress />
          <WhatsAppChat />
          {match ? <CaseStudy slug={decodeURIComponent(match[1])} /> : <Home />}
        </div>
        </EmailDialogProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
