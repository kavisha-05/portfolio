(() => {
  const section = document.querySelector('#defi');
  const playLink = document.querySelector('.button-play');
  if (!section || !playLink) return;

  const rounds = [
    { question: 'Quel outil pour construire l’interface ?', answer: 'angular', hint: 'Pense à ce que les visiteurs voient et utilisent.', success: 'Angular donne vie à l’interface.' },
    { question: 'Et pour faire fonctionner une API côté serveur ?', answer: 'node', hint: 'Cette technologie exécute du JavaScript côté serveur.', success: 'Node.js fait tourner les services.' },
    { question: 'Où peut-on stocker les données de l’application ?', answer: 'mysql', hint: 'Cherche le système de base de données.', success: 'MySQL garde les données organisées.' },
  ];
  const buttons = [...section.querySelectorAll('[data-choice]')];
  const progress = [...section.querySelectorAll('.arcade-progress span')];
  const score = section.querySelector('.arcade-score');
  const step = section.querySelector('.arcade-step');
  const question = section.querySelector('.arcade-question');
  const feedback = section.querySelector('.arcade-feedback');
  const options = section.querySelector('.arcade-options');
  const restart = section.querySelector('.arcade-restart');
  const projects = section.querySelector('.arcade-projects');
  const consoleElement = section.querySelector('.arcade-console');
  let current = 0;

  function render(message = '') {
    const complete = current === rounds.length;
    score.textContent = `${current} / ${rounds.length}`;
    progress.forEach((item, index) => item.classList.toggle('is-complete', index < current));
    step.textContent = complete ? 'Défi réussi !' : `À toi de choisir · ${current + 1} sur ${rounds.length}`;
    question.textContent = complete ? 'Bravo, ta stack est prête !' : rounds[current].question;
    feedback.textContent = complete ? 'Interface, serveur et données : tu as assemblé les bases d’une application web.' : message || 'Choisis une technologie pour commencer.';
    options.hidden = complete;
    restart.hidden = !complete;
    projects.hidden = !complete;
    consoleElement.classList.toggle('is-won', complete);
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    if (current >= rounds.length) return;
    const round = rounds[current];
    if (button.dataset.choice !== round.answer) {
      feedback.textContent = `Bien tenté ! ${round.hint}`;
      button.classList.remove('is-miss');
      void button.offsetWidth;
      button.classList.add('is-miss');
      return;
    }
    current += 1;
    render(`${round.success} À toi de trouver la suite !`);
  }));
  restart.addEventListener('click', () => { current = 0; render(); buttons[0].focus(); });
  section.hidden = false;
  playLink.hidden = false;
  render();
})();
