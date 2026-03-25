/* ============================
   HTML Basics Reference Site
   script.js
   ============================ */

// ─── Scroll Reveal ───────────────────────────────────────────────
(function initScrollReveal() {
  const revealTargets = [
    '.intro-card',
    '.element-card',
    '.note-item',
    '.path-card',
    '.state-pill',
    '.boilerplate-code',
    '.target-table-wrap',
    '.link-states-wrap',
  ];

  // Add .reveal class to all target elements
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay per element within the same selector group
      el.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// ─── Active Nav Link Highlight ───────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('nav-link--active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(section => observer.observe(section));

  // Inject active style
  const style = document.createElement('style');
  style.textContent = `
    .nav-link--active {
      color: var(--accent) !important;
      border-color: var(--accent) !important;
      background: rgba(240, 192, 64, 0.1) !important;
    }
  `;
  document.head.appendChild(style);
})();


// ─── Code Block Click-to-Copy ────────────────────────────────────
(function initCopyCode() {
  document.querySelectorAll('.code-block').forEach(block => {
    // Create copy button
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');

    // Style the wrapper
    block.style.position = 'relative';

    block.appendChild(btn);

    btn.addEventListener('click', () => {
      const code = block.querySelector('code');
      if (!code) return;

      navigator.clipboard.writeText(code.innerText.trim()).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copy-btn--success');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copy-btn--success');
        }, 1800);
      }).catch(() => {
        btn.textContent = 'Error';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
      });
    });
  });

  // Inject copy button styles
  const style = document.createElement('style');
  style.textContent = `
    .copy-btn {
      position: absolute;
      top: 0.6rem;
      right: 0.7rem;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.06em;
      color: var(--text-muted);
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 0.25em 0.7em;
      cursor: pointer;
      transition: color 0.2s, border-color 0.2s, background 0.2s;
      z-index: 10;
    }
    .copy-btn:hover {
      color: var(--accent3);
      border-color: var(--accent3);
      background: rgba(60,232,176,0.08);
    }
    .copy-btn--success {
      color: var(--accent3) !important;
      border-color: var(--accent3) !important;
    }
  `;
  document.head.appendChild(style);
})();


// ─── Smooth scroll for anchor links ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
