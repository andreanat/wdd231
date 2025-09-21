const url = 'data/members.json';
const cards = document.querySelector('#cards');

const badgeColor = lvl =>
  lvl >= 3 ? '#ff66aa' : lvl === 2 ? '#66b8ff' : '#8bd17c';

const displayProphets = (members) => {
  cards.className = 'cards grid';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.className = 'card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'logo-wrap';

    const portrait = document.createElement('img');
    portrait.className = 'logo';
    portrait.setAttribute('width', '96');
    portrait.setAttribute('height', '96');
    portrait.setAttribute('loading', 'lazy');

    portrait.src = member.image;
    portrait.alt = `${member.name} logo`;

    portrait.addEventListener('error', () => {
      console.error('Image failed to load:', portrait.src);
      portrait.src = 'images/logo.svg';         // fallback
      portrait.alt = `${member.name} logo not available`;
    });

    imgWrap.appendChild(portrait);

    const h3 = document.createElement('h3');
    h3.textContent = member.name;

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = member.membership ?? '';
    badge.style.background = badgeColor(member.membership ?? 1);

    const addr = document.createElement('p');
    addr.className = 'muted';
    addr.textContent = member.address;

    const phone = document.createElement('p');
    phone.className = 'muted';
    phone.textContent = member.phone;

    const site = document.createElement('a');
    site.className = 'btn';
    site.href = member.website;
    site.target = '_blank';
    site.rel = 'noopener';
    site.textContent = 'Website';

    card.appendChild(imgWrap);
    card.appendChild(h3);
    card.appendChild(badge);
    card.appendChild(addr);
    card.appendChild(phone);
    card.appendChild(site);

    cards.appendChild(card);
  });
};

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.table(data.members.map(m => ({ name: m.name, image: m.image })));
    displayProphets(data.members);
  } catch (err) {
    console.error('Fetch/parse error:', err);
    cards.textContent = 'Unable to load member directory.';
  }
}

getMembers();

document.getElementById('btnGrid')?.addEventListener('click', () => {
  cards.classList.remove('list');
  cards.classList.add('grid');
});
document.getElementById('btnList')?.addEventListener('click', () => {
  cards.classList.remove('grid');
  cards.classList.add('list');
});

const year = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${year} • WDD 231`;
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
