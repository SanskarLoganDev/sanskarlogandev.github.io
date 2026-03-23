/* ============================================================
   SANSKAR VIDYARTHI — PORTFOLIO SCRIPTS
   ============================================================ */

/* ── STARFIELD CANVAS ── */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 6000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    const a = 0.25 + 0.55 * Math.abs(Math.sin(t * s.speed + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 220, 255, ${a})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(drawStars);

/* ── SHOW MORE / SHOW LESS ── */
document.querySelectorAll('.dt-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const bullets = btn.previousElementSibling; // the <ul class="dt-bullets">
    const expanded = bullets.classList.toggle('expanded');
    btn.textContent = expanded ? '▲ show less' : '▼ show more';
  });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });

// Dual timeline — work & edu cards
document.querySelectorAll('.dt-work-card, .dt-edu-card').forEach((el, i) => {
  el.dataset.delay = i * 90;
  observer.observe(el);
});

// Project cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

// Certification badge cards
document.querySelectorAll('.cert-badge-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
  observer.observe(el);
});

/* ── FOOTER YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();
