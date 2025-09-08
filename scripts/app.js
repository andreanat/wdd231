const navButton = document.querySelector('#nav-button');
const navEl = document.querySelector('#primary-nav');

navButton?.addEventListener('click', () => {
  const isOpen = navButton.classList.toggle('show');
  navButton.setAttribute('aria-expanded', String(isOpen));
  navEl.classList.toggle('show', isOpen);
});
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;
