/**
 * HRM System — Dashboard Page
 * Renders KPI stat cards, headcount chart, and activity feed.
 */

function initDashboard() {
  renderStats();
  renderChart();
  renderActivity();
  renderQuickActions();
}

/** Populate the four KPI stat cards */
function renderStats() {
  const stats = [
    { label: 'Total Employees', value: HRMData.employees.filter(e => e.status === 'Active').length, change: '+3 this month', trend: 'up', icon: 'employees', iconClass: 'accent' },
    { label: 'Open Positions', value: HRMData.jobPostings.filter(j => j.status === 'Open').length, change: '2 new this week', trend: 'up', icon: 'info', iconClass: 'info' },
    { label: 'Pending Leave', value: HRMData.leaveRequests.filter(l => l.status === 'Pending').length, change: 'Needs review', trend: 'down', icon: 'warning', iconClass: 'warning' },
    { label: 'Attendance Rate', value: '94.2%', change: '+1.2% vs last month', trend: 'up', icon: 'success', iconClass: 'success' },
  ];

  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-card__icon stat-card__icon--${s.iconClass}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
      </div>
      <div class="stat-card__label">${s.label}</div>
      <div class="stat-card__value">${s.value}</div>
      <div class="stat-card__change stat-card__change--${s.trend}">${s.change}</div>
    </div>
  `).join('');
}

/** Render a simple bar chart for monthly headcount */
function renderChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [72, 74, 75, 76, 78, 80];
  const max = Math.max(...values);

  const container = document.getElementById('headcount-chart');
  if (!container) return;

  container.innerHTML = values.map((v, i) => `
    <div class="chart-bar" style="height:${(v / max) * 100}%" title="${v} employees">
      <span class="chart-bar__label">${months[i]}</span>
    </div>
  `).join('');
}

/** Render recent activity feed */
function renderActivity() {
  const container = document.getElementById('activity-feed');
  if (!container) return;

  container.innerHTML = `<ul class="activity-list">${HRMData.activities.map(a => `
    <li class="activity-item">
      <div class="activity-item__dot"></div>
      <div>
        <div class="activity-item__text">${a.text}</div>
        <div class="activity-item__time">${a.time}</div>
      </div>
    </li>
  `).join('')}</ul>`;
}

/** Render quick-action buttons linking to other modules */
function renderQuickActions() {
  const actions = [
    { label: 'Add Employee', href: 'employees.html', primary: true },
    { label: 'Post Job', href: 'recruitment.html', primary: false },
    { label: 'Process Payroll', href: 'payroll.html', primary: false },
    { label: 'Review Leave', href: 'leave.html', primary: false },
  ];

  const container = document.getElementById('quick-actions');
  if (!container) return;

  container.innerHTML = actions.map(a => `
    <a href="${a.href}" class="btn ${a.primary ? 'btn--primary' : 'btn--secondary'}">${a.label}</a>
  `).join('');
}
