(() => {
  const films = [
    { id: 'horizon', title: 'L’Horizon bleu', genre: 'Aventure', duration: '1 h 42', description: 'Une exploratrice suit une carte oubliée jusqu’à une île inconnue.', colors: ['#24485e', '#101d36'] },
    { id: 'minuit', title: 'Rendez-vous à minuit', genre: 'Comédie', duration: '1 h 31', description: 'Deux voisins organisent une soirée qui ne se déroule pas comme prévu.', colors: ['#713c45', '#28151f'] },
    { id: 'orbite', title: 'Orbite lointaine', genre: 'Science-fiction', duration: '1 h 55', description: 'Une équipe reçoit un signal inattendu au-delà du système solaire.', colors: ['#3d416c', '#11152f'] },
    { id: 'sentier', title: 'Le Dernier sentier', genre: 'Aventure', duration: '1 h 38', description: 'Un voyage à travers la montagne rapproche deux anciennes amies.', colors: ['#4a6049', '#18271f'] },
    { id: 'cafe', title: 'Un café pour deux', genre: 'Comédie', duration: '1 h 27', description: 'Un petit café de quartier devient le théâtre de rencontres inattendues.', colors: ['#80553a', '#2c1a18'] },
    { id: 'demain', title: 'Demain ailleurs', genre: 'Science-fiction', duration: '1 h 48', description: 'Une ingénieure découvre une façon inattendue de communiquer avec le futur.', colors: ['#3b6270', '#13202b'] },
  ];
  const storageKey = 'portfolio-streamflix-demo-cart';
  const grid = document.querySelector('#movie-grid');
  const search = document.querySelector('#search');
  const results = document.querySelector('#results');
  const movieDialog = document.querySelector('#movie-dialog');
  const cartDialog = document.querySelector('#cart-dialog');
  const cartCount = document.querySelector('#cart-count');
  const cartItems = document.querySelector('#cart-items');
  const cartEmpty = document.querySelector('#cart-empty');
  search.value = new URLSearchParams(location.search).get('search') || '';
  let selectedGenre = 'Tous';
  let currentFilm = null;
  let cart = [];
  try { const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); cart = Array.isArray(saved) ? saved.filter(id => films.some(film => film.id === id)) : []; } catch { cart = []; }
  const persist = () => { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch {} };
  function updateCart() {
    cartCount.textContent = String(cart.length);
    cartItems.replaceChildren();
    cartEmpty.hidden = cart.length > 0;
    document.querySelector('#clear-cart').hidden = cart.length === 0;
    cart.forEach(id => {
      const film = films.find(item => item.id === id);
      if (!film) return;
      const item = document.createElement('li');
      const title = document.createElement('span'); title.textContent = film.title;
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Retirer';
      remove.setAttribute('aria-label', `Retirer ${film.title} du panier de démonstration`);
      remove.addEventListener('click', () => { cart = cart.filter(value => value !== id); persist(); updateCart(); });
      item.append(title, remove); cartItems.append(item);
    });
  }
  function openFilm(film) {
    currentFilm = film;
    document.querySelector('#movie-dialog-title').textContent = film.title;
    document.querySelector('#movie-dialog-genre').textContent = film.genre;
    document.querySelector('#movie-dialog-meta').textContent = film.duration;
    document.querySelector('#movie-dialog-description').textContent = film.description;
    document.querySelector('#cart-message').textContent = '';
    movieDialog.showModal();
  }
  function renderFilms() {
    const query = search.value.trim().toLocaleLowerCase('fr');
    const filtered = films.filter(film => (selectedGenre === 'Tous' || film.genre === selectedGenre) && `${film.title} ${film.genre}`.toLocaleLowerCase('fr').includes(query));
    results.textContent = `${filtered.length} film${filtered.length === 1 ? '' : 's'} fictif${filtered.length === 1 ? '' : 's'}`;
    grid.replaceChildren();
    if (!filtered.length) { const empty = document.createElement('p'); empty.className = 'empty-state'; empty.textContent = 'Aucun film ne correspond à votre recherche.'; grid.append(empty); return; }
    filtered.forEach(film => {
      const article = document.createElement('article'); article.className = 'movie-card';
      const art = document.createElement('div'); art.className = 'movie-art'; art.style.setProperty('--poster-a', film.colors[0]); art.style.setProperty('--poster-b', film.colors[1]);
      const artTitle = document.createElement('strong'); artTitle.textContent = film.title; art.append(artTitle);
      const body = document.createElement('div'); body.className = 'movie-body';
      const meta = document.createElement('p'); meta.textContent = `${film.genre} · ${film.duration}`;
      const details = document.createElement('button'); details.type = 'button'; details.textContent = 'Voir la fiche'; details.setAttribute('aria-label', `Voir la fiche de ${film.title}`); details.addEventListener('click', () => openFilm(film));
      body.append(meta, details); article.append(art, body); grid.append(article);
    });
  }
  document.querySelectorAll('[data-genre]').forEach(button => button.addEventListener('click', () => {
    selectedGenre = button.dataset.genre;
    document.querySelectorAll('[data-genre]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderFilms();
  }));
  search.addEventListener('input', renderFilms);
  document.querySelector('#add-to-cart').addEventListener('click', () => {
    if (!currentFilm) return;
    if (!cart.includes(currentFilm.id)) { cart.push(currentFilm.id); persist(); updateCart(); }
    document.querySelector('#cart-message').textContent = 'Ajouté au panier de démonstration.';
  });
  document.querySelector('#open-cart').addEventListener('click', () => { updateCart(); cartDialog.showModal(); });
  document.querySelector('#clear-cart').addEventListener('click', () => { cart = []; persist(); updateCart(); });
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  updateCart(); renderFilms();
})();
