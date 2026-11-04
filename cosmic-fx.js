(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const progress = document.querySelector('.reading-progress span');
  let scrollFrame = 0;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.setProperty('--read-progress', distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
    scrollFrame = 0;
  }
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }, { passive:true });
  window.addEventListener('resize', updateProgress, { passive:true });
  updateProgress();

  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if (hero && art) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      if (reduced.matches || !fine.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        art.style.setProperty('--hero-ry', `${(((event.clientX-rect.left)/rect.width-.5)*9).toFixed(2)}deg`);
        art.style.setProperty('--hero-rx', `${(-((event.clientY-rect.top)/rect.height-.5)*7).toFixed(2)}deg`);
        frame = 0;
      });
    }, { passive:true });
    hero.addEventListener('pointerleave', () => { if (frame) cancelAnimationFrame(frame); frame=0; art.style.removeProperty('--hero-rx'); art.style.removeProperty('--hero-ry'); });
  }

  const cards = [...document.querySelectorAll('.skill-slide,.timeline-card,.project-card,.story-card,.education-card')];
  cards.forEach(card => {
    card.classList.add('depth-ready');
    let frame = 0;
    const reset = () => { if (frame) cancelAnimationFrame(frame); frame=0; ['--depth-x','--depth-y','--light-x','--light-y'].forEach(key => card.style.removeProperty(key)); };
    card.addEventListener('pointermove', event => {
      if (reduced.matches || !fine.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x=(event.clientX-rect.left)/rect.width-.5, y=(event.clientY-rect.top)/rect.height-.5;
        card.style.setProperty('--depth-x', `${(-y*5).toFixed(2)}deg`);
        card.style.setProperty('--depth-y', `${(x*5).toFixed(2)}deg`);
        card.style.setProperty('--light-x', `${((x+.5)*100).toFixed(1)}%`);
        card.style.setProperty('--light-y', `${((y+.5)*100).toFixed(1)}%`);
        frame=0;
      });
    }, { passive:true });
    card.addEventListener('pointerleave', reset);
    reduced.addEventListener?.('change', reset);
  });

  if (!('IntersectionObserver' in window)) return;
  const targets = [...document.querySelectorAll('.section-head,.about-copy,.timeline-card,.story-card,.education-card,.contact-copy,.project-image,.about-portrait,.contact-visual')];
  targets.forEach(el => { el.classList.remove('reveal'); el.classList.add(el.matches('.project-image,.about-portrait,.contact-visual') ? 'image-fx' : 'scroll-fx'); });
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || reduced.matches) return;
      entry.target.classList.add('in-view');
      current.unobserve(entry.target);
      entry.target.addEventListener('animationend', () => entry.target.classList.remove('in-view'), { once:true });
    });
  }, { threshold:.1, rootMargin:'0px 0px -5% 0px' });
  targets.forEach(el => observer.observe(el));
  reduced.addEventListener?.('change', event => { if (event.matches) { observer.disconnect(); document.querySelectorAll('.in-view').forEach(el => el.classList.remove('in-view')); } });
})();
