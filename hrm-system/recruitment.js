/**
 * HRM System — Recruitment Page
 * Job postings table and candidate pipeline kanban board.
 */

function initRecruitment() {
  renderJobTable();
  renderPipeline();
  bindRecruitmentEvents();
}

/** Render job postings data table */
function renderJobTable() {
  HRMTable.render(document.getElementById('jobs-table'), {
    columns: [
      { label: 'Position', key: 'title' },
      { label: 'Department', key: 'department' },
      { label: 'Type', key: 'type' },
      { label: 'Salary Range', key: 'salary' },
      { label: 'Applicants', key: 'applicants' },
      { label: 'Posted', render: (r) => HRMUtils.formatDate(r.posted) },
      { label: 'Status', render: (r) => HRMUtils.statusBadge(r.status) },
    ],
    data: HRMData.jobPostings,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="editJob('${row.id}')">Edit</button>
      <button class="btn btn--ghost btn--sm" onclick="toggleJobStatus('${row.id}')">${row.status === 'Open' ? 'Close' : 'Reopen'}</button>
    `,
  });
}

/** Render candidate pipeline columns */
function renderPipeline() {
  const stages = ['Applied', 'Screening', 'Interview', 'Offer'];
  const container = document.getElementById('pipeline-board');
  if (!container) return;

  container.innerHTML = `<div class="pipeline">${stages.map(stage => {
    const candidates = HRMData.candidates.filter(c => c.stage === stage);
    return `
      <div class="pipeline__column">
        <div class="pipeline__header">${stage} <span class="badge badge--neutral">${candidates.length}</span></div>
        ${candidates.map(c => `
          <div class="pipeline__card" onclick="viewCandidate('${c.id}')">
            <div class="pipeline__card-name">${c.name}</div>
            <div class="pipeline__card-role">${c.role}</div>
          </div>
        `).join('')}
      </div>`;
  }).join('')}</div>`;
}

function bindRecruitmentEvents() {
  document.getElementById('add-job-btn')?.addEventListener('click', () => openJobForm());
}

function openJobForm(job = null) {
  const isEdit = !!job;
  HRMModal.open({
    title: isEdit ? 'Edit Job Posting' : 'Create Job Posting',
    body: `
      <form id="job-form">
        <div class="form-group">
          <label>Job Title <span class="required">*</span></label>
          <input class="form-control" name="title" required value="${job?.title || ''}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Department</label>
            <select class="form-control" name="department">
              ${HRMData.departments.map(d => `<option ${job?.department === d.name ? 'selected' : ''}>${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Employment Type</label>
            <select class="form-control" name="type">
              <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Salary Range</label>
          <input class="form-control" name="salary" value="${job?.salary || ''}">
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-job">${isEdit ? 'Update' : 'Post Job'}</button>`,
  });

  document.getElementById('save-job').addEventListener('click', () => {
    const form = document.getElementById('job-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());

    if (isEdit) { Object.assign(job, data); }
    else {
      data.id = HRMUtils.generateId('JOB');
      data.status = 'Open';
      data.applicants = 0;
      data.posted = new Date().toISOString().split('T')[0];
      HRMData.jobPostings.push(data);
    }

    HRMToast.show(`Job ${isEdit ? 'updated' : 'posted'}`, 'success');
    HRMModal.close();
    renderJobTable();
  });
}

function editJob(id) {
  const job = HRMData.jobPostings.find(j => j.id === id);
  if (job) openJobForm(job);
}

function toggleJobStatus(id) {
  const job = HRMData.jobPostings.find(j => j.id === id);
  if (job) {
    job.status = job.status === 'Open' ? 'Closed' : 'Open';
    HRMToast.show(`Job ${job.status.toLowerCase()}`, 'info');
    renderJobTable();
  }
}

function viewCandidate(id) {
  const c = HRMData.candidates.find(x => x.id === id);
  if (!c) return;
  HRMModal.open({
    title: 'Candidate Profile',
    body: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">NAME</strong><p>${c.name}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">EMAIL</strong><p>${c.email}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">APPLIED FOR</strong><p>${c.role}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">STAGE</strong><p>${HRMUtils.statusBadge(c.stage)}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">APPLIED DATE</strong><p>${HRMUtils.formatDate(c.applied)}</p></div>
      </div>`,
    footer: `<button class="btn btn--secondary" onclick="HRMModal.close()">Close</button>`,
  });
}
