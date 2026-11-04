(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const aura=document.querySelector('.cursor-aura');
  if (aura && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let pointerFrame=0, pointerX=0, pointerY=0;
    document.addEventListener('pointermove', event => {
      if (reduce.matches) return;
      pointerX=event.clientX; pointerY=event.clientY;
      if (!pointerFrame) pointerFrame=requestAnimationFrame(() => {
        aura.style.transform=`translate3d(${pointerX}px,${pointerY}px,0)`;
        aura.classList.add('is-active'); pointerFrame=0;
      });
    }, {passive:true});
    document.addEventListener('pointerout', event => { if (!event.relatedTarget) aura.classList.remove('is-active'); });
    reduce.addEventListener?.('change', event => { if (event.matches) aura.classList.remove('is-active'); });
  }
  const canvas = document.querySelector('.space-canvas');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    let points = [], width = 0, height = 0, frame = 0, lastDraw = 0;
    const colors = ['150,214,255', '193,150,255', '244,180,255'];
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(50, Math.max(18, Math.round(width * height / 25000)));
      points = Array.from({length: count}, (_, index) => ({
        x:Math.random()*width, y:Math.random()*height,
        dx:(Math.random()-.5)*.16, dy:(Math.random()-.5)*.16,
        size:index%13===0?2.1:.7+Math.random()*1.1,
        color:colors[index%colors.length], phase:Math.random()*Math.PI*2
      }));
      draw(0);
    }
    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      for (let i=0; i<points.length; i++) {
        const point=points[i];
        if (!reduce.matches && time) {
          point.x=(point.x+point.dx+width)%width;
          point.y=(point.y+point.dy+height)%height;
        }
        const alpha=reduce.matches ? .55 : .42 + .25*Math.sin(time/1400+point.phase);
        ctx.fillStyle=`rgba(${point.color},${Math.max(.15,alpha)})`;
        ctx.beginPath(); ctx.arc(point.x,point.y,point.size,0,Math.PI*2); ctx.fill();
        for (let j=i+1; j<points.length; j++) {
          const other=points[j], distance=Math.hypot(point.x-other.x,point.y-other.y);
          if (distance < 105) {
            ctx.strokeStyle=`rgba(146,179,255,${(1-distance/105)*.12})`;
            ctx.lineWidth=.7; ctx.beginPath(); ctx.moveTo(point.x,point.y); ctx.lineTo(other.x,other.y); ctx.stroke();
          }
        }
      }
    }
    function animate(time) {
      frame=0;
      if (document.hidden || reduce.matches) return;
      if (time-lastDraw >= 32) { draw(time); lastDraw=time; }
      frame=requestAnimationFrame(animate);
    }
    function start() {
      if (frame) cancelAnimationFrame(frame);
      frame=0;
      if (reduce.matches || document.hidden) draw(0);
      else frame=requestAnimationFrame(animate);
    }
    window.addEventListener('resize', resize, {passive:true});
    document.addEventListener('visibilitychange', start);
    reduce.addEventListener?.('change', start);
    resize(); start();
  }

  const label=document.querySelector('[data-hud-label]');
  const number=document.querySelector('[data-hud-number]');
  const pages=[['accueil','Accueil'],['apropos','À propos'],['competences','Compétences'],['experiences','Expériences'],['projets','Projets'],['methode','Le projet RK'],['formation','Formation'],['contact','Contact']];
  if (label && number && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index=pages.findIndex(page => page[0]===entry.target.id);
        if (index<0) return;
        label.textContent=pages[index][1];
        number.textContent=`${String(index).padStart(2,'0')} / 07`;
      });
    }, {rootMargin:'-30% 0px -55% 0px',threshold:0});
    pages.forEach(([id]) => { const section=document.getElementById(id); if (section) observer.observe(section); });
  }
})();
