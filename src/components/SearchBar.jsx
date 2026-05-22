import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search recipes…',
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'h-10 text-sm pl-10 pr-10',
    md: 'h-12 text-[15px] pl-12 pr-12',
    lg: 'h-14 text-base pl-14 pr-14',
  };
  const iconSize = {
    sm: 'left-3 text-base',
    md: 'left-4 text-lg',
    lg: 'left-5 text-xl',
  };
  const clearPos = {
    sm: 'right-2 h-7 w-7 text-sm',
    md: 'right-2 h-8 w-8 text-base',
    lg: 'right-3 h-9 w-9 text-lg',
  };

  return (
    <div className={`relative w-full ${className}`}>
      <HiMagnifyingGlass
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500 ${iconSize[size]}`}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search recipes"
        className={`w-full rounded-full border border-ink-200/70 dark:border-ink-700/70 bg-white/80 dark:bg-ink-900/70 backdrop-blur-md placeholder:text-ink-400 dark:placeholder:text-ink-500 text-ink-900 dark:text-ink-50 shadow-sm focus:border-ember-400 focus:bg-white dark:focus:bg-ink-900 transition-colors duration-200 ${sizes[size]}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className={`absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full text-ink-500 hover:text-ember-600 hover:bg-ember-50 dark:hover:bg-ink-800 transition-colors cursor-pointer ${clearPos[size]}`}
        >
          <HiXMark />
        </button>
      )}
    </div>
  );
}
