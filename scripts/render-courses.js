const listEl   = document.getElementById('course-list');
const totalEl  = document.getElementById('credit-total');
const buttons  = document.querySelectorAll('.filter-btn');

let filter = 'all';

function render() {
  const source = Array.isArray(window.COURSES) ? window.COURSES : [];
  const items = source.filter(c =>
    filter === 'all' ? true : (c.subject || '').toUpperCase() === filter
  );

  listEl.innerHTML = items.map(c => {
    const subject      = c.subject ?? '';
    const number       = c.number ?? '';
    const title        = c.title ?? '';
    const credits      = c.credits ?? '';
    const description  = c.description ?? '';
    const certificate  = c.certificate ?? (c.certificateName ?? '');
    const stackArr     = Array.isArray(c.technology) ? c.technology
                       : Array.isArray(c.stack) ? c.stack
                       : (typeof c.stack === 'string' ? c.stack.split('|') : []);
    const stackJoined  = stackArr.map(s => String(s).trim()).filter(Boolean).join('|');
    const completed    = !!c.completed;

    return `
      <article
        class="course-card"
        tabindex="0"
        data-subject="${String(subject)}"
        data-number="${String(number)}"
        data-title="${String(title)}"
        data-credits="${String(credits)}"
        data-description="${String(description)}"
        data-certificate="${String(certificate)}"
        data-stack="${String(stackJoined)}"
        aria-label="${subject} ${number}: ${title} (${credits} credits)"
      >
        <div class="course-head">
          <span class="badge ${completed ? 'done' : ''}">
            ${completed ? 'Completed' : 'Planned'}
          </span>
          <span class="badge">${credits} cr</span>
        </div>
        <h3 class="course-title">${subject} ${number}</h3>
        <p class="course-meta">${title}</p>
        <div class="course-actions">
          <button class="btn details-btn" type="button">Details</button>
        </div>
      </article>
    `;
  }).join('');

  const credits = items.reduce((sum, c) => sum + (+c.credits || 0), 0);
  totalEl.textContent = credits;
}

buttons.forEach(b => b.addEventListener('click', () => {
  buttons.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  filter = (b.dataset.filter || 'all').toUpperCase();
  render();
}));

render();
