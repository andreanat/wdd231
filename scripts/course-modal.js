const modal = document.getElementById('courseModal');
const titleEl = document.getElementById('modalTitle');
const creditsEl = document.getElementById('modalCredits');
const descEl = document.getElementById('modalDescription');
const certEl = document.getElementById('modalCert');
const stackEl = document.getElementById('modalStack');

const COURSES = Array.isArray(window.COURSES) ? window.COURSES : [];

function openCourseModal(course) {
  if (!course) return;

  titleEl.textContent = `${course.subject} ${course.number} — ${course.title}`;
  creditsEl.textContent = course.credits ?? '—';
  descEl.textContent = course.description || 'No description provided.';
  certEl.textContent = course.certificate || '—';
  stackEl.textContent = Array.isArray(course.tech)
    ? course.tech.join(', ')
    : (course.tech || '—');

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else if (typeof modal.show === 'function') {
    modal.show();
  } else {
    modal.setAttribute('open', 'open');
  }

  modal.focus();
}

function closeCourseModal() {
  if (typeof modal.close === 'function') {
    modal.close();
  } else {
    modal.removeAttribute('open');
  }
}

modal.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-close-modal]');
  if (btn) closeCourseModal();
});

modal.addEventListener('cancel', (ev) => {
  ev.preventDefault?.();
  closeCourseModal();
});

modal.addEventListener('click', (ev) => {
  const rect = modal.getBoundingClientRect();
  const inDialog =
    ev.clientX >= rect.left &&
    ev.clientX <= rect.right &&
    ev.clientY >= rect.top &&
    ev.clientY <= rect.bottom;
  if (!inDialog) closeCourseModal();
});

const listEl = document.getElementById('course-list');

if (listEl) {
  listEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.details-btn');
    if (!btn) return;

    const card = btn.closest('.course-card');
    if (!card) return;

    const idx = Number(card.dataset.index);
    const course = COURSES[idx];

    openCourseModal(course);
  });
}