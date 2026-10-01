const KEY = 'gameverse:theme';
export const themes = ['samurai', 'apocalypse', 'western', 'neon'];

export function getTheme() {
  return localStorage.getItem(KEY) || 'samurai';
}

export function applyTheme(name) {
  if (!themes.includes(name)) name = 'samurai';
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem(KEY, name);
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: name } }));
}