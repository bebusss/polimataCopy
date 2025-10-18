import { motion } from 'framer-motion'

const partners = [
  'Together.ai', 'Meta', 'Mistral AI', 'Anthropic', 'OpenAI',
  'Google', 'Perplexity', 'Cohere', 'Groq'
]

export default function Partners() {
  return (
    <section className="py-20 border-y border-white/10">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          Construimos junto con los mejores avances en AI
        </motion.p>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center text-gray-400 font-semibold hover:text-white transition-colors"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
