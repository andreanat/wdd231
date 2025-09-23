// Set the big page title
export function setTitle(course) {
  const h1 = document.querySelector('#courseTitle');
  if (h1) h1.textContent = `${course.code} — ${course.name}`;
}

// Render all section cards
export function renderSections(sections) {
  const host = document.querySelector('#outputSections');
  if (!host) return;

  host.innerHTML = '';

  sections.forEach(s => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>Section ${s.section}</h3>
      <div class="meta">
        <span>Days</span><div>${s.days}</div>
        <span>Time</span><div>${s.time}</div>
        <span>Room</span><div>${s.room}</div>
        <span>Instructor</span><div>${s.instructor}</div>
        <span>Enrolled</span><div>${s.enrollment} / ${s.capacity}</div>
      </div>
      <div class="badge">${fillPercent(s)}% full</div>
    `;
    host.appendChild(card);
  });
}

function fillPercent(section) {
  if (!section || !section.capacity) return 0;
  return Math.round((section.enrollment / section.capacity) * 100);
}
