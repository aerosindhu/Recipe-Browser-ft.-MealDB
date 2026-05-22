export function extractIngredients(meal) {
  if (!meal) return [];
  const list = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient?.trim()) {
      list.push({
        ingredient: ingredient.trim(),
        measure: (measure ?? '').trim(),
      });
    }
  }
  return list;
}

const STRIP_STANDALONE = /^[ \t]*step[ \t]*\d+[ \t]*[:.\-)]?[ \t]*$/gim;
const STRIP_INLINE_PREFIX = /^[ \t]*step[ \t]*\d+[ \t]*[:.\-)]?[ \t]*/gim;
const STRIP_NUMBERED_PREFIX = /^[ \t]*\d+[ \t]*[-.):][ \t]+/gm;

export function formatInstructions(text) {
  if (!text) return [];

  const cleaned = text
    .replaceAll('\r\n', '\n')
    .replace(STRIP_STANDALONE, '')
    .replace(STRIP_INLINE_PREFIX, '')
    .replace(STRIP_NUMBERED_PREFIX, '')
    .trim();

  const byParagraph = cleaned
    .split(/\n\s*\n+/)
    .map((s) => s.replaceAll('\n', ' ').replace(/\s+/g, ' ').trim())
    .filter((s) => s.length > 4);
  if (byParagraph.length > 1) return byParagraph;

  const byLine = cleaned
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
  if (byLine.length > 1) return byLine;

  return cleaned
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 4);
}

const MEAL_NAME_OVERRIDES = {
  kabse: 'Kabsa',
};

export function formatMealName(name) {
  if (!name) return '';
  const key = name.trim().toLowerCase();
  return MEAL_NAME_OVERRIDES[key] ?? name;
}

export function getYoutubeEmbed(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
