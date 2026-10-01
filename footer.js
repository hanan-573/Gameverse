import { el } from './helpers.js';

export function Footer() {
  return el(`
    <footer class="footer" id="footer">
      <div class="footer__grid">
        <div>
          <h3 class="footer__title">GAMEVERSE</h3>
          <p style="color:var(--muted);font-size:.9rem;margin-top:.5rem">Explore. Experience. Remember.</p>
        </div>
        <div>
          <h4 style="font-size:.85rem;letter-spacing:.2em;color:var(--muted);margin-bottom:1rem">EXPLORE</h4>
          <ul class="footer__links">
            <li><a href="#games">Games</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#stories">Stories</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </div>
        <div>
          <h4 style="font-size:.85rem;letter-spacing:.2em;color:var(--muted);margin-bottom:1rem">FOLLOW</h4>
          <ul class="footer__links">
            <li><a href="#" aria-label="YouTube">YouTube</a></li>
            <li><a href="#" aria-label="Instagram">Instagram</a></li>
            <li><a href="#" aria-label="X">X</a></li>
            <li><a href="#" aria-label="GitHub">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        © ${new Date().getFullYear()} GAMEVERSE. All trademarks are property of their respective owners.
      </div>
    </footer>
  `);
}