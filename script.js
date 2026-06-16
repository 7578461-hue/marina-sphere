// Marina Lodvikova · «Сфера» — interactions

// ───── SPLASH «вход в клуб» ─────
(function () {
  const splash = document.getElementById('splash');
  if (!splash) return;

  // Уже входили в этой сессии — не показываем заново
  try {
    if (sessionStorage.getItem('sphere-entered') === '1') {
      splash.remove();
      return;
    }
  } catch (_) { /* sessionStorage недоступен — ничего страшного */ }

  // На splash страница не должна скроллиться
  document.body.style.overflow = 'hidden';

  const enter = document.getElementById('splash-enter');
  const dismiss = () => {
    splash.classList.add('splash--exit');
    document.body.style.overflow = '';
    try { sessionStorage.setItem('sphere-entered', '1'); } catch (_) {}
    setTimeout(() => splash.remove(), 1100);
  };

  if (enter) enter.addEventListener('click', dismiss);
  // Клавиша Enter / Space — тоже впускают
  document.addEventListener('keydown', function onKey(e) {
    if (splash.classList.contains('splash--exit')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dismiss();
      document.removeEventListener('keydown', onKey);
    }
  });
})();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const flip = (el) => el.classList.add('visible');
const inView = (el) => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};
reveals.forEach(el => { if (inView(el)) flip(el); });
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { flip(e.target); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
reveals.forEach(el => { if (!el.classList.contains('visible')) io.observe(el); });

// Внутренние якоря — плавный скролл + чистка #hash
document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href === '#') return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (history.replaceState) history.replaceState(null, '', window.location.pathname);
});

// TG CTA — открыть Telegram с предзаполненным текстом
document.addEventListener('click', function (e) {
  const a = e.target.closest('a.tg-cta');
  if (!a) return;
  const tpl = a.getAttribute('data-tg');
  if (!tpl) return;
  e.preventDefault();
  window.open('https://t.me/Diamondmari?text=' + encodeURIComponent(tpl), '_blank', 'noopener');
});
