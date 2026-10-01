import { el } from './helpers.js';
import { themes, applyTheme } from './theme.js';

export function Navbar({ onSearch }) {
  const nav = el(`
    <nav class="nav" aria-label="Main navigation">
      <a href="#home" class="nav__logo">GAME<span>VERSE</span></a>
      <ul class="nav__links">
        <li><a href="#home" data-section="home" class="active">Home</a></li>
        <li><a href="#games" data-section="games">Games</a></li>
        <li><a href="#stories" data-section="stories">Stories</a></li>
        <li><a href="#gallery" data-section="gallery">Gallery</a></li>
        <li><a href="#about" data-section="about">About</a></li>
      </ul>
      <div class="nav__actions">
        <button class="nav__btn" data-action="theme" aria-label="Change theme"><i data-lucide="palette"></i></button>
        <button class="nav__btn" data-action="search" aria-label="Search"><i data-lucide="search"></i></button>
        <button class="nav__btn nav__btn--menu" data-action="menu" aria-label="Open menu" aria-expanded="false">
          <i data-lucide="menu"></i>
        </button>
      </div>
      <div class="theme-menu" id="theme-menu"></div>
    </nav>

    <!-- Side Drawer Menu (hamburger ke liye) -->
    <div class="side-menu" id="side-menu" aria-hidden="true">
      <div class="side-menu__backdrop"></div>
      <aside class="side-menu__panel">
        <button class="side-menu__close" aria-label="Close menu">×</button>
        <h3 class="side-menu__title">MENU</h3>
        <ul class="side-menu__links">
          <li><a href="#home" data-section="home"><span>01</span> Home</a></li>
          <li><a href="#games" data-section="games"><span>02</span> Games</a></li>
          <li><a href="#stories" data-section="stories"><span>03</span> Stories</a></li>
          <li><a href="#gallery" data-section="gallery"><span>04</span> Gallery</a></li>
          <li><a href="#about" data-section="about"><span>05</span> About</a></li>
        </ul>
        <div class="side-menu__footer">
          <p>GAMEVERSE</p>
          <p class="side-menu__tag">Explore. Experience. Remember.</p>
        </div>
      </aside>
    </div>
  `);

  const themeMenu = nav.querySelector('#theme-menu');
  const sideMenu = nav.parentElement === null
    ? document.querySelector('.side-menu') // fallback
    : null;

  themes.forEach((t) => {
    const b = el(`<button type="button">${t.charAt(0).toUpperCase() + t.slice(1)} Theme</button>`);
    b.addEventListener('click', () => {
      applyTheme(t);
      themeMenu.classList.remove('is-open');
    });
    themeMenu.appendChild(b);
  });

  // Theme button
  nav.querySelector('[data-action="theme"]').addEventListener('click', () => {
    themeMenu.classList.toggle('is-open');
  });

  // Search button
  nav.querySelector('[data-action="search"]').addEventListener('click', onSearch);

  // Hamburger menu button — opens side drawer
  const menuBtn = nav.querySelector('[data-action="menu"]');
  const side = nav.nextElementSibling; // .side-menu
  const sidePanel = side.querySelector('.side-menu__panel');

  const openMenu = () => {
    side.classList.add('is-open');
    side.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    side.classList.remove('is-open');
    side.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', () => {
    if (side.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  side.querySelector('.side-menu__close').addEventListener('click', closeMenu);
  side.querySelector('.side-menu__backdrop').addEventListener('click', closeMenu);

  // Side menu links — close on click + smooth scroll
  side.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        closeMenu();
        const navOffset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Nav links (top bar) — active underline + smooth scroll
  const navLinks = nav.querySelectorAll('.nav__links a[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const navOffset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ESC key closes both menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      themeMenu.classList.remove('is-open');
    }
  });

  // Scroll spy
  const sections = ['home', 'games', 'stories', 'gallery', 'about'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // Scroll detection for navbar
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });

  // Yeh do elements return karne hain — nav + side-menu
  // Is liye wrapper banate hain
  const wrapper = document.createElement('div');
  wrapper.appendChild(nav);
  wrapper.appendChild(side);
  return wrapper;
}