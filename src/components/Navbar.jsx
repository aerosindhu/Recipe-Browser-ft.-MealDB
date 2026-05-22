import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiHeart, HiBars3, HiXMark } from 'react-icons/hi2';
import SearchBar from './SearchBar.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({
  query,
  onQueryChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesView,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'border-white/70 bg-white/80 shadow-glass-lg dark:border-ink-800/70 dark:bg-ink-900/80'
            : 'border-white/40 bg-white/55 dark:border-ink-800/40 dark:bg-ink-900/55'
        } backdrop-blur-2xl`}
      >
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3">
          <Logo />

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <SearchBar value={query} onChange={onQueryChange} size="sm" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleFavoritesView}
              aria-pressed={showFavoritesOnly}
              aria-label="Show favorites"
              className={`relative hidden sm:inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                showFavoritesOnly
                  ? 'border-ember-500 bg-ember-500 text-white shadow-md hover:bg-ember-600'
                  : 'border-ink-200/70 dark:border-ink-700/70 bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-200 hover:text-ember-600 dark:hover:text-ember-400'
              }`}
            >
              <HiHeart className={showFavoritesOnly ? 'text-white' : 'text-ember-500'} />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[11px] font-semibold ${
                  showFavoritesOnly ? 'bg-white text-ember-600' : 'bg-ember-500 text-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200/70 dark:border-ink-700/70 bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-200 cursor-pointer"
            >
              {mobileOpen ? <HiXMark className="text-lg" /> : <HiBars3 className="text-lg" />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="lg:hidden overflow-hidden"
        >
          <div className="px-4 pb-4 pt-1 space-y-3">
            <SearchBar value={query} onChange={onQueryChange} size="md" />
            <button
              type="button"
              onClick={() => {
                onToggleFavoritesView();
                setMobileOpen(false);
              }}
              className={`w-full inline-flex items-center justify-center gap-2 h-11 rounded-full border text-sm font-medium transition-colors cursor-pointer ${
                showFavoritesOnly
                  ? 'border-ember-500 bg-ember-500 text-white'
                  : 'border-ink-200/70 dark:border-ink-700/70 bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-200'
              }`}
            >
              <HiHeart className={showFavoritesOnly ? 'text-white' : 'text-ember-500'} />
              Favorites
              {favoritesCount > 0 && (
                <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[11px] font-semibold ${
                  showFavoritesOnly ? 'bg-white text-ember-600' : 'bg-ember-500 text-white'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 select-none cursor-pointer group">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-ember shadow-md shadow-ember-500/30">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
          <path d="M8 4c0-1 1-2 4-2s4 1 4 2c0 1.5-1 2-1 3.5s1 2 1 3.5c0 2-2 3-4 3s-4-1-4-3c0-1.5 1-2 1-3.5S8 5.5 8 4zm-3 16c0-3 3-5 7-5s7 2 7 5v1H5v-1z" />
        </svg>
      </span>
      <span className="font-display text-xl sm:text-2xl tracking-tight text-ink-900 dark:text-ink-50">
        Savora<span className="text-ember-500 group-hover:text-ember-600 transition-colors">.</span>
      </span>
    </a>
  );
}
