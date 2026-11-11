(() => {
  function init() {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const heroArt = document.querySelector('.hero-art');
    if (heroArt) {
      const hud = document.createElement('div');
      hud.className = 'game-hero-hud';
      hud.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span'); label.textContent = 'Profil';
      const info = document.createElement('b'); info.textContent = 'Interface · Web · Données';
      hud.append(label, info); heroArt.append(hud);
    }

    const carousel = document.querySelector('.skills-carousel');
    if (carousel) {
      const cards = [...carousel.querySelectorAll('.skill-slide')];
      const technologies = cards.map(card => card.querySelector('p:last-of-type'));
      const status = carousel.querySelector('[data-carousel-status]');
      const controls = document.createElement('div');
      controls.className = 'talent-selector'; controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', 'Choisir une famille de compétences');
      const buttons = cards.map((card, index) => {
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = card.querySelector('h3')?.textContent || `Compétences ${index + 1}`;
        button.setAttribute('aria-pressed', String(index === 0));
        button.addEventListener('click', () => status?.querySelectorAll('button')[index]?.click());
        controls.append(button); return button;
      });
      carousel.prepend(controls);
      function sync() {
        const dots = [...(status?.querySelectorAll('button') || [])];
        const index = Math.max(0, dots.findIndex(dot => dot.getAttribute('aria-current') === 'true'));
        buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
        cards.forEach((card, i) => {
          card.classList.toggle('talent-active', i === index);
          if (technologies[i]) technologies[i].hidden = i !== index;
        });
      }
      if (status) new MutationObserver(sync).observe(status, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
      sync();
    }

    document.querySelectorAll('.project-carousel .project-card').forEach((card, index) => {
      const body = card.querySelector('.project-body');
      const tags = body?.querySelector('.project-tags');
      const title = body?.querySelector('h3')?.textContent;
      if (!body || !tags || !title) return;
      const details = document.createElement('details'); details.className = 'mission-details';
      const summary = document.createElement('summary'); summary.textContent = 'Voir les technologies';
      details.append(summary); tags.before(details); details.append(tags);
      const label = document.createElement('span'); label.className = 'mission-number'; label.setAttribute('aria-hidden', 'true'); label.textContent = `Mission ${String(index + 1).padStart(2, '0')}`;
      body.prepend(label);
      details.addEventListener('toggle', () => card.classList.toggle('mission-selected', details.open));
    });

    const timeline = document.querySelector('.timeline');
    if (timeline) {
      const cards = [...timeline.querySelectorAll('.timeline-card')];
      const selector = document.createElement('div'); selector.className = 'experience-selector'; selector.setAttribute('role', 'group'); selector.setAttribute('aria-label', 'Sélectionner une expérience');
      const buttons = cards.map((card, index) => {
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = card.querySelector('h3')?.textContent || `Expérience ${index + 1}`;
        button.setAttribute('aria-pressed', 'false'); button.addEventListener('click', () => select(index));
        selector.append(button); return button;
      });
      function select(index) {
        cards.forEach((card, i) => {
          const chosen = i === index; card.classList.toggle('experience-active', chosen);
          buttons[i].setAttribute('aria-pressed', String(chosen));
          const detail = card.querySelector('.experience-details'); if (detail && detail.open !== chosen) detail.open = chosen;
        });
      }
      cards.forEach((card, index) => card.querySelector('.experience-details')?.addEventListener('toggle', event => {
        if (event.currentTarget.open && !card.classList.contains('experience-active')) select(index);
        else if (!event.currentTarget.open && card.classList.contains('experience-active')) { card.classList.remove('experience-active'); buttons[index].setAttribute('aria-pressed', 'false'); }
      }));
      timeline.before(selector); select(0);
    }

    if (fine.matches && !motion.matches) document.querySelectorAll('.cosmic-button').forEach(button => {
      let frame = 0;
      const reset = () => { if (frame) cancelAnimationFrame(frame); frame = 0; button.style.removeProperty('--game-x'); button.style.removeProperty('--game-y'); };
      button.addEventListener('pointermove', event => {
        if (motion.matches) return;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = button.getBoundingClientRect();
          button.style.setProperty('--game-x', `${((event.clientX - rect.left) / rect.width - .5) * 7}px`);
          button.style.setProperty('--game-y', `${((event.clientY - rect.top) / rect.height - .5) * 7}px`);
          frame = 0;
        });
      }, { passive: true });
      button.addEventListener('pointerleave', reset);
      motion.addEventListener?.('change', event => { if (event.matches) reset(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
