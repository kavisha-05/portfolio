(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    let frame = 0;
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--pointer-x');
      card.style.removeProperty('--pointer-y');
    };
    card.addEventListener('pointermove', event => {
      if (motion.matches || !finePointer.matches) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        card.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
        card.style.setProperty('--pointer-x', `${((x + .5) * 100).toFixed(1)}%`);
        card.style.setProperty('--pointer-y', `${((y + .5) * 100).toFixed(1)}%`);
        frame = 0;
      });
    }, { passive: true });
    card.addEventListener('pointerleave', reset);
    motion.addEventListener?.('change', reset);
  });
})();
