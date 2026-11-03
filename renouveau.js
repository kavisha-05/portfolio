(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  const progress = document.querySelector('.scroll-progress span');
  if (!header || !menu || !toggle) return;
  document.body.classList.add('js-enabled');
  const mobile = window.matchMedia('(max-width: 820px)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function closeMenu() {
    menu.hidden = mobile.matches;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  }
  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !opening;
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
  window.addEventListener('resize', closeMenu, { passive: true });
  closeMenu();

  let scrollQueued = false;
  function updateScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    if (progress) progress.style.setProperty('--progress', ratio.toFixed(4));
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

  if (!('IntersectionObserver' in window)) return;
  const links = [...menu.querySelectorAll('a[href^="#"]')];
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

    const consoleElement = document.querySelector('.code-console');
    const codeLines = [...document.querySelectorAll('[data-code-line]')];
    const originals = codeLines.map(line => line.textContent);
    let lineIndex = 0;
    let characterIndex = 0;
    let timer = null;
    let visible = false;
    let complete = false;
    if (consoleElement && codeLines.length) {
      codeLines.forEach(line => { line.textContent = ''; });
      const type = () => {
        if (complete || timer !== null || !visible || document.hidden || motion.matches) return;
        const line = codeLines[lineIndex];
        if (!line) { complete = true; return; }
        line.textContent = originals[lineIndex].slice(0, ++characterIndex);
        if (characterIndex >= originals[lineIndex].length) { lineIndex++; characterIndex = 0; }
        timer = window.setTimeout(() => { timer = null; type(); }, 25);
      };
      const codeObserver = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        if (!visible && timer !== null) { clearTimeout(timer); timer = null; }
        if (visible) type();
      }, { threshold: 0.05 });
      codeObserver.observe(consoleElement);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && timer !== null) { clearTimeout(timer); timer = null; }
        if (!document.hidden) type();
      });
    }
    motion.addEventListener?.('change', event => {
      if (!event.matches) return;
      revealObserver.disconnect();
      document.querySelectorAll('.will-reveal').forEach(element => element.classList.remove('will-reveal', 'is-visible'));
      if (timer !== null) clearTimeout(timer);
      timer = null;
      complete = true;
      codeLines.forEach((line, index) => { line.textContent = originals[index]; });
    });
  }
})();
