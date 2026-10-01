import { el, escapeHtml } from './helpers.js';
import { games } from './games.js';

export function Hero(game) {
  return el(`
    <section class="hero" id="home">
      <div class="hero__bg" style="background-image:url('${game.heroImage}')"></div>
      <div class="hero__content">
        <p class="hero__eyebrow">— ${escapeHtml(game.developer)}</p>
        <h1 class="hero__title">${escapeHtml(game.title.toUpperCase())}</h1>
        <p class="hero__subtitle">"${escapeHtml(game.subtitle)}"</p>
        <p class="hero__desc">${escapeHtml(game.description)}</p>
        <div class="hero__actions">
          <button class="btn btn--primary" data-action="explore" data-game="${game.id}">Explore Game</button>
          <button class="btn btn--ghost" data-action="trailer">▶ Watch Trailer</button>
        </div>
      </div>
    </section>
  `);
}