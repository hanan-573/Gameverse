import { el, escapeHtml } from './helpers.js';

export function openStoryModal(game) {
  const story = game.story;
  if (!story) return;

  const modal = el(`
    <div class="story-modal is-open" role="dialog" aria-modal="true" aria-label="${escapeHtml(game.title)} story">
      <div class="story-modal__backdrop" style="background-image:url('${story.banner}')"></div>
      <div class="story-modal__scroll">
        <div class="story-modal__inner">
          <button class="story-modal__close" aria-label="Close story">×</button>

          <header class="story-modal__header">
            <p class="story-modal__eyebrow">— ${escapeHtml(game.developer)}</p>
            <h2 class="story-modal__title">${escapeHtml(game.title)}</h2>
            <p class="story-modal__tagline">"${escapeHtml(story.tagline)}"</p>
            <div class="story-modal__meta">
              <span>${game.releaseYear}</span>
              <span class="story-modal__dot">•</span>
              <span>${escapeHtml(game.genre)}</span>
            </div>
          </header>

          <div class="story-modal__chapters">
            ${story.chapters.map((ch, i) => `
              <article class="story-chapter" style="--delay:${i * 0.08}s">
                <div class="story-chapter__num">${String(i + 1).padStart(2, '0')}</div>
                <div class="story-chapter__body">
                  <h3 class="story-chapter__title">${escapeHtml(ch.title)}</h3>
                  <p class="story-chapter__text">${escapeHtml(ch.text)}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `);

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    modal.querySelectorAll('.story-chapter').forEach((ch, i) => {
      setTimeout(() => ch.classList.add('is-visible'), i * 100);
    });
  });

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    setTimeout(() => modal.remove(), 400);
  };

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };

  modal.querySelector('.story-modal__close').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('story-modal__backdrop') ||
        e.target.classList.contains('story-modal__scroll')) {
      close();
    }
  });
  document.addEventListener('keydown', onKey);
}