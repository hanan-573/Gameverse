import { el, escapeHtml } from './helpers.js';

export function openTrailer(game) {
  const modal = el(`
    <div class="modal is-open" role="dialog" aria-modal="true" aria-label="${escapeHtml(game.title)} trailer">
      <div class="modal__inner">
        <button class="modal__close" aria-label="Close">×</button>
        <iframe src="https://www.youtube.com/embed/${game.trailerId}?rel=0"
          title="${escapeHtml(game.title)} trailer"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>
  `);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  const close = () => {
    modal.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  modal.querySelector('.modal__close').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', onKey);
}