import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight, HiMapPin } from 'react-icons/hi2';
import FavoritesButton from './FavoritesButton.jsx';
import { formatMealName } from '../utils/helpers.js';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RecipeCard({ recipe, onOpen, isFavorite, onToggleFavorite }) {
  const [loaded, setLoaded] = useState(false);
  const displayName = formatMealName(recipe.strMeal);

  const handleOpen = () => onOpen?.(recipe.idMeal);

  return (
    <motion.article
      variants={cardVariants}
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/60 dark:border-ink-800/60 bg-white/70 dark:bg-ink-900/60 backdrop-blur-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100 dark:bg-ink-800">
        {!loaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={recipe.strMealThumb}
          alt={displayName}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-[1.06] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/0 to-ink-950/0" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {recipe.strCategory && (
            <Badge>{recipe.strCategory}</Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <FavoritesButton
            active={isFavorite}
            onClick={() => onToggleFavorite?.(recipe.idMeal)}
            size="sm"
          />
        </div>

        {recipe.strArea && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white">
            <HiMapPin className="text-[10px]" />
            {recipe.strArea}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg leading-snug text-ink-900 dark:text-ink-50 line-clamp-2 group-hover:text-ember-700 dark:group-hover:text-ember-300 transition-colors">
          {displayName}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
            View recipe
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ember-50 dark:bg-ember-500/15 text-ember-600 dark:text-ember-300 transition-all duration-300 group-hover:bg-ember-500 group-hover:text-white">
            <HiArrowUpRight className="transition-transform duration-300 group-hover:rotate-12" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-ink-900/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ember-700 dark:text-ember-300 shadow-sm">
      {children}
    </span>
  );
}
