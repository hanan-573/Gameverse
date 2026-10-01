import { el, escapeHtml } from './helpers.js';
import { games } from './games.js';

export function GameCards() {
  return el(`
    <section class="section" id="games">
      <p class="section__eyebrow">— Featured</p>
      <h2 class="section__title">LEGENDS OF THE GAME</h2>
      <div class="cards">
        ${games.map((g) => `
          <article class="card reveal" data-game="${g.id}">
            <div class="card__bg" style="background-image:url('${g.coverImage}')"></div>
            <div class="card__content">
              <p class="card__meta">${g.releaseYear} · ${escapeHtml(g.genre)}</p>
              <h3 class="card__title">${escapeHtml(g.title)}</h3>
              <p class="card__desc">${escapeHtml(g.description.slice(0, 120))}…</p>
              <button class="btn btn--primary" data-action="explore" data-game="${g.id}">Explore</button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `);
}

export function GameDetails() {
  return el(`
    <div id="details">
      ${games.map((g) => `
        <section class="detail" id="game-${g.id}">
          <div class="detail__img" style="background-image:url('${g.coverImage}')"></div>
          <div class="reveal">
            <p class="section__eyebrow">— ${escapeHtml(g.developer)}</p>
            <h2 class="section__title">${escapeHtml(g.title)}</h2>
            <p class="hero__subtitle" style="font-size:1.25rem">"${escapeHtml(g.subtitle)}"</p>
            <p class="hero__desc">${escapeHtml(g.longDescription)}</p>
            <div class="detail__features">
              ${g.features.map((f) => `
                <button class="chip chip--interactive"
                        data-feature="${escapeHtml(f.name)}"
                        data-game="${g.id}"
                        aria-label="Filter by ${escapeHtml(f.name)}">
                  <span class="chip__dot"></span>
                  ${escapeHtml(f.name)}
                  <span class="chip__tooltip">${escapeHtml(f.desc)}</span>
                </button>
              `).join('')}
            </div>
            <div class="feature-results" id="feature-results-${g.id}"></div>
          </div>
        </section>
      `).join('')}
    </div>
  `);
}

export function Comparison() {
  return el(`
    <section class="section">
      <p class="section__eyebrow">— Compare</p>
      <h2 class="section__title">COMPARE THE WORLDS</h2>
      <div class="compare">
        ${games.map((g) => `
          <div class="compare__card reveal">
            <h3>${escapeHtml(g.title)}</h3>
            <div class="compare__row"><span>Release</span><b>${g.releaseYear}</b></div>
            <div class="compare__row"><span>Developer</span><b>${escapeHtml(g.developer)}</b></div>
            <div class="compare__row"><span>Genre</span><b>${escapeHtml(g.genre)}</b></div>
            <div class="compare__row"><span>Platform</span><b>${escapeHtml(g.platform)}</b></div>
            <div class="compare__row"><span>Rating</span><b>${g.rating}</b></div>
          </div>
        `).join('')}
      </div>
    </section>
  `);
}

export function Stats() {
  const items = [
    { num: 95, suffix: '+', label: 'Open World Hours' },
    { num: 3, suffix: '', label: 'Iconic Worlds' },
    { num: 10, suffix: '+', label: 'Major Characters' },
    { num: 999, suffix: '∞', label: 'Stories to Discover' }
  ];
  return el(`
    <section class="section">
      <div class="stats">
        ${items.map((i) => `
          <div class="reveal">
            <div class="stat__num" data-target="${i.num}" data-suffix="${i.suffix}">0</div>
            <div class="stat__label">${escapeHtml(i.label)}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `);
}