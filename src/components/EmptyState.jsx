import { motion } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';

const ICONS = {
  empty: HiOutlineMagnifyingGlass,
  favorites: HiOutlineHeart,
  error: HiOutlineExclamationTriangle,
};

const TONES = {
  empty: 'from-ember-200 to-ember-400 text-ember-700',
  favorites: 'from-rose-200 to-ember-400 text-ember-700',
  error: 'from-amber-200 to-rose-400 text-rose-700',
};

export default function EmptyState({
  variant = 'empty',
  title,
  description,
  actionLabel,
  onAction,
}) {
  const Icon = ICONS[variant] ?? ICONS.empty;
  const tone = TONES[variant] ?? TONES.empty;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-md text-center py-16 sm:py-24"
    >
      <div className={`mx-auto inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${tone} shadow-card`}>
        <Icon className="text-3xl" />
      </div>
      <h3 className="mt-6 font-display text-2xl text-ink-900 dark:text-ink-50">{title}</h3>
      <p className="mt-2 text-ink-600 dark:text-ink-400">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full bg-gradient-ember text-white text-sm font-medium shadow-md shadow-ember-500/30 hover:shadow-lg hover:shadow-ember-500/40 transition-shadow duration-200 cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
