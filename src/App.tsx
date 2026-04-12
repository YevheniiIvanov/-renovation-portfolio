import { motion, useReducedMotion } from 'framer-motion'
import { CookieBar } from './components/legal/CookieBar'
import { PrivacySection } from './components/legal/PrivacySection'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Portfolio } from './components/sections/Portfolio'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'

function App() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="min-h-screen bg-surface"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <PrivacySection />
      </main>
      <Footer />
      <CookieBar />
    </motion.div>
  )
}

export default App
