(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(pointer: fine)').matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      if (motion.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--mouse-x', `${((event.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
        hero.style.setProperty('--mouse-y', `${((event.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
        frame = 0;
      });
    }, { passive: true });
  }
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        current.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    motion.addEventListener?.('change', event => { if (event.matches) observer.disconnect(); });
  }
})();
