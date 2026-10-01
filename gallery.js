import { el, escapeHtml } from './helpers.js';
import { games, galleryImages } from './games.js';

export function Gallery() {
  return el(`
    <section class="section" id="gallery">
      <p class="section__eyebrow">— Gallery</p>
      <h2 class="section__title">CINEMATIC MOMENTS</h2>
      <div class="gallery-filters">
        <button class="is-active" data-filter="all">All</button>
        ${games.map((g) => `<button data-filter="${g.id}">${escapeHtml(g.title)}</button>`).join('')}
      </div>
      <div class="gallery" id="gallery-grid"></div>
    </section>
  `);
}

export function renderGallery(grid, filter = 'all') {
  const list = filter === 'all' ? galleryImages : galleryImages.filter((i) => i.game === filter);
  grid.innerHTML = list.map((i, idx) => `
    <div class="gallery__item" data-index="${idx}">
      <img src="${i.src}" alt="${escapeHtml(i.title)} screenshot ${idx + 1}" loading="lazy"
        onerror="this.onerror=null;this.src='./favicon.svg'" />
    </div>
  `).join('');
}

export function openLightbox(list, index) {
  const box = el(`
    <div class="lightbox is-open" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox__close" aria-label="Close">×</button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">‹</button>
      <img src="${list[index].src}" alt="Gallery preview" />
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next">›</button>
    </div>
  `);
  document.body.appendChild(box);
  document.body.style.overflow = 'hidden';

  const img = box.querySelector('img');
  let i = index;
  const update = () => { img.src = list[i].src; };
  const close = () => {
    box.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') { i = (i - 1 + list.length) % list.length; update(); }
    if (e.key === 'ArrowRight') { i = (i + 1) % list.length; update(); }
  };
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__nav--prev').addEventListener('click', () => { i = (i - 1 + list.length) % list.length; update(); });
  box.querySelector('.lightbox__nav--next').addEventListener('click', () => { i = (i + 1) % list.length; update(); });
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', onKey);
}