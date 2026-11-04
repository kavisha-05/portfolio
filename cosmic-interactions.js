(() => {
  function init() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function initInfiniteSkills(carousel) {
      const track = carousel.querySelector('[data-carousel-track]');
      const previous = carousel.querySelector('[data-carousel-prev]');
      const next = carousel.querySelector('[data-carousel-next]');
      const status = carousel.querySelector('[data-carousel-status]');
      if (!track || !previous || !next || !status) return;
      const originals = [...track.querySelectorAll('[data-carousel-item]')];
      if (!originals.length) return;
      carousel.setAttribute('role', 'region');
      carousel.setAttribute('aria-roledescription', 'carrousel');
      originals.forEach((item, index) => {
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'diapositive');
        item.setAttribute('aria-label', `${index + 1} sur ${originals.length}`);
      });
      let touching = false, active = 0;
      let inView = !('IntersectionObserver' in window);
      let touchTimer = 0, lastReduced = reducedMotion.matches;
      const dots = originals.map((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Afficher les compétences à partir de la carte ${index + 1}`);
        dot.addEventListener('click', () => { active = index; render(true); });
        return dot;
      });
      status.replaceChildren(...dots);
      const countVisible = () => track.clientWidth < 470 ? 1 : track.clientWidth < 850 ? 2 : 3;
      function render(animate = false) {
        const count = reducedMotion.matches ? originals.length : countVisible();
        track.style.setProperty('--skill-columns', count);
        originals.forEach((_, position) => {
          const item = originals[(active + position) % originals.length];
          item.hidden = position >= count;
          item.classList.remove('skill-arrive');
          track.append(item);
          if (animate && position < count && !reducedMotion.matches) {
            item.style.setProperty('--skill-delay', `${position * 55}ms`);
            requestAnimationFrame(() => item.classList.add('skill-arrive'));
          }
        });
        dots.forEach((dot, index) => {
          if (index === active) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      }
      const sync = () => {
        const running = !reducedMotion.matches;
        track.classList.toggle('is-continuous', running);
        previous.hidden = false;
        next.hidden = false;
        status.hidden = !running;
        track.scrollLeft = 0;
        render();
      };
      let touchStart = null;
      track.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'touch') return;
        clearTimeout(touchTimer);
        touching = true;
        touchStart = event.clientX;
      });
      const releaseTouch = event => {
        if (touchStart !== null && event.type === 'pointerup' && Math.abs(event.clientX - touchStart) > 45 && !reducedMotion.matches) {
          active = (active + (event.clientX < touchStart ? 1 : -1) + originals.length) % originals.length;
          render(true);
        }
        touchStart = null;
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => { touching = false; }, 2500);
      };
      track.addEventListener('pointerup', releaseTouch);
      track.addEventListener('pointercancel', releaseTouch);
      previous.addEventListener('click', () => {
        if (reducedMotion.matches) track.scrollBy({ left: -track.clientWidth * .75, behavior: 'auto' });
        else { active = (active - 1 + originals.length) % originals.length; render(true); }
      });
      next.addEventListener('click', () => {
        if (reducedMotion.matches) track.scrollBy({ left: track.clientWidth * .75, behavior: 'auto' });
        else { active = (active + 1) % originals.length; render(true); }
      });
      track.addEventListener('keydown', event => {
        if (reducedMotion.matches || event.target !== track || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        active = (active + (event.key === 'ArrowRight' ? 1 : -1) + originals.length) % originals.length;
        render(true);
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => { inView = entries.some(entry => entry.isIntersecting); }, { threshold: .15 }).observe(carousel);
      }
      reducedMotion.addEventListener?.('change', sync);
      window.addEventListener('resize', () => render(), { passive:true });
      sync();
      window.setInterval(() => {
        if (lastReduced !== reducedMotion.matches) { lastReduced = reducedMotion.matches; sync(); }
        if (reducedMotion.matches || touching || carousel.contains(document.activeElement) || !inView || document.hidden) return;
        active = (active + 1) % originals.length;
        render(true);
      }, 4200);
    }

    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      if (carousel.classList.contains('skills-carousel')) {
        initInfiniteSkills(carousel);
        return;
      }
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
