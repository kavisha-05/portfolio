(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress span');
  let scrollQueued = false;

  function updateScroll() {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    if (progress) progress.style.setProperty('--progress', ratio.toFixed(4));
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      window.requestAnimationFrame(updateScroll);
      scrollQueued = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motionPreference.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add('is-visible');
        observer.unobserve(element);
        const cleanUp = () => element.classList.remove('will-reveal', 'is-visible');
        element.addEventListener('transitionend', cleanUp, { once: true });
        window.setTimeout(cleanUp, 1000);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });

    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.94) {
        element.classList.add('will-reveal');
        revealObserver.observe(element);
      }
    });
    motionPreference.addEventListener?.('change', event => {
      if (!event.matches) return;
      revealObserver.disconnect();
      document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal', 'is-visible'));
    });
  }

  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
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
  }
})();
