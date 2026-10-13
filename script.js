/* ═══════════════════════════════════════════════════════════
   Netflix-Style Portfolio — JavaScript
   Handles: header scroll effect, mobile nav, reveal on scroll,
   and horizontal carousel navigation
   ═══════════════════════════════════════════════════════════ */

// ─── HEADER SCROLL EFFECT ───
const header = document.querySelector('.nf-header');
let lastScrollY = 0;

function onScroll() {
  const y = window.scrollY;
  if (header) {
    header.classList.toggle('scrolled', y > 40);
  }
  lastScrollY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── MOBILE NAV TOGGLE ───
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nf-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// ─── REVEAL ON SCROLL (Intersection Observer) ───
const revealItems = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// ─── CAROUSEL NAVIGATION ───
document.querySelectorAll('.nf-carousel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const carousel = btn.closest('.nf-carousel');
    const track = carousel.querySelector('.nf-carousel-track');
    if (!track) return;
    const dir = parseInt(btn.dataset.dir, 10);
    const scrollAmount = track.clientWidth * 0.7;
    track.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  });
});

// ─── SKILL BAR ANIMATION ───
const skillBars = document.querySelectorAll('.nf-skill-fill');
if ('IntersectionObserver' in window) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.style.width;
        target.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            target.style.width = width;
          });
        });
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => barObserver.observe(bar));
}
