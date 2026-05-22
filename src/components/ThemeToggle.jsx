import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200/70 dark:border-ink-700/70 bg-white/70 dark:bg-ink-900/70 backdrop-blur-md text-ink-700 dark:text-ink-200 hover:text-ember-600 dark:hover:text-ember-400 transition-colors duration-200 shadow-sm cursor-pointer ${className}`}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="text-lg"
      >
        {isDark ? <HiSun /> : <HiMoon />}
      </motion.span>
    </button>
  );
}
