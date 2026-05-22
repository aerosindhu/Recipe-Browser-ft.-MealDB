import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiXMark,
  HiMapPin,
  HiTag,
  HiPlayCircle,
  HiOutlineBookOpen,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import FavoritesButton from './FavoritesButton.jsx';
import { ModalSkeleton } from './Loader.jsx';
import {
  extractIngredients,
  formatInstructions,
  formatMealName,
  getYoutubeEmbed,
} from '../utils/helpers.js';

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const dialog = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 26 },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function RecipeModal({ recipe, loading, onClose, isFavorite, onToggleFavorite }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const ingredients = recipe ? extractIngredients(recipe) : [];
  const steps = recipe ? formatInstructions(recipe.strInstructions) : [];
  const youtube = recipe ? getYoutubeEmbed(recipe.strYoutube) : null;
  const displayName = recipe ? formatMealName(recipe.strMeal) : '';

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-md" />

      <motion.div
        ref={dialogRef}
        variants={dialog}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-4xl max-h-[100vh] sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-3xl bg-cream-50 dark:bg-ink-900 border border-white/60 dark:border-ink-800/70 shadow-glass-lg flex flex-col"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 dark:bg-ink-900/85 backdrop-blur-md text-ink-800 dark:text-ink-100 hover:text-ember-600 dark:hover:text-ember-400 shadow-md transition-colors cursor-pointer"
        >
          <HiXMark className="text-xl" />
        </button>

        <div className="overflow-y-auto flex-1">
          {loading || !recipe ? (
            <ModalSkeleton />
          ) : (
            <>
              <div className="relative">
                <div className="aspect-[16/9] sm:aspect-[21/9] bg-ink-100 dark:bg-ink-800 overflow-hidden relative">
                  {!imgLoaded && <div className="absolute inset-0 shimmer" />}
                  <img
                    src={recipe.strMealThumb}
                    alt={displayName}
                    onLoad={() => setImgLoaded(true)}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                      imgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {recipe.strCategory && (
                      <Pill>
                        <HiTag className="text-[11px]" /> {recipe.strCategory}
                      </Pill>
                    )}
                    {recipe.strArea && (
                      <Pill>
                        <HiMapPin className="text-[11px]" /> {recipe.strArea}
                      </Pill>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h2
                      id="recipe-modal-title"
                      className="font-display text-2xl sm:text-4xl text-white text-balance leading-tight"
                    >
                      {displayName}
                    </h2>
                    <FavoritesButton
                      active={isFavorite}
                      onClick={onToggleFavorite}
                      size="lg"
                      className="shrink-0"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <section className="lg:col-span-2">
                  <SectionTitle icon={<HiOutlineSparkles />}>Ingredients</SectionTitle>
                  <ul className="mt-4 divide-y divide-ink-200/70 dark:divide-ink-800/70 rounded-2xl border border-ink-200/70 dark:border-ink-800/70 bg-white/70 dark:bg-ink-950/40 backdrop-blur-md">
                    {ingredients.map((item, idx) => (
                      <li
                        key={`${item.ingredient}-${idx}`}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <span className="text-ink-800 dark:text-ink-100 text-sm font-medium">
                          {item.ingredient}
                        </span>
                        <span className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm tabular-nums">
                          {item.measure}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="lg:col-span-3">
                  <SectionTitle icon={<HiOutlineBookOpen />}>Instructions</SectionTitle>
                  <ol className="mt-4 space-y-4">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-ember text-white text-sm font-semibold shadow-sm shadow-ember-500/30">
                          {i + 1}
                        </span>
                        <p className="text-ink-700 dark:text-ink-200 leading-relaxed text-[15px]">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>

                  {recipe.strYoutube && (
                    <div className="mt-8">
                      <SectionTitle icon={<HiPlayCircle />}>Watch the technique</SectionTitle>
                      {youtube ? (
                        <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-ink-200/70 dark:border-ink-800/70">
                          <iframe
                            src={youtube}
                            title={`${displayName} — video`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                          />
                        </div>
                      ) : (
                        <a
                          href={recipe.strYoutube}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-ember-600 dark:text-ember-400 hover:text-ember-700 dark:hover:text-ember-300 text-sm font-medium"
                        >
                          Open on YouTube
                        </a>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
      {children}
    </span>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-xl text-ink-900 dark:text-ink-50">
      <span className="text-ember-500 text-lg">{icon}</span>
      {children}
    </h3>
  );
}
