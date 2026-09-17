/* Pause decoration automatically when the hero is offscreen or the tab is hidden. */
(() => {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const visibility = () => root.classList.toggle('motion-background', document.hidden);
  document.addEventListener('visibilitychange', visibility);
  visibility();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      root.classList.toggle('hero-offscreen', !entries[0].isIntersecting);
    });
    observer.observe(hero);
  }
})();
