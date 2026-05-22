import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});

export async function searchRecipesByName(query) {
  const term = (query ?? '').trim();
  const { data } = await client.get('/search.php', { params: { s: term } });
  return data.meals ?? [];
}

export async function fetchCategories() {
  const { data } = await client.get('/categories.php');
  return data.categories ?? [];
}

export async function filterByCategory(category) {
  const { data } = await client.get('/filter.php', { params: { c: category } });
  return data.meals ?? [];
}

export async function fetchRecipeById(id) {
  const { data } = await client.get('/lookup.php', { params: { i: id } });
  return data.meals?.[0] ?? null;
}
