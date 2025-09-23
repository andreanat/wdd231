const byuiCourse = {
  code: 'WDD 231',
  name: 'Frontend Web Development I',
  sections: [
    { section: 'A1', days: 'MW', time: '09:00', room: 'LAB-101', instructor: 'Martinez', enrollment: 28, capacity: 32 },
    { section: 'A2', days: 'TTh', time: '11:00', room: 'LAB-203', instructor: 'Lopez', enrollment: 30, capacity: 32 },
    { section: 'B1', days: 'MW', time: '14:00', room: 'LAB-105', instructor: 'Nguyen', enrollment: 25, capacity: 28 },
    { section: 'B2', days: 'F', time: '10:00', room: 'LAB-210', instructor: 'Silva', enrollment: 18, capacity: 24 }
  ],

  /**
   * @param {string} sectionId 
   * @param {boolean} add 
   */
  changeEnrollment(sectionId, add = true) {
    const s = this.sections.find(sec => String(sec.section) === String(sectionId));
    if (!s) return;

    if (add) {
      if (s.enrollment < s.capacity) s.enrollment += 1;
    } else {
      if (s.enrollment > 0) s.enrollment -= 1;
    }
  }
};

export default byuiCourse;
