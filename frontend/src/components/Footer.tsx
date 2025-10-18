import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Potencia el progreso de tu organización con{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              soluciones AI
            </span>
          </motion.h3>
        </div>

        <div className="text-center text-gray-400">
          <p>Copyright © 2022 - 2035 Polímata.AI</p>
        </div>
      </div>
    </footer>
  )
}
