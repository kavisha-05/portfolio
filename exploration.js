(() => {
  const game = document.querySelector('.discovery-game');
  if (!game) return;
  const links = [...game.querySelectorAll('[data-discovery]')];
  const status = game.querySelector('.game-status');
  const meter = game.querySelector('.game-meter span');
  const done = new Set();
  function update() {
    const count = done.size;
    status.textContent = count === links.length ? 'Bravo, vous avez exploré tout le parcours !' : `${count} découverte${count > 1 ? 's' : ''} sur ${links.length}`;
    meter.style.width = `${count / links.length * 100}%`;
    links.forEach(link => link.classList.toggle('is-done', done.has(link.dataset.discovery)));
  }
  links.forEach(link => link.addEventListener('click', () => { done.add(link.dataset.discovery); update(); }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const link = links.find(item => item.getAttribute('href') === `#${entry.target.id}`);
        if (link) { done.add(link.dataset.discovery); update(); }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    links.forEach(link => { const section = document.querySelector(link.getAttribute('href')); if (section) observer.observe(section); });
  }
  game.hidden = false;
  update();
})();
