import byuiCourse from './course.mjs';
import { populateSections } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

setTitle(byuiCourse);
populateSections(byuiCourse.sections);
renderSections(byuiCourse.sections);

const y = document.querySelector('#year');
if (y) y.textContent = new Date().getFullYear();

document.querySelector('#enrollStudent')?.addEventListener('click', () => {
  const sectionNum = document.querySelector('#sectionNumber')?.value;
  if (!sectionNum) return;
  byuiCourse.changeEnrollment(sectionNum, true);
  renderSections(byuiCourse.sections);
});

document.querySelector('#dropStudent')?.addEventListener('click', () => {
  const sectionNum = document.querySelector('#sectionNumber')?.value;
  if (!sectionNum) return;
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});
