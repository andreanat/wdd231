const navButton = document.querySelector('#nav-button');
const navEl = document.querySelector('#primary-nav');

navButton?.addEventListener('click', () => {
  const open = navButton.classList.toggle('show');
  navButton.setAttribute('aria-expanded', String(open));
  navEl.classList.toggle('show', open);
});