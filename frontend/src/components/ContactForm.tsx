import { motion } from 'framer-motion'
import { useState } from 'react'
import { contactAPI } from '../lib/api'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Construir el mensaje completo
      const message = `Servicio solicitado: ${formData.service || 'No especificado'}
Compañía: ${formData.company || 'No especificada'}

${formData.message}`

      await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: message
      })

      setSubmitStatus('success')
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        service: ''
      })

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error.response?.data?.detail || 'Error al enviar el formulario. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
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

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">¿Qué necesita tu negocio?</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="">Selecciona</option>
              <option value="automation">Automatización</option>
              <option value="ai-agents">Agentes IA</option>
              <option value="development">Desarrollo a medida</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Mensaje (opcional)</label>
            <textarea
              placeholder="Cuéntanos más sobre tu proyecto..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400"
            >
              ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400"
            >
              {errorMessage}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !formData.name || !formData.email}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Quiero mi llamada'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
