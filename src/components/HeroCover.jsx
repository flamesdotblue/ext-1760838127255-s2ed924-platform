import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroCover({ onStart, onCreateNote }) {
  return (
    <div className="relative h-[60vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/10 to-white dark:from-neutral-950/10 dark:via-neutral-950/10 dark:to-neutral-950" />

      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300">
            Minimal Notepad
          </h1>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            A clean, modern space to write. Fast, distraction-free, and always in sync with your browser.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={onCreateNote}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 hover:opacity-90 transition"
            >
              Start a new note
            </button>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition"
            >
              Explore interface
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
