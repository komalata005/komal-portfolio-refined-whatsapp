import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Process from './components/Process'
import Experience from './components/Experience'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import CaseStudy from './components/CaseStudy'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'
import { EmailDialogProvider } from './components/EmailPopup'

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
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
        <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-midnight dark:text-[#EDE7F8]">
          <ScrollProgress />
          <CustomCursor />
          {match ? <CaseStudy slug={decodeURIComponent(match[1])} /> : <Home />}
        </div>
        </EmailDialogProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
