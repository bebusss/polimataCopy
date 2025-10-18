import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would integrate with the backend API
  }

  return (
    <section id="contactform" className="py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-6">
            Platiquemos sobre{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Potencializar tu Operación con AI
            </span>
          </h2>
          <p className="text-xl text-gray-300">Agenda tu llamada de diagnóstico gratuita</p>
          <p className="text-gray-400">Para entender tus desafíos y proponerte una solución a la medida</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Juan Sanchez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="jsanchez@polimata.ai"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Compañía</label>
            <input
              type="text"
              placeholder="Polímata.AI"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">¿Qué necesita tu negocio?</label>
            <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Selecciona</option>
              <option value="automation">Automatización</option>
              <option value="ai-agents">Agentes IA</option>
              <option value="development">Desarrollo a medida</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all"
          >
            Quiero mi llamada
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
