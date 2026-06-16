/**
 * HRM System — Attendance Page
 * Daily attendance log and monthly calendar heatmap.
 */

function initAttendance() {
  renderAttendanceTable();
  renderAttendanceCalendar();
}

/** Render today's attendance records */
function renderAttendanceTable() {
  HRMTable.render(document.getElementById('attendance-table'), {
    columns: [
      { label: 'Employee', render: (row) => {
        const emp = HRMData.getEmployee(row.employeeId);
        return emp ? HRMUtils.employeeCell(emp) : row.employeeId;
      }},
      { label: 'Date', render: (r) => HRMUtils.formatDate(r.date) },
      { label: 'Check In', key: 'checkIn' },
      { label: 'Check Out', key: 'checkOut' },
      { label: 'Hours', render: (r) => r.hours ? `${r.hours}h` : '—' },
      { label: 'Status', render: (r) => HRMUtils.statusBadge(r.status) },
    ],
    data: HRMData.attendance,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="markAttendance('${row.id}')">Edit</button>
    `,
  });
}

/** Render a monthly calendar with attendance status colors */
function renderAttendanceCalendar() {
  const container = document.getElementById('attendance-calendar');
  if (!container) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const statuses = ['weekend', 'present', 'present', 'present', 'absent', 'present', 'leave',
    'weekend', 'present', 'present', 'present', 'present', 'present', 'weekend',
    'present', 'present', 'late', 'present', 'present', 'weekend',
    'present', 'present', 'present', 'present', 'present', 'weekend',
    'present', 'present', 'present', 'future', 'future', 'future'];

  let html = '<div class="attendance-grid">';
  days.forEach(d => { html += `<div class="attendance-day attendance-day--header">${d}</div>`; });

  // Padding for June 2026 starting on Monday
  html += '<div class="attendance-day"></div>';

  statuses.forEach((status, i) => {
    const cls = status === 'late' ? 'present' : status;
    html += `<div class="attendance-day attendance-day--${cls}">${i + 1}</div>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

/** Open modal to edit attendance record */
function markAttendance(id) {
  const record = HRMData.attendance.find(a => a.id === id);
  if (!record) return;

  HRMModal.open({
    title: 'Edit Attendance',
    body: `
      <form id="attendance-form">
        <div class="form-row">
          <div class="form-group">
            <label>Check In</label>
            <input class="form-control" name="checkIn" value="${record.checkIn}">
          </div>
          <div class="form-group">
            <label>Check Out</label>
            <input class="form-control" name="checkOut" value="${record.checkOut}">
          </div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="form-control" name="status">
            ${['Present', 'Late', 'Absent', 'On Leave'].map(s =>
              `<option ${record.status === s ? 'selected' : ''}>${s}</option>`
            ).join('')}
          </select>
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-attendance">Save</button>`,
  });

  document.getElementById('save-attendance').addEventListener('click', () => {
    const data = Object.fromEntries(new FormData(document.getElementById('attendance-form')).entries());
    Object.assign(record, data);
    HRMToast.show('Attendance updated', 'success');
    HRMModal.close();
    renderAttendanceTable();
  });
}
