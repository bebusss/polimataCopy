import { motion } from 'framer-motion'

export default function Process() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">¿Cómo funciona?</h2>
          <p className="text-xl text-gray-300">
            Descubre cómo transformamos tus operaciones mediante un enfoque sistemático y personalizado
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((step) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl font-bold">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-3">Paso {step}</h3>
              <p className="text-gray-400">Proceso optimizado</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
