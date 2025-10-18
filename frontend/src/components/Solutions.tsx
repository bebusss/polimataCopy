import { motion } from 'framer-motion'
import { Bot, Workflow, Code } from './Icons'

const solutions = [
  {
    icon: Workflow,
    title: 'Automatizaciones',
    description: 'Imagina ese proceso interno que consume mucho tiempo y es muy manual. Nosotros lo automatizamos para que tu equipo pueda centrarse en tareas de alto valor.',
    stats: [
      { label: 'Integraciones con tus sistemas', value: '100%' },
      { label: 'Programadas para ejecutarse', value: '24/7' },
    ],
  },
  {
    icon: Bot,
    title: 'Agentes de Voz y Texto',
    description: 'Creamos Agentes AI públicos e internos que verdaderamente resuelven. Desde contestar preguntas básicas y filtrar prospectos, hasta cotizar, agendar llamadas, validar documentos (KYC), analizar estados financieros, asistentes/wiki, crear cuentas o lo que se te ocurra.',
    stats: [
      { label: 'Mensajes enviados al día', value: '120k+' },
      { label: 'Lenguaje humano', value: '9.2%' },
      { label: 'Customer Support', value: '24/7' },
    ],
    highlight: 'AI generativo libre de alucinaciones',
  },
  {
    icon: Code,
    title: 'Desarrollos a la medida',
    description: 'Diseñamos sistemas y plataformas desde cero, adaptados a tus necesidades, y potenciamos tus productos con inteligencia artificial para que destaquen en el mercado. Desarrollamos Sistemas de Gestión de Información, tableros a la medida, CRMs, ERPs y apps de cualquier tipo, de forma más rápida, accesible ($) y personalizada que las soluciones genéricas del mercado.',
  },
]

export default function Solutions() {
  return (
    <section className="py-32 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6">
            Tus problemas resueltos con nuestras soluciones
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Con soluciones eficientes a problemas reales, hemos trabajado con agencias de marketing,
            empresas de logística, desarrolladores de software y negocios de diferentes tamaños para
            implementar procesos inteligentes habilitados por AI
          </p>
        </motion.div>

        <div className="space-y-32">
          {solutions.map((solution, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-white/10 backdrop-blur-sm">
                  <solution.icon className="w-16 h-16 mb-6 text-blue-400" />
                  <h3 className="text-3xl font-bold mb-4">{solution.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {solution.description}
                  </p>

                  {solution.stats && (
                    <div className="mt-8 grid grid-cols-2 gap-6">
                      {solution.stats.map((stat, j) => (
                        <div key={j} className="p-4 bg-white/5 rounded-xl">
                          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {solution.highlight && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl">
                      <p className="text-green-400 font-semibold">{solution.highlight}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <motion.div
                  animate={{
                    rotateY: [0, 10, 0],
                    rotateX: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl border border-white/10 flex items-center justify-center"
                >
                  <solution.icon className="w-32 h-32 text-blue-400/30" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
