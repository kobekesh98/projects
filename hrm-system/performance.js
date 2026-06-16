/**
 * HRM System — Performance Reviews Page
 * Review table with ratings, goal progress, and review form.
 */

function initPerformance() {
  renderPerformanceTable();
  document.getElementById('add-review-btn')?.addEventListener('click', () => openReviewForm());
}

function renderPerformanceTable() {
  HRMTable.render(document.getElementById('performance-table'), {
    columns: [
      { label: 'Employee', render: (r) => HRMData.getEmployeeName(r.employeeId) },
      { label: 'Period', key: 'period' },
      { label: 'Reviewer', key: 'reviewer' },
      { label: 'Rating', render: (r) => r.rating ? `${r.rating} / 5.0` : '—' },
      { label: 'Goals', render: (r) => `${r.goalsCompleted} / ${r.goals}` },
      { label: 'Progress', render: (r) => {
        const pct = (r.goalsCompleted / r.goals) * 100;
        return `<div class="progress-bar" style="width:100px"><div class="progress-bar__fill" style="width:${pct}%"></div></div>`;
      }},
      { label: 'Status', render: (r) => HRMUtils.statusBadge(r.status) },
    ],
    data: HRMData.performance,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="viewReview('${row.id}')">View</button>
    `,
  });
}

function openReviewForm() {
  HRMModal.open({
    title: 'New Performance Review',
    body: `
      <form id="review-form">
        <div class="form-group">
          <label>Employee</label>
          <select class="form-control" name="employeeId" required>
            ${HRMData.employees.filter(e => e.status === 'Active').map(e =>
              `<option value="${e.id}">${e.firstName} ${e.lastName}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Review Period</label>
            <input class="form-control" name="period" placeholder="Q2 2026" required>
          </div>
          <div class="form-group">
            <label>Reviewer</label>
            <input class="form-control" name="reviewer" required>
          </div>
        </div>
        <div class="form-group">
          <label>Number of Goals</label>
          <input class="form-control" type="number" name="goals" value="5" min="1">
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-review">Create Review</button>`,
  });

  document.getElementById('save-review').addEventListener('click', () => {
    const form = document.getElementById('review-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.id = HRMUtils.generateId('PERF');
    data.rating = 0;
    data.goalsCompleted = 0;
    data.goals = parseInt(data.goals);
    data.status = 'In Progress';
    HRMData.performance.push(data);
    HRMToast.show('Review cycle created', 'success');
    HRMModal.close();
    renderPerformanceTable();
  });
}

function viewReview(id) {
  const review = HRMData.performance.find(p => p.id === id);
  if (!review) return;
  HRMModal.open({
    title: 'Performance Review',
    body: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">EMPLOYEE</strong><p>${HRMData.getEmployeeName(review.employeeId)}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">PERIOD</strong><p>${review.period}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">RATING</strong><p>${review.rating ? review.rating + ' / 5.0' : 'Pending'}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">GOALS</strong><p>${review.goalsCompleted} of ${review.goals} completed</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">REVIEWER</strong><p>${review.reviewer}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">STATUS</strong><p>${HRMUtils.statusBadge(review.status)}</p></div>
      </div>`,
    footer: `<button class="btn btn--secondary" onclick="HRMModal.close()">Close</button>`,
  });
}
