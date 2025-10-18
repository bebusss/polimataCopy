import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from './Icons'

const faqs = [
  {
    question: 'Mi negocio hace X, ¿lo que hacen me ayudará?',
    answer: 'Trabajamos con empresas de todos los tamaños y sectores. Nuestras soluciones son personalizadas.'
  },
  {
    question: '¿Qué modelos LLM usan?',
    answer: 'Utilizamos los mejores modelos del mercado: GPT-4, Claude, Llama, entre otros, dependiendo de la necesidad.'
  },
  {
    question: '¿Cuánto cuestan sus servicios?',
    answer: 'Los costos varían según el proyecto. Agenda una llamada diagnóstico para una cotización personalizada.'
  },
  {
    question: '¿Por qué ustedes y no la competencia?',
    answer: 'Combinamos experiencia técnica con entendimiento profundo de negocio y atención personalizada.'
  },
  {
    question: '¿Cuánto tiempo se tardan?',
    answer: 'Depende del alcance. Proyectos pueden tomar desde 2 semanas hasta varios meses.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Preguntas Frecuentes</h2>
          <p className="text-gray-400">¿No encontraste lo que buscas? Contáctanos.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="text-left font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 py-4 bg-white/5">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
