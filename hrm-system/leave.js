/**
 * HRM System — Leave Management Page
 * Leave request table with approve/reject actions and request form.
 */

function initLeave() {
  renderLeaveTable();
  renderLeaveBalances();
  document.getElementById('request-leave-btn')?.addEventListener('click', () => openLeaveForm());
}

/** Render leave requests table */
function renderLeaveTable() {
  HRMTable.render(document.getElementById('leave-table'), {
    columns: [
      { label: 'Employee', render: (r) => {
        const emp = HRMData.getEmployee(r.employeeId);
        return emp ? `${emp.firstName} ${emp.lastName}` : r.employeeId;
      }},
      { label: 'Type', key: 'type' },
      { label: 'Start', render: (r) => HRMUtils.formatDate(r.startDate) },
      { label: 'End', render: (r) => HRMUtils.formatDate(r.endDate) },
      { label: 'Days', key: 'days' },
      { label: 'Reason', key: 'reason' },
      { label: 'Status', render: (r) => HRMUtils.statusBadge(r.status) },
    ],
    data: HRMData.leaveRequests,
    actions: (row) => row.status === 'Pending' ? `
      <button class="btn btn--primary btn--sm" onclick="approveLeave('${row.id}')">Approve</button>
      <button class="btn btn--danger btn--sm" onclick="rejectLeave('${row.id}')">Reject</button>
    ` : `<button class="btn btn--ghost btn--sm" onclick="viewLeave('${row.id}')">View</button>`,
  });
}

/** Render leave balance summary cards */
function renderLeaveBalances() {
  const container = document.getElementById('leave-balances');
  if (!container) return;

  const balances = [
    { type: 'Annual Leave', used: 8, total: 20 },
    { type: 'Sick Leave', used: 3, total: 10 },
    { type: 'Personal Leave', used: 1, total: 5 },
  ];

  container.innerHTML = balances.map(b => {
    const pct = ((b.total - b.used) / b.total) * 100;
    return `
      <div class="stat-card">
        <div class="stat-card__label">${b.type}</div>
        <div class="stat-card__value">${b.total - b.used} <span style="font-size:0.875rem;color:var(--color-text-muted)">/ ${b.total} days</span></div>
        <div class="progress-bar" style="margin-top:8px"><div class="progress-bar__fill" style="width:${pct}%"></div></div>
      </div>`;
  }).join('');
}

function openLeaveForm() {
  HRMModal.open({
    title: 'Request Leave',
    body: `
      <form id="leave-form">
        <div class="form-group">
          <label>Employee</label>
          <select class="form-control" name="employeeId" required>
            ${HRMData.employees.filter(e => e.status === 'Active').map(e =>
              `<option value="${e.id}">${e.firstName} ${e.lastName}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Leave Type</label>
          <select class="form-control" name="type">
            <option>Annual Leave</option><option>Sick Leave</option><option>Personal Leave</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Start Date <span class="required">*</span></label>
            <input class="form-control" type="date" name="startDate" required>
          </div>
          <div class="form-group">
            <label>End Date <span class="required">*</span></label>
            <input class="form-control" type="date" name="endDate" required>
          </div>
        </div>
        <div class="form-group">
          <label>Reason</label>
          <textarea class="form-control" name="reason" rows="3"></textarea>
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="submit-leave">Submit Request</button>`,
  });

  document.getElementById('submit-leave').addEventListener('click', () => {
    const form = document.getElementById('leave-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    data.days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    data.id = HRMUtils.generateId('LV');
    data.status = 'Pending';
    HRMData.leaveRequests.push(data);
    HRMToast.show('Leave request submitted', 'success');
    HRMModal.close();
    renderLeaveTable();
  });
}

function approveLeave(id) {
  const req = HRMData.leaveRequests.find(l => l.id === id);
  if (req) { req.status = 'Approved'; HRMToast.show('Leave approved', 'success'); renderLeaveTable(); }
}

function rejectLeave(id) {
  const req = HRMData.leaveRequests.find(l => l.id === id);
  if (req) { req.status = 'Rejected'; HRMToast.show('Leave rejected', 'error'); renderLeaveTable(); }
}

function viewLeave(id) {
  const req = HRMData.leaveRequests.find(l => l.id === id);
  if (!req) return;
  HRMModal.open({
    title: 'Leave Request Details',
    body: `<p style="color:var(--color-text-secondary)">${req.type}: ${HRMUtils.formatDate(req.startDate)} – ${HRMUtils.formatDate(req.endDate)} (${req.days} days)<br><br>Reason: ${req.reason}<br><br>Status: ${HRMUtils.statusBadge(req.status)}</p>`,
    footer: `<button class="btn btn--secondary" onclick="HRMModal.close()">Close</button>`,
  });
}
