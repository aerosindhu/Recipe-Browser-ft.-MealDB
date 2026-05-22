import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const ALL_OPTION = { idCategory: 'all', strCategory: 'All' };

export default function CategoryFilter({ categories, active, onChange, loading }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  const items = [ALL_OPTION, ...categories];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-ink-900 dark:text-ink-50">
            Browse by category
          </h2>
          <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">
            Curated cuisines from around the world.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ScrollButton direction="left" onClick={() => scrollBy(-1)} />
          <ScrollButton direction="right" onClick={() => scrollBy(1)} />
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cream-50 dark:from-ink-950 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream-50 dark:from-ink-950 to-transparent z-10" />

        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-28 shrink-0 rounded-full bg-ink-100 dark:bg-ink-800 shimmer"
                />
              ))
            : items.map((cat) => {
                const isActive = active === cat.strCategory;
                return (
                  <button
                    key={cat.idCategory}
                    type="button"
                    onClick={() => onChange(cat.strCategory)}
                    aria-pressed={isActive}
                    className={`group relative shrink-0 snap-start inline-flex items-center gap-2 h-10 px-4 sm:px-5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-ember text-white shadow-md shadow-ember-500/30'
                        : 'bg-white/70 dark:bg-ink-900/70 backdrop-blur-md border border-ink-200/70 dark:border-ink-800/70 text-ink-700 dark:text-ink-200 hover:border-ember-400 hover:text-ember-700 dark:hover:text-ember-300'
                    }`}
                  >
                    {cat.strCategoryThumb && cat.idCategory !== 'all' && (
                      <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-cream-100">
                        <img
                          src={cat.strCategoryThumb}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    )}
                    {cat.strCategory}
                  </button>
                );
              })}
        </div>
      </div>
    </motion.div>
  );
}

function ScrollButton({ direction, onClick }) {
  const Icon = direction === 'left' ? HiChevronLeft : HiChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll left' : 'Scroll right'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/70 dark:border-ink-700/70 bg-white/70 dark:bg-ink-900/70 backdrop-blur-md text-ink-700 dark:text-ink-200 hover:text-ember-600 dark:hover:text-ember-400 transition-colors cursor-pointer"
    >
      <Icon />
    </button>
  );
}
