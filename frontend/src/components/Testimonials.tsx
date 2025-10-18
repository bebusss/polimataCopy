import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-32 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">Clientes que confían en nosotros</h2>
          <p className="text-xl text-gray-300">
            Descubre cómo nuestras soluciones han transformado los negocios de nuestros clientes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <p className="text-gray-300 mb-6">
                "Excelente servicio y resultados impresionantes con la implementación de IA."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600" />
                <div>
                  <div className="font-semibold">Cliente {i}</div>
                  <div className="text-sm text-gray-400">CEO</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
