(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const hero = document.querySelector('.hero');
  if (hero) {
    for (const depth of ['far', 'near']) {
      const layer = document.createElement('div');
      layer.className = `universe-stars universe-stars-${depth}`;
      layer.setAttribute('aria-hidden', 'true');
      hero.prepend(layer);
    }
    let frame = 0;
    const reset = () => { if (frame) cancelAnimationFrame(frame); frame = 0; hero.style.removeProperty('--universe-x'); hero.style.removeProperty('--universe-y'); };
    hero.addEventListener('pointermove', event => {
      if (motion.matches || !pointer.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--universe-x', ((event.clientX - rect.left) / rect.width - .5).toFixed(3));
        hero.style.setProperty('--universe-y', ((event.clientY - rect.top) / rect.height - .5).toFixed(3));
        frame = 0;
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', reset);
    motion.addEventListener?.('change', event => { if (event.matches) reset(); });
  }

  const shapes = [
    '18,54 47,20 86,39 125,13 160,46',
    '15,19 50,44 85,15 122,50 161,25',
    '18,45 43,16 84,48 121,18 160,42',
    '15,31 47,11 82,42 123,20 161,51',
  ];
  document.querySelectorAll('.skills-carousel .skill-slide').forEach((card, index) => {
    const art = document.createElement('div');
    art.className = 'constellation-art';
    art.setAttribute('aria-hidden', 'true');
    const points = shapes[index % shapes.length].split(' ').map(pair => pair.split(',').map(Number));
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 180 65');
    const line = document.createElementNS(ns, 'polyline');
    line.setAttribute('points', shapes[index % shapes.length]);
    svg.append(line);
    points.forEach(([x, y], pointIndex) => {
      const star = document.createElementNS(ns, 'circle');
      star.setAttribute('cx', String(x)); star.setAttribute('cy', String(y));
      star.setAttribute('r', pointIndex === 2 ? '3.8' : '2.5');
      svg.append(star);
    });
    art.append(svg);
    card.insertBefore(art, card.querySelector('.skill-icon'));
    const technologies = card.querySelector('p:last-of-type');
    if (technologies) technologies.classList.add('constellation-tech');
    const hint = document.createElement('span');
    hint.className = 'constellation-hint'; hint.setAttribute('aria-hidden', 'true');
    hint.textContent = 'Survoler pour découvrir'; card.append(hint);
    card.tabIndex = 0;
  });

  const sections = [...document.querySelectorAll('.section')];
  sections.forEach(section => {
    const trail = document.createElement('span');
    trail.className = 'universe-trail';
    trail.setAttribute('aria-hidden', 'true');
    section.append(trail);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('universe-in-view', entry.isIntersecting)), { threshold: .08 });
    sections.forEach(section => observer.observe(section));
  }
})();
