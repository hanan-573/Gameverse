import { el } from './helpers.js';

export function AboutSection() {
  return el(`
    <section class="section about-section" id="about">
      <p class="section__eyebrow">— About</p>
      <h2 class="section__title">ABOUT GAMEVERSE</h2>

      <div class="about-grid">
        <div class="about-card reveal">
          <div class="about-card__icon">🎮</div>
          <h3>What is GAMEVERSE?</h3>
          <p>
            GAMEVERSE is a cinematic showcase celebrating three legendary open-world
            titles — Ghost of Tsushima, The Last of Us, and Red Dead Redemption 2.
            Every section here is hand-crafted to feel like a premium AAA experience.
          </p>
        </div>

        <div class="about-card reveal">
          <div class="about-card__icon">✨</div>
          <h3>Our Mission</h3>
          <p>
            To bring the emotion, scale, and storytelling of modern gaming into the
            browser — with immersive visuals, smooth animations, and a design language
            that respects the games it celebrates.
          </p>
        </div>

        <div class="about-card reveal">
          <div class="about-card__icon">🛠️</div>
          <h3>Built With</h3>
          <p>
            Vanilla JavaScript, Three.js for the WebGL particle scene, GSAP for
            animations and scroll effects, Vite for lightning-fast builds, and
            a carefully curated color system across four themes.
          </p>
        </div>

        <div class="about-card reveal">
          <div class="about-card__icon">🌍</div>
          <h3>Explore. Experience. Remember.</h3>
          <p>
            Whether you're a lifelong gamer or just discovering these worlds, GAMEVERSE
            is a tribute to the stories that stay with us long after the credits roll.
          </p>
        </div>
      </div>

      <div class="about-cta reveal">
        <a href="#home" class="btn btn--primary">Back to Top ↑</a>
        <a href="#games" class="btn btn--ghost">Explore Games →</a>
      </div>
    </section>
  `);
}