import { motion } from 'motion/react'

export default function Button() {
  return (
    <motion.button
      className={[
        // core
        'text-sm bg-white py-2 px-4 rounded-lg tracking-tight',
        // shadow & hover
        'shadow-elevated hover:shadow-rised transition-shadow ease-in-out duration-300',
        // focus
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600/70',
      ].join(' ')}
      type="button"
      aria-label="Provide feedback"
    >
      <span>Feedback</span>
    </motion.button>
  )
}
