(() => {
  const navbar = document.querySelector('.navbar');
  const menu = document.querySelector('.nav-menu');
  const toggle = document.querySelector('.hamburger');
  if (!navbar || !menu || !toggle) return;
  document.body.classList.add('js-enabled');
  const mobile = window.matchMedia('(max-width: 768px)');

  function closeMenu() {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    menu.hidden = mobile.matches;
  }
  function updateLayout() {
    closeMenu();
    document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`);
  }
  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !opening;
    menu.classList.toggle('active', opening);
    toggle.classList.toggle('active', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  window.addEventListener('resize', updateLayout, { passive: true });
  updateLayout();
  if ('ResizeObserver' in window) new ResizeObserver(() => document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)).observe(navbar);

  if (!('IntersectionObserver' in window)) return;
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
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
        window.setTimeout(clean, 900);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.02 });
    document.querySelectorAll('.about-card, .annonce-card, .timeline-item, .education-card, .project-card, .skills-category, .info-card').forEach(element => {
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
