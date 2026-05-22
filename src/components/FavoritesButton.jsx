import { motion } from 'framer-motion';
import { HiHeart } from 'react-icons/hi2';

export default function FavoritesButton({ active, onClick, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-11 w-11 text-lg',
  };
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`relative inline-flex items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200 cursor-pointer ${
        active
          ? 'border-ember-500 bg-ember-500 text-white shadow-md shadow-ember-500/30'
          : 'border-white/70 bg-white/70 text-ink-700 hover:text-ember-600 dark:border-ink-700/70 dark:bg-ink-900/70 dark:text-ink-200 dark:hover:text-ember-400'
      } ${sizes[size]} ${className}`}
    >
      <motion.span
        key={active ? 'on' : 'off'}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      >
        <HiHeart />
      </motion.span>
    </button>
  );
}
