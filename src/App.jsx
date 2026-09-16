import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Process from './components/Process'
import Experience from './components/Experience'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <div className="min-h-screen bg-paper text-ink transition-colors duration-300 dark:bg-midnight dark:text-[#EDE7F8]">
          <ScrollProgress />
          <CustomCursor />
          <main><Nav />
          <Hero /><Work /><Process /><Experience /></main>
          <Footer />
        </div>
      </LocaleProvider>
    </ThemeProvider>
  )
}
