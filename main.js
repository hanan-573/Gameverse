import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createIcons, Menu, Search, X, Play, ChevronLeft, ChevronRight, Palette } from 'lucide';

import { games, galleryImages } from './games.js';
import { initThree } from './scene.js';
import { getTheme, applyTheme } from './theme.js';
import { prefersReducedMotion } from './helpers.js';

import { Navbar } from './navbar.js';
import { Hero } from './hero.js';
import { GameCards, GameDetails, Comparison, Stats } from './cards.js';
import { Gallery, renderGallery, openLightbox } from './gallery.js';
import { StorySection } from './story.js';
import { openStoryModal } from './story-modal.js';   // ← YEH ADD KAREIN
import { openTrailer } from './modal.js';
import { openSearch } from './search.js';
import { Footer } from './footer.js';
import { AboutSection } from './about.js';

gsap.registerPlugin(ScrollTrigger);

const state = { activeGame: games[0], galleryFilter: 'all' };
let threeApi = null;

/* LOADER */
function runLoader() {
  return new Promise((resolve) => {
    const fill = document.getElementById('loader-fill');
    const pct = document.getElementById('loader-pct');
    const loader = document.getElementById('loader');
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) { p = 100; clearInterval(id); }
      fill.style.width = p + '%';
      pct.textContent = Math.floor(p);
      if (p === 100) setTimeout(() => { loader.classList.add('is-hidden'); resolve(); }, 400);
    }, 150);
  });
}

/* SWITCH GAME */
function switchGame(g) {
  state.activeGame = g;
  const hero = document.querySelector('.hero');
  const bg = hero.querySelector('.hero__bg');
  const content = hero.querySelector('.hero__content');

  gsap.to(bg, { opacity: 0, duration: 0.3, onComplete: () => {
    bg.style.backgroundImage = `url('${g.heroImage}')`;
    gsap.to(bg, { opacity: 1, duration: 0.5 });
  }});

  gsap.to(content, { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
    content.querySelector('.hero__title').textContent = g.title.toUpperCase();
    content.querySelector('.hero__subtitle').textContent = `"${g.subtitle}"`;
    content.querySelector('.hero__desc').textContent = g.description;
    content.querySelector('.hero__eyebrow').textContent = `— ${g.developer}`;
    // Explore button ka data-game update karein
    const exploreBtn = content.querySelector('[data-action="explore"]');
    if (exploreBtn) exploreBtn.dataset.game = g.id;
    gsap.to(content, { opacity: 1, y: 0, duration: 0.5 });
  }});

  applyTheme(g.theme);
  if (threeApi) threeApi.setColor(g.accentColor);
}

/* GLOBAL CLICKS */
function attachGlobalHandlers() {
  document.addEventListener('click', (e) => {

    /* 1. STORY PANEL CLICK — Story Modal kholo */
    const storyPanel = e.target.closest('[data-story-game]');
    if (storyPanel) {
      e.preventDefault();
      e.stopPropagation();
      const g = games.find(x => x.id === storyPanel.dataset.storyGame);
      if (g) openStoryModal(g);
      return;
    }

    /* 2. EXPLORE BUTTON — Game details pe scroll */
    const explore = e.target.closest('[data-action="explore"]');
    if (explore) {
      e.preventDefault();
      e.stopPropagation();
      const id = explore.dataset.game || state.activeGame.id;
      const target = document.getElementById(`game-${id}`);
      if (target) {
        const navOffset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    /* 3. TRAILER BUTTON */
    const tr = e.target.closest('[data-action="trailer"]');
    if (tr) {
      openTrailer(state.activeGame);
      return;
    }

    /* 4. CARD CLICK — Game switch + scroll to details */
const card = e.target.closest('.card');
if (card && !e.target.closest('[data-action]')) {
  e.preventDefault();
  e.stopPropagation();
  const g = games.find(x => x.id === card.dataset.game);
  if (g) {
    switchGame(g);
    // Scroll to that game's detail section after a tiny delay
    setTimeout(() => {
      const target = document.getElementById(`game-${g.id}`);
      if (target) {
        const navOffset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  }
  return;
}
  });

  /* Keyboard support for story panels (Enter key) */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const sp = e.target.closest?.('[data-story-game]');
      if (sp) {
        const g = games.find(x => x.id === sp.dataset.storyGame);
        if (g) openStoryModal(g);
      }
    }
  });

  /* Card 3D tilt on hover */
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* GALLERY */
function setupGallery() {
  const grid = document.getElementById('gallery-grid');
  renderGallery(grid, 'all');

  document.querySelector('.gallery-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    document.querySelectorAll('.gallery-filters button').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    state.galleryFilter = btn.dataset.filter;
    renderGallery(grid, state.galleryFilter);
    attachGalleryClicks(grid);
  });

  attachGalleryClicks(grid);
}

function attachGalleryClicks(grid) {
  grid.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => {
      const list = state.galleryFilter === 'all'
        ? galleryImages
        : galleryImages.filter((i) => i.game === state.galleryFilter);
      openLightbox(list, +item.dataset.index);
    });
  });
}


/* ANIMATIONS */
function initAnimations() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.reveal').forEach((e) => (e.style.opacity = 1));
    return;
  }
  const hero = document.querySelector('.hero__content');
  gsap.from(hero.children, { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero__bg', { scale: 1.15, duration: 3, ease: 'power2.out' });

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  document.querySelectorAll('.stat__num').forEach((el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    if (target > 100) { el.textContent = '∞'; return; }
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate() { el.textContent = Math.floor(this.targets()[0].v) + suffix; }
        });
      }
    });
  });
}

/* BOOT */
async function boot() {
  applyTheme(getTheme());
  await runLoader();

  document.getElementById('navbar-root').appendChild(Navbar({ onSearch: openSearch }));
  document.getElementById('main').append(
    Hero(state.activeGame),
    GameCards(),
    GameDetails(),
    StorySection(),
    Comparison(),
    Stats(),
    Gallery(),
  AboutSection()       
  );
  document.getElementById('navbar-root').appendChild(Navbar({ onSearch: openSearch }));

  createIcons({ icons: { Menu, Search, X, Play, ChevronLeft, ChevronRight, Palette } });

  threeApi = initThree(document.getElementById('three-root'));
  threeApi.setColor(state.activeGame.accentColor);

  window.addEventListener('themechange', (e) => {
    const g = games.find((x) => x.theme === e.detail.theme);
    if (g && threeApi) threeApi.setColor(g.accentColor);
  });

  setupGallery();
  attachGlobalHandlers();
  initAnimations();
  ScrollTrigger.refresh();
}

boot();

console.log('✅ GAMEVERSE boot start');
window.addEventListener('error', (e) => console.error('❌ JS Error:', e.error || e.message));