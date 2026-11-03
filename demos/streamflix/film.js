(() => {
  const films = [
    { id:'horizon', title:'L’Horizon bleu', genre:'Aventure', duration:'1 h 42', description:'Une exploratrice suit une carte oubliée jusqu’à une île inconnue.' },
    { id:'minuit', title:'Rendez-vous à minuit', genre:'Comédie', duration:'1 h 31', description:'Deux voisins organisent une soirée qui ne se déroule pas comme prévu.' },
    { id:'orbite', title:'Orbite lointaine', genre:'Science-fiction', duration:'1 h 55', description:'Une équipe reçoit un signal inattendu au-delà du système solaire.' },
    { id:'sentier', title:'Le Dernier sentier', genre:'Aventure', duration:'1 h 38', description:'Un voyage à travers la montagne rapproche deux anciennes amies.' },
    { id:'cafe', title:'Un café pour deux', genre:'Comédie', duration:'1 h 27', description:'Un petit café de quartier devient le théâtre de rencontres inattendues.' },
    { id:'demain', title:'Demain ailleurs', genre:'Science-fiction', duration:'1 h 48', description:'Une ingénieure découvre une façon inattendue de communiquer avec le futur.' },
  ];
  const film = films.find(item => item.title === new URLSearchParams(location.search).get('film')) || films[0];
  document.title = `${film.title} · StreamFlix`;
  document.querySelector('#film-title').textContent = film.title;
  document.querySelector('#film-genre').textContent = film.genre;
  document.querySelector('#film-duration').textContent = film.duration;
  document.querySelector('#film-description').textContent = film.description;
  const poster = document.querySelector('#film-poster'); poster.src = `mock/film-${films.indexOf(film)+1}.jpg`; poster.alt = `Visuel fictif pour ${film.title}`;
  document.querySelector('#buy-film').addEventListener('click', () => {
    let cart = []; try { cart = JSON.parse(localStorage.getItem('portfolio-streamflix-demo-cart') || '[]'); } catch {}
    if (!Array.isArray(cart)) cart = [];
    if (!cart.includes(film.id)) cart.push(film.id);
    try { localStorage.setItem('portfolio-streamflix-demo-cart', JSON.stringify(cart)); } catch {}
    document.querySelector('#film-status').textContent = 'Film ajouté au panier de démonstration.';
  });
})();
