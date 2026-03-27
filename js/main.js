/* ============================================================
   MAIN.JS — shared across all pages
   ============================================================ */

/* ── NAV: set active link based on current page ── */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    const pageName = path.split('/').filter(Boolean).pop() || 'index.html';
    const linkName = href.split('/').filter(Boolean).pop() || 'index.html';
    if (pageName === linkName) a.classList.add('active');
  });
})();

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

if (hamburger && mobileMenu) {

  // Toggle open/close on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    // Animate hamburger → X when open
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      spans.forEach(s => s.style.background = 'var(--cyan)');
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      spans.forEach(s => s.style.background = '');
    }
  });

  // Close menu when any nav link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      spans.forEach(s => s.style.background = '');
    });
  });

  // Close menu on outside tap
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
      spans.forEach(s => s.style.background = '');
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
