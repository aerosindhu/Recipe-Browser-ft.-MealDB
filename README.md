# Savora — Cinematic Recipe Browser

A premium, portfolio-quality recipe browser built with React + Vite + Tailwind CSS + Framer Motion. Powered by [TheMealDB](https://www.themealdb.com).

## Stack

- React 18 + Vite (JavaScript)
- Tailwind CSS 3 (custom warm-orange + cream design system)
- Framer Motion (spring physics, stagger, modal transitions)
- Axios (API layer)
- React Icons (Heroicons v2)

## Features

- Responsive recipe grid with staggered entrance animations
- Live name search + category filter (search.php / filter.php / categories.php)
- Animated recipe detail modal (lookup.php) with ingredients, instructions, embedded YouTube
- Glassmorphism floating navbar with mobile drawer
- Animated cinematic hero with mesh gradient blobs
- Skeleton loaders (cards + modal)
- Polished empty / error states with retry
- Dark mode toggle (persisted in localStorage, respects system preference)
- Favorites with localStorage persistence + filter-only view
- Lazy-loaded images with fade-in
- Custom warm gradient scrollbar
- Scroll-locking modal, ESC-to-close, keyboard accessible cards
- `prefers-reduced-motion` respected

## Install & Run

```bash
cd recipe-browser
npm install
npm run dev
```

Open the printed URL (typically `http://localhost:5173`).

### Other scripts

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Project Structure

```
recipe-browser/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── assets/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── HeroSection.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── RecipeGrid.jsx
    │   ├── RecipeCard.jsx
    │   ├── RecipeModal.jsx
    │   ├── FavoritesButton.jsx
    │   ├── ThemeToggle.jsx
    │   ├── EmptyState.jsx
    │   └── Loader.jsx
    ├── context/
    │   └── ThemeContext.jsx
    ├── hooks/
    │   ├── useDebounce.js
    │   ├── useFavorites.js
    │   └── useRecipes.js
    ├── pages/
    ├── services/
    │   └── api.js
    └── utils/
        └── helpers.js
```

## Design System

| Token | Value |
| --- | --- |
| Display font | Playfair Display |
| Body font | Inter |
| Accent | `#F97316` → `#EA580C` (ember gradient) |
| Background | `#FFFBF5` cream / `#0C0A09` ink (dark) |
| Radius | `rounded-3xl` (cards), `rounded-2xl` (panels), `rounded-full` (controls) |
| Easing | `[0.22, 1, 0.36, 1]` for enters · springs for hover/modal |
| Durations | 200ms micro · 400–600ms layout |

## Notes

TheMealDB is public and free (test key `1`). Filter responses don't include category/area; categories are shown when the data is available (search responses always include them).
