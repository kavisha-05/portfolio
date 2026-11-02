(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  let scrollQueued = false;
  const updateScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progress?.style.setProperty('--scroll-progress', ratio.toFixed(4));
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      window.requestAnimationFrame(updateScroll);
      scrollQueued = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  if (!('IntersectionObserver' in window)) return;
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add('is-visible');
        observer.unobserve(element);
        const clean = () => element.classList.remove('will-reveal', 'is-visible');
        element.addEventListener('transitionend', clean, { once: true });
        window.setTimeout(clean, 1000);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.02 });
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight + 20) {
        element.classList.add('will-reveal');
        revealObserver.observe(element);
      }
    });
    motion.addEventListener?.('change', event => {
      if (!event.matches) return;
      revealObserver.disconnect();
      document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal', 'is-visible'));
    });
  }
})();
