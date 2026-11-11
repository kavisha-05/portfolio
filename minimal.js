(() => {
  const nav = document.querySelector('.navigation');
  const toggle = document.querySelector('.menu-toggle');
  const progress = document.querySelector('.reading-progress span');
  const mobile = matchMedia('(max-width: 820px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  document.body.classList.add('js-enabled');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  mobile.addEventListener?.('change', closeMenu);

  let pending = false;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--progress', distance > 0 ? String(Math.max(0, Math.min(1, scrollY / distance))) : '0');
    pending = false;
  }
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(updateProgress); } }, { passive:true });
  addEventListener('resize', updateProgress, { passive:true });
  updateProgress();

  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const active = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin:'-25% 0px -60% 0px', threshold:0 });
    sections.forEach(section => active.observe(section));
    if (!reducedMotion.matches) {
      document.body.classList.add('js-motion');
      const reveal = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-entering'); observer.unobserve(entry.target); } });
      }, { threshold:.05 });
      document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
    }
  }

  const button = document.querySelector('#copy-email');
  const status = document.querySelector('#copy-status');
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Presse-papiers indisponible');
      await navigator.clipboard.writeText('kavisha.rubakanthan@gmail.com');
      status.textContent = 'Adresse copiée !';
    } catch { status.textContent = 'Sélectionne l’adresse e-mail ci-dessus pour la copier.'; }
  });
})();
