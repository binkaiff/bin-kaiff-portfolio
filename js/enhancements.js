/* Active section, reading progress and native document Back restoration. */
(() => {
  const root = document.documentElement;
  const bar = document.querySelector('.reading-progress');
  const links = [...document.querySelectorAll('.nav-links a[href]')];
  const sections = links.map(link => {
    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return null;
    const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    return section ? { link, section } : null;
  }).filter(Boolean);
  let scheduled = false;
  function update() {
    scheduled = false;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0})`;
    const header = document.querySelector('.header');
    const threshold = (header ? header.getBoundingClientRect().height : 80) + 100;
    let active = null;
    sections.forEach(item => { if (item.section.getBoundingClientRect().top <= threshold) active = item; });
    if (sections.length && available > 0 && window.scrollY >= available - 2) active = sections[sections.length - 1];
    sections.forEach(item => {
      const selected = item === active;
      item.link.classList.toggle('section-active', selected);
      if (selected) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
  }
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  update();

  // Save in this exact history entry, so browser Back knows where to return.
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[data-restore-scroll]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    try {
      history.replaceState({ ...history.state, portfolioReturn: {
        x: window.scrollX, y: window.scrollY, focusId: link.id
      } }, '', location.href);
    } catch (_) { /* Native browser scroll restoration remains available. */ }
  });
  function restore(event) {
    const back = event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    const saved = history.state?.portfolioReturn;
    if (!back || !saved || !Number.isFinite(saved.y)) return;
    root.classList.add('restoring-position');
    requestAnimationFrame(() => {
      window.scrollTo(saved.x, saved.y);
      const origin = document.getElementById(saved.focusId);
      if (origin) origin.focus({ preventScroll: true });
      requestAnimationFrame(() => { root.classList.remove('restoring-position'); schedule(); });
    });
  }
  window.addEventListener('pageshow', restore);
})();
