/**
 * HRM System — Training & Development Page
 * Course catalog cards with enrollment management.
 */

function initTraining() {
  renderCourseCards();
  document.getElementById('add-course-btn')?.addEventListener('click', () => openCourseForm());
}

/** Render training course cards */
function renderCourseCards() {
  const container = document.getElementById('course-grid');
  if (!container) return;

  const icons = { Management: '??', Compliance: '??', Technical: '??', 'Soft Skills': '??' };

  container.innerHTML = HRMData.training.map(course => {
    const pct = (course.enrolled / course.capacity) * 100;
    return `
      <div class="course-card">
        <div class="course-card__banner">${icons[course.category] || '??'}</div>
        <div class="course-card__body">
          <div class="course-card__title">${course.title}</div>
          <div class="course-card__meta">${course.category} · ${course.duration} · ${course.instructor}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:0.8125rem;color:var(--color-text-muted)">${course.enrolled}/${course.capacity} enrolled</span>
            ${HRMUtils.statusBadge(course.status)}
          </div>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
          <div style="margin-top:12px;display:flex;gap:8px">
            <button class="btn btn--primary btn--sm" onclick="enrollCourse('${course.id}')" ${course.status === 'Full' ? 'disabled' : ''}>Enroll</button>
            <button class="btn btn--ghost btn--sm" onclick="editCourse('${course.id}')">Edit</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openCourseForm(course = null) {
  const isEdit = !!course;
  HRMModal.open({
    title: isEdit ? 'Edit Course' : 'Add Training Course',
    body: `
      <form id="course-form">
        <div class="form-group">
          <label>Course Title <span class="required">*</span></label>
          <input class="form-control" name="title" required value="${course?.title || ''}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" name="category">
              <option>Management</option><option>Compliance</option><option>Technical</option><option>Soft Skills</option>
            </select>
          </div>
          <div class="form-group">
            <label>Duration</label>
            <input class="form-control" name="duration" value="${course?.duration || ''}" placeholder="8 hours">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Instructor</label>
            <input class="form-control" name="instructor" value="${course?.instructor || ''}">
          </div>
          <div class="form-group">
            <label>Capacity</label>
            <input class="form-control" type="number" name="capacity" value="${course?.capacity || 20}">
          </div>
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-course">${isEdit ? 'Update' : 'Create'}</button>`,
  });

  document.getElementById('save-course').addEventListener('click', () => {
    const form = document.getElementById('course-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.capacity = parseInt(data.capacity);

    if (isEdit) { Object.assign(course, data); }
    else {
      data.id = HRMUtils.generateId('TRN');
      data.enrolled = 0;
      data.status = 'Upcoming';
      HRMData.training.push(data);
    }

    HRMToast.show(`Course ${isEdit ? 'updated' : 'created'}`, 'success');
    HRMModal.close();
    renderCourseCards();
  });
}

function enrollCourse(id) {
  const course = HRMData.training.find(t => t.id === id);
  if (course && course.enrolled < course.capacity) {
    course.enrolled++;
    if (course.enrolled >= course.capacity) course.status = 'Full';
    HRMToast.show('Enrolled successfully', 'success');
    renderCourseCards();
  }
}

function editCourse(id) {
  const course = HRMData.training.find(t => t.id === id);
  if (course) openCourseForm(course);
}
