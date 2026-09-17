/* Shared navigation and contact behaviour. No framework or build step required. */
'use strict';
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#nav-links');
function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const form = document.querySelector('#contactForm');
if (form) {
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  form.addEventListener('invalid', event => {
    event.target.setAttribute('aria-invalid', 'true');
  }, true);
  form.addEventListener('input', event => {
    if (event.target.validity?.valid) event.target.removeAttribute('aria-invalid');
    if (status.dataset.state && !button.disabled) {
      status.textContent = '';
      delete status.dataset.state;
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled || !form.reportValidity()) return;
    button.disabled = true;
    button.classList.add('is-sending');
    form.setAttribute('aria-busy', 'true');
    button.textContent = 'Sending…';
    status.dataset.state = 'sending';
    status.textContent = 'Sending your message…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error('Submission failed');
      status.dataset.state = 'success';
      status.textContent = '✓ Thank you! Your message has been sent.';
      form.reset();
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = 'Your message could not be sent. Please try again or email binkaiff99@gmail.com.';
    } finally {
      clearTimeout(timeout);
      button.disabled = false;
      button.classList.remove('is-sending');
      form.setAttribute('aria-busy', 'false');
      button.textContent = 'Send message ↗';
    }
  });
}

/* Subtle, once-only entrance animations. Content stays visible if unsupported. */
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window) ||
      typeof Element.prototype.animate !== 'function') return;
  const running = new Set();
  const observer = new IntersectionObserver(entries => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (preference.matches) return;
      const animation = entry.target.animate(
        [{ opacity: 0.6, transform: 'translateY(18px)' },
         { opacity: 1, transform: 'translateY(0)' }],
        { duration: 420, delay: Math.min(order++ * 80, 240), easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
      );
      running.add(animation);
      const done = () => running.delete(animation);
      animation.addEventListener('finish', done, { once: true });
      animation.addEventListener('cancel', done, { once: true });
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .split > div, .skill-card, .experience-row, .education-card, .project-card, .document-card, .cta-band, .contact-grid > div')
    .forEach(element => observer.observe(element));
  preference.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      running.forEach(animation => animation.cancel());
      running.clear();
    }
  });
})();
