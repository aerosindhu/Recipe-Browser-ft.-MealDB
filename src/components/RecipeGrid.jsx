import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard.jsx';
import { SkeletonGrid } from './Loader.jsx';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export default function RecipeGrid({ recipes, loading, onOpen, isFavorite, onToggleFavorite }) {
  if (loading) return <SkeletonGrid count={8} />;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      key={recipes.map((r) => r.idMeal).join(',')}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onOpen={onOpen}
          isFavorite={isFavorite(recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </motion.div>
  );
}
