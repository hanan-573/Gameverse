import { el, escapeHtml } from './helpers.js';
import { games } from './games.js';

export function StorySection() {
  const panels = [
    { g: games[0], line: 'Honor becomes sacrifice.' },
    { g: games[1], line: 'Survival becomes connection.' },
    { g: games[2], line: 'Freedom meets the end of an era.' }
  ];
  return el(`
    <section class="section" id="stories">
      <p class="section__eyebrow">— Stories</p>
      <h2 class="section__title">STORIES THAT STAY</h2>
      <p class="story-hint">Click any game to read its full story →</p>
      <div class="story-panels">
        ${panels.map((p) => `
          <div class="story-panel reveal"
               style="background-image:url('${p.g.heroImage}')"
               data-story-game="${p.g.id}"
               role="button"
               tabindex="0"
               aria-label="Read ${escapeHtml(p.g.title)} story">
            <div class="story-panel__content">
              <h3>${escapeHtml(p.g.title)}</h3>
              <p class="hero__subtitle">"${escapeHtml(p.line)}"</p>
              <span class="story-panel__cta">Read Full Story →</span>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `);
}