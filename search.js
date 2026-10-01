import { el, escapeHtml } from './helpers.js';
import { games } from './games.js';

export function openSearch() {
  const overlay = el(`
    <div class="search is-open" role="dialog" aria-modal="true" aria-label="Search">
      <input class="search__input" placeholder="Search games, characters, genres…" aria-label="Search input" />
      <div class="search__results" id="search-results"></div>
    </div>
  `);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  const input = overlay.querySelector('input');
  const results = overlay.querySelector('#search-results');
  input.focus();

  const render = (q) => {
    if (!q) { results.innerHTML = ''; return; }
    const query = q.toLowerCase();
    const matches = [];
    games.forEach((g) => {
      const pool = [g.title, g.genre, g.developer, g.description, ...g.characters, ...g.features].join(' ').toLowerCase();
      if (pool.includes(query)) matches.push({ id: g.id, label: g.title, sub: g.genre });
      g.characters.forEach((c) => {
        if (c.toLowerCase().includes(query)) matches.push({ id: g.id, label: c, sub: g.title });
      });
    });
    results.innerHTML = matches.length
      ? matches.slice(0, 12).map((m) => `
          <div class="search__result" data-goto="${m.id}">
            <div style="font-weight:600">${escapeHtml(m.label)}</div>
            <div style="font-size:.8rem;color:var(--muted)">${escapeHtml(m.sub)}</div>
          </div>`).join('')
      : '<p style="text-align:center;color:var(--muted);padding:2rem">No results found</p>';
  };

  input.addEventListener('input', (e) => render(e.target.value.trim()));

  results.addEventListener('click', (e) => {
    const card = e.target.closest('[data-goto]');
    if (!card) return;
    close();
    const target = document.getElementById(`game-${card.dataset.goto}`);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });

  const close = () => {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
}