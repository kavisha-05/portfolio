(() => {
  const names = { horizon:'L’Horizon bleu', minuit:'Rendez-vous à minuit', orbite:'Orbite lointaine', sentier:'Le Dernier sentier', cafe:'Un café pour deux', demain:'Demain ailleurs' };
  const plans = { 'standard-ads': ['Standard avec pub', 7.99], standard: ['Standard', 14.99], premium: ['Premium', 21.99] };
  let cart = [], selectedPlan = null;
  try { cart = JSON.parse(localStorage.getItem('portfolio-streamflix-demo-cart') || '[]'); selectedPlan = localStorage.getItem('portfolio-streamflix-demo-plan'); } catch {}
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter(id => names[id]);
  const list = document.querySelector('#payment-items');
  const price = value => `${value.toFixed(2).replace('.', ',')} €`;
  function row(label, amount) { const item=document.createElement('li'); item.textContent=`${label} · ${price(amount)}`; list.append(item); }
  cart.forEach(id => row(names[id], 3.99));
  const plan = plans[selectedPlan]; if (plan) row(`Abonnement ${plan[0]}`, plan[1]);
  const total = cart.length * 3.99 + (plan?.[1] || 0);
  document.querySelector('#payment-total').textContent = total ? `Total fictif : ${price(total)}` : 'Votre panier de démonstration est vide.';
  const confirm = document.querySelector('#confirm-payment'); confirm.disabled = total === 0;
  confirm.addEventListener('click', () => {
    try { localStorage.removeItem('portfolio-streamflix-demo-cart'); localStorage.removeItem('portfolio-streamflix-demo-plan'); } catch {}
    document.querySelector('#payment-message').textContent = 'Simulation terminée : aucune commande réelle n’a été passée.';
    confirm.disabled = true;
  });
})();
