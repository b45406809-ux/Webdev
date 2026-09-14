const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('#menu a').forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const progress = document.querySelector('.progress');
addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${total ? (scrollY / total) * 100 : 0}%`;
}, { passive: true });

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
reveals.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(el);
});

const slides = [...document.querySelectorAll('.fleet-images figure')];
const count = document.querySelector('.fleet-count b');
let current = 0;
function showSlide(next) {
  slides[current].classList.remove('active');
  current = (next + slides.length) % slides.length;
  slides[current].classList.add('active');
  count.textContent = String(current + 1).padStart(2, '0');
}
document.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
document.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));

const form = document.querySelector('#quote-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const date = new Date(`${data.get('date')}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const message = [
    'Hello Averk Travel & Tours, I would like a bus hire quote.', '',
    `From: ${data.get('from')}`,
    `Destination: ${data.get('destination')}`,
    `Date: ${date}`,
    `Number of days: ${data.get('days')}`,
    `Passengers: ${data.get('passengers')}`,
    data.get('details') ? `Extra details: ${data.get('details')}` : ''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/263773893792?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
