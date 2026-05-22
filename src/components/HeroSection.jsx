import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi2';
import SearchBar from './SearchBar.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection({ query, onQueryChange }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20"
    >
      <BlobBackdrop />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-balance font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-ink-900 dark:text-ink-50"
        >
          Discover the{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-ember-500 via-ember-600 to-ember-700 bg-clip-text text-transparent italic">
              richest flavors
            </span>
            <Underline />
          </span>{' '}
          from around the globe.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-balance text-base sm:text-lg leading-relaxed text-ink-600 dark:text-ink-300"
        >
          Browse thousands of recipes from around the world. Search by name, filter by cuisine, and
          save the ones that make you hungry.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mx-auto mt-10 max-w-xl"
        >
          <SearchBar
            value={query}
            onChange={onQueryChange}
            size="lg"
            placeholder="Try ‘pasta’, ‘chicken’, or ‘dessert’…"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href="#recipes"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-600 dark:text-ink-300 hover:text-ember-600 dark:hover:text-ember-400 transition-colors cursor-pointer"
          >
            Browse recipes
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
              className="text-ember-500"
            >
              <HiArrowDown />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-2 w-full text-ember-400/70"
    >
      <motion.path
        d="M2 8 C 60 2, 140 2, 198 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

function BlobBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -left-16 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-ember-300/40 dark:bg-ember-600/20 blur-3xl animate-blob" />
      <div
        className="absolute -top-10 right-0 h-72 w-72 sm:h-[28rem] sm:w-[28rem] rounded-full bg-amber-200/50 dark:bg-amber-700/15 blur-3xl animate-blob"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-72 w-72 sm:h-96 sm:w-96 -translate-x-1/2 rounded-full bg-rose-200/40 dark:bg-rose-700/15 blur-3xl animate-blob"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  );
}
