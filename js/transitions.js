/* Small progressive enhancements: navigation still works without this file. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const started = performance.now();
  let firstVisit = true;
  try {
    firstVisit = sessionStorage.getItem('bk-intro-seen') !== 'yes';
    sessionStorage.setItem('bk-intro-seen', 'yes');
  } catch (_) { /* Storage can be unavailable when opening local HTML. */ }
  if (firstVisit && !motion.matches) root.classList.add('is-loading');
  const finishIntro = () => root.classList.remove('is-loading');
  // Four-second first-visit intro, with the hero decoded before reveal.
  // A failed/slow image must never block navigation indefinitely.
  const safety = setTimeout(finishIntro, 8000);
  const ready = async () => {
    const photo = document.querySelector('.portrait');
    if (photo && typeof photo.decode === 'function') {
      try { await photo.decode(); } catch (_) { /* Reveal normally on error. */ }
    }
    const remaining = firstVisit && !motion.matches
      ? Math.max(0, 4000 - (performance.now() - started)) : 0;
    setTimeout(() => { finishIntro(); clearTimeout(safety); }, remaining);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else ready();
  let navigating = false;
  let navigationTimer;
  let recoveryTimer;
  const reset = () => {
    clearTimeout(navigationTimer);
    clearTimeout(recoveryTimer);
    navigating = false;
    root.classList.remove('is-leaving');
    finishIntro();
  };
  window.addEventListener('pageshow', event => { if (event.persisted) reset(); });
  motion.addEventListener('change', event => { if (event.matches) finishIntro(); });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey || motion.matches) return;
    const a = event.target.closest('a[href]');
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    const next = new URL(a.href, location.href);
    const current = new URL(location.href);
    const localPages = ['index.html', 'home.html', 'ui.html', 'full.html', 'work.html'];
    const folder = url => url.pathname.slice(0, url.pathname.lastIndexOf('/') + 1);
    if (next.origin !== current.origin || next.protocol !== current.protocol ||
        folder(next) !== folder(current) || next.pathname === current.pathname ||
        !localPages.includes(next.pathname.split('/').pop())) return;
    event.preventDefault();
    if (navigating) return;
    navigating = true;
    finishIntro();
    root.classList.add('is-leaving');
    navigationTimer = setTimeout(() => { location.assign(next.href); }, 160);
    recoveryTimer = setTimeout(reset, 1800);
  });
})();
