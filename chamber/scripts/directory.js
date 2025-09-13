const container = document.getElementById('directory');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

const DATA_URL = 'data/members.json';

async function getMembers() {
  const res = await fetch(DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

function telHref(phoneRaw) {
  return 'tel:' + (phoneRaw || '').replace(/[^0-9+]/g, '');
}

function cardHTML(m) {
  return `
    <article class="card">
      <header>
        <img class="logo" src="${m.image}" alt="${m.name} logo" loading="lazy" width="52" height="52">
        <h3 class="name">${m.name}</h3>
        <span class="badge">${m.membership}</span>
      </header>
      <p class="meta">${m.address}</p>
      <p class="meta"><a href="${telHref(m.phone)}">${m.phone}</a></p>
      <p class="meta">
        <a href="${m.url}" target="_blank" rel="noopener">Website</a>
      </p>
    </article>
  `;
}

function render(list) {
  container.innerHTML = list.map(cardHTML).join('');
}

function setView(mode) {
  const isList = mode === 'list';
  container.classList.toggle('list', isList);
  gridBtn.classList.toggle('active', !isList);
  listBtn.classList.toggle('active', isList);
  gridBtn.setAttribute('aria-pressed', String(!isList));
  listBtn.setAttribute('aria-pressed', String(isList));
}

(async () => {
  try {
    const members = await getMembers();
    render(members);
    setView('grid');
  } catch (e) {
    container.innerHTML = '<p>Could not load the directory right now.</p>';
  }
})();

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));
