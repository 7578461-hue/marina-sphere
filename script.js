// Marina Lodvikova · «Сфера» — interactions

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
