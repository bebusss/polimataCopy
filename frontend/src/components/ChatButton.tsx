import { motion } from 'framer-motion'
import { MessageCircle } from './Icons'

export default function ChatButton() {
  return (
    <>
      <motion.div
        className="fixed bottom-32 right-8 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-white text-black px-4 py-2 rounded-lg shadow-xl mb-2">
          Te gustaría cotizar un 🤖 ChatBot?
        </div>
        <div className="bg-white text-black px-4 py-2 rounded-lg shadow-xl text-sm">
          Click aquí para conocer más!
        </div>
      </motion.div>

      <motion.button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/50"
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
