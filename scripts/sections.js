export function populateSections(sections) {
  const sel = document.querySelector('#sectionNumber');
  if (!sel) return;

  sel.innerHTML = '';
  sections.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.section;
    opt.textContent = `${s.section} — ${s.days} ${s.time}`;
    sel.appendChild(opt);
  });
}
