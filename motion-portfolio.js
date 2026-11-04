(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;

  const hero = document.querySelector('.hero');
  let frame = 0;
  const update = () => {
    if (hero) hero.style.setProperty('--hero-scroll', Math.min(window.scrollY, hero.offsetHeight));
    frame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update);
  }, { passive: true });
  update();

  if (!('IntersectionObserver' in window)) return;
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-enter');
      current.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.section-heading, .about-lead, .about-copy, .experience-item, .project-card, .skill-item, .education-item, .contact-layout').forEach((element, index) => {
    element.style.setProperty('--enter-delay', `${(index % 3) * 90}ms`);
    observer.observe(element);
  });
  motion.addEventListener?.('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.body.classList.remove('motion-ready');
      if (hero) hero.style.removeProperty('--hero-scroll');
    }
  });
})();
