import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Features from './components/Features'
import Solutions from './components/Solutions'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ChatButton from './components/ChatButton'

function App() {
  return (
    <div className="min-h-screen bg-[#0A0E28] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Partners />
      <Features />
      <Solutions />
      <Process />
      <Testimonials />
      <ContactForm />
      <FAQ />
      <Footer />
      <ChatButton />
    </div>
  )
}

export default App
