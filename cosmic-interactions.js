(() => {
  function init() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const track = carousel.querySelector('[data-carousel-track]');
      const previous = carousel.querySelector('[data-carousel-prev]');
      const next = carousel.querySelector('[data-carousel-next]');
      const status = carousel.querySelector('[data-carousel-status]');
      if (!track || !previous || !next) return;

      const items = [...track.querySelectorAll('[data-carousel-item]')];
      if (!items.length) return;
      carousel.setAttribute('aria-roledescription', 'carrousel');
      if (!carousel.hasAttribute('role')) carousel.setAttribute('role', 'region');
      if (!track.hasAttribute('tabindex')) track.tabIndex = 0;
      items.forEach((item, index) => {
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'diapositive');
        if (!item.hasAttribute('aria-label')) item.setAttribute('aria-label', `${index + 1} sur ${items.length}`);
      });

      let positions = [0];
      let current = 0;
      let dots = [];
      let frame = 0;

      function positionFor(item) {
        const trackBox = track.getBoundingClientRect();
        const itemBox = item.getBoundingClientRect();
        return itemBox.left - trackBox.left + track.scrollLeft;
      }

      function goTo(index) {
        const page = Math.max(0, Math.min(index, positions.length - 1));
        track.scrollTo({ left: positions[page], behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      }

      function renderDots() {
        if (!status) return;
        const fragment = document.createDocumentFragment();
        dots = positions.map((_, index) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel-dot';
          dot.setAttribute('aria-label', `Aller à la page ${index + 1} sur ${positions.length}`);
          dot.addEventListener('click', () => goTo(index));
          fragment.append(dot);
          return dot;
        });
        status.replaceChildren(fragment);
        status.hidden = positions.length <= 1;
      }

      function update() {
        frame = 0;
        const offset = track.scrollLeft;
        let closest = 0;
        positions.forEach((position, index) => {
          if (Math.abs(position - offset) < Math.abs(positions[closest] - offset)) closest = index;
        });
        current = closest;
        previous.disabled = current === 0;
        next.disabled = current === positions.length - 1;
        dots.forEach((dot, index) => {
          if (index === current) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      }

      function measure() {
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        const nextPositions = [];
        items.forEach(item => {
          const offset = Math.max(0, Math.min(maxScroll, positionFor(item)));
          if (!nextPositions.length || offset - nextPositions[nextPositions.length - 1] > 1) nextPositions.push(offset);
        });
        positions = nextPositions.length ? nextPositions : [0];
        renderDots();
        update();
      }

      previous.addEventListener('click', () => goTo(current - 1));
      next.addEventListener('click', () => goTo(current + 1));
      track.addEventListener('scroll', () => {
        if (!frame) frame = requestAnimationFrame(update);
      }, { passive: true });
      track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        let target;
        if (event.key === 'ArrowRight') target = current + 1;
        else if (event.key === 'ArrowLeft') target = current - 1;
        else if (event.key === 'Home') target = 0;
        else if (event.key === 'End') target = positions.length - 1;
        else return;
        event.preventDefault();
        goTo(target);
      });

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(track);
      } else {
        window.addEventListener('resize', measure, { passive: true });
      }
      measure();
    });

    const nav = document.querySelector('.side-nav');
    const toggle = document.querySelector('.mobile-toggle');
    const mobile = window.matchMedia('(max-width: 900px)');
    if (nav && toggle) {
      function setMenu(open) {
        const expanded = mobile.matches && open;
        nav.hidden = mobile.matches && !expanded;
        nav.classList.toggle('is-open', expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.setAttribute('aria-label', expanded ? 'Fermer le menu' : 'Ouvrir le menu');
      }
      toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
      nav.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          toggle.focus();
        }
      });
      mobile.addEventListener?.('change', () => setMenu(false));
      setMenu(false);
    }

    if (nav && 'IntersectionObserver' in window) {
      const links = [...nav.querySelectorAll('a[href^="#"]')];
      const sections = links.map(link => document.getElementById(link.getAttribute('href').slice(1))).filter(Boolean);
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link => {
            if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
      sections.forEach(section => observer.observe(section));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
