const listEl = document.getElementById('course-list');
const totalEl = document.getElementById('credit-total');
const buttons = document.querySelectorAll('.filter-btn');

let filter = 'all';

function render() {
  const src = window.COURSES || [];

  const items = src.filter(c =>
    filter === 'all' ? true : (c.subject || '').toUpperCase() === filter
  );

  listEl.innerHTML = items.map(c => `
    <article class="course-card">
      <div class="course-head">
        <span class="badge ${c.completed ? 'done' : ''}">
          ${c.completed ? 'Completed' : 'Planned'}
        </span>
        <span class="badge">${c.credits} cr</span>
      </div>
      <h3 class="course-title">${c.subject} ${c.number}</h3>
      <p class="course-meta">${c.title}</p>
    </article>
  `).join('');

  const credits = items.reduce((sum, c) => sum + (+c.credits || 0), 0);
  totalEl.textContent = credits;
}

buttons.forEach(b => {
  b.addEventListener('click', () => {
    buttons.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filter = b.dataset.filter;
    render();
  });
});

render();