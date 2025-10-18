import { motion } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle } from './Icons'
import { scrollToSection } from '../lib/utils'

export default function ChatButton() {
  const [showTooltip, setShowTooltip] = useState(true)

  const handleClick = () => {
    // Opción 1: Scroll al formulario de contacto
    scrollToSection('contactform')

    // Opción 2: Abrir WhatsApp (descomenta para usar)
    // const whatsappNumber = '525512345678' // Reemplazar con número real
    // const message = encodeURIComponent('Hola! Me gustaría cotizar un ChatBot')
    // window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')

    setShowTooltip(false)
  }

  return (
    <>
      {showTooltip && (
        <motion.div
          className="fixed bottom-32 right-8 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div className="bg-white text-black px-4 py-2 rounded-lg shadow-xl mb-2">
            Te gustaría cotizar un 🤖 ChatBot?
          </div>
          <div className="bg-white text-black px-4 py-2 rounded-lg shadow-xl text-sm">
            Click aquí para conocer más!
          </div>
        </motion.div>
      )}

      <motion.button
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </>
  )
}
