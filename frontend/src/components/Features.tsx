import { motion } from 'framer-motion'
import { Zap, TrendingUp, Shield } from './Icons'

const features = [
  {
    icon: Zap,
    title: 'Revoluciona tu operación',
    description: 'Agentes que resuelven y potencializan tus procesos internos y de experiencia del cliente',
  },
  {
    icon: TrendingUp,
    title: 'Ahorra tiempo, aumenta eficiencia',
    description: 'Automatiza tareas repetitivas y enfoca tus recursos en lo que realmente importa',
    metric: '+62 Proyectos AI',
  },
  {
    icon: Shield,
    title: 'Confianza y seguridad en mente',
    description: 'Protegemos tus datos con los más altos estándares de seguridad',
  },
]

const integrations = [
  ['Integraciones APIs', 'Data Lake', 'Cybersecurity', 'Decentralized'],
  ['CRM', 'Whatsapp', 'Powerful APIs', 'Cybersecurity'],
  ['ERP', 'Safe Space', 'Supply Chain', 'Scalable'],
]

export default function Features() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Simplificamos tu operación con{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm group hover:border-blue-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 rounded-2xl transition-all" />

              <div className="relative z-10">
                <feature.icon className="w-12 h-12 mb-6 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                {feature.metric && (
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {feature.metric}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Nos integramos a tus procesos
          </h3>

          <div className="relative overflow-hidden h-64">
            {integrations.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="flex gap-6 mb-6 absolute"
                style={{ top: `${rowIndex * 80}px` }}
                animate={{
                  x: rowIndex % 2 === 0 ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...row, ...row, ...row].map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm hover:border-blue-500/50 transition-colors whitespace-nowrap"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
