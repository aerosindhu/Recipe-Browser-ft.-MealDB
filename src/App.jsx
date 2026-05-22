import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import RecipeGrid from './components/RecipeGrid.jsx';
import RecipeModal from './components/RecipeModal.jsx';
import EmptyState from './components/EmptyState.jsx';
import { useRecipes } from './hooks/useRecipes.js';
import { useFavorites } from './hooks/useFavorites.js';
import { fetchRecipeById } from './services/api.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { recipes, categories, loading, error, refetch } = useRecipes(query, category);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const visibleRecipes = useMemo(() => {
    if (!showFavoritesOnly) return recipes;
    return recipes.filter((r) => favorites.includes(r.idMeal));
  }, [recipes, favorites, showFavoritesOnly]);

  const handleOpenRecipe = useCallback(async (id) => {
    setActiveRecipeId(id);
    setActiveRecipe(null);
    setModalLoading(true);
    try {
      const detail = await fetchRecipeById(id);
      setActiveRecipe(detail);
    } finally {
      setModalLoading(false);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveRecipeId(null);
    setActiveRecipe(null);
  }, []);

  useEffect(() => {
    const lock = activeRecipeId !== null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-w', `${scrollbar}px`);
    document.body.classList.toggle('scroll-locked', lock);
    return () => document.body.classList.remove('scroll-locked');
  }, [activeRecipeId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleCloseModal]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesView={() => setShowFavoritesOnly((v) => !v)}
      />

      <main className="relative">
        <HeroSection query={query} onQueryChange={setQuery} />

        <section
          id="recipes"
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 pt-4 sm:pt-8"
        >
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={setCategory}
            loading={loading && categories.length === 0}
          />

          <div className="mt-10">
            {error ? (
              <EmptyState
                variant="error"
                title="Something went sideways"
                description="We couldn't load recipes right now. Please check your connection and try again."
                actionLabel="Retry"
                onAction={refetch}
              />
            ) : visibleRecipes.length === 0 && !loading ? (
              <EmptyState
                variant={showFavoritesOnly ? 'favorites' : 'empty'}
                title={showFavoritesOnly ? 'No favorites yet' : 'No recipes found'}
                description={
                  showFavoritesOnly
                    ? 'Tap the heart on any recipe to save it for later.'
                    : 'Try a different search or pick another category.'
                }
                actionLabel={showFavoritesOnly ? 'Browse recipes' : 'Reset filters'}
                onAction={() => {
                  setShowFavoritesOnly(false);
                  setQuery('');
                  setCategory('All');
                }}
              />
            ) : (
              <RecipeGrid
                recipes={visibleRecipes}
                loading={loading}
                onOpen={handleOpenRecipe}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </section>

        <Footer />
      </main>

      <AnimatePresence>
        {activeRecipeId && (
          <RecipeModal
            recipe={activeRecipe}
            loading={modalLoading}
            onClose={handleCloseModal}
            isFavorite={activeRecipe ? isFavorite(activeRecipe.idMeal) : false}
            onToggleFavorite={() => activeRecipe && toggleFavorite(activeRecipe.idMeal)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-12 border-t border-ink-200/60 dark:border-ink-800/60 bg-white/40 dark:bg-ink-900/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg text-ink-900 dark:text-ink-50">
          Savora<span className="text-ember-500">.</span>
        </p>
        <p className="text-sm text-ink-600 dark:text-ink-400">
          Crafted with care · Recipes by{' '}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noreferrer"
            className="text-ember-600 dark:text-ember-400 hover:text-ember-700 dark:hover:text-ember-300 transition-colors"
          >
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
}
