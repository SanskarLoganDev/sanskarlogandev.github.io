/* ============================================================
   MAIN.JS — shared across all pages
   ============================================================ */

/* ── NAV: set active link based on current page ── */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    // Normalise: strip leading slashes / index.html
    const pageName = path.split('/').filter(Boolean).pop() || 'index.html';
    const linkName = href.split('/').filter(Boolean).pop() || 'index.html';
    if (pageName === linkName) a.classList.add('active');
  });
})();

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

function observeWithStagger(selector, step) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i * step;
    observer.observe(el);
  });
}

// Works on any page — each selector is harmless if absent
observeWithStagger('.dt-work-card, .dt-edu-card', 90);
observeWithStagger('.project-card', 80);
observeWithStagger('.cert-badge-card', 75);
observeWithStagger('.about-card', 70);
observeWithStagger('.reveal', 60);

/* ── SHOW MORE / LESS (experience bullets) ── */
document.querySelectorAll('.dt-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const ul = btn.previousElementSibling;
    const expanded = ul.classList.toggle('expanded');
    btn.textContent = expanded ? '▲ show less' : '▼ show more';
  });
});

/* ── FOOTER YEAR ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
