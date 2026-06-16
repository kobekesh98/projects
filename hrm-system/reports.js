/**
 * HRM System — Reports & Analytics Page
 * HR metrics, department breakdown, and export actions.
 */

function initReports() {
  renderReportMetrics();
  renderDepartmentChart();
  renderHeadcountTrend();
}

/** Render top-level report metrics */
function renderReportMetrics() {
  const container = document.getElementById('report-metrics');
  if (!container) return;

  const metrics = [
    { label: 'Total Headcount', value: HRMData.employees.length },
    { label: 'Avg. Tenure', value: '2.4 yrs' },
    { label: 'Turnover Rate', value: '4.2%' },
    { label: 'Open Positions', value: HRMData.jobPostings.filter(j => j.status === 'Open').length },
    { label: 'Training Completion', value: '87%' },
    { label: 'Benefits Enrollment', value: '92%' },
  ];

  container.innerHTML = `<div class="grid-3">${metrics.map(m => `
    <div class="card">
      <div class="report-metric">
        <div class="report-metric__value">${m.value}</div>
        <div class="report-metric__label">${m.label}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

/** Render department headcount bar chart */
function renderDepartmentChart() {
  const container = document.getElementById('dept-chart');
  if (!container) return;

  const max = Math.max(...HRMData.departments.map(d => d.employees));

  container.innerHTML = `
    <div class="chart-placeholder" style="height:260px;align-items:flex-end">
      ${HRMData.departments.map(d => `
        <div class="chart-bar" style="height:${(d.employees / max) * 100}%" title="${d.name}: ${d.employees}">
          <span class="chart-bar__label">${d.name}</span>
        </div>
      `).join('')}
    </div>`;
}

/** Render headcount trend line representation */
function renderHeadcountTrend() {
  const container = document.getElementById('headcount-trend');
  if (!container) return;

  const quarters = ['Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'];
  const counts = [68, 72, 76, 80];

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${quarters.map((q, i) => `
        <div style="display:flex;align-items:center;gap:12px">
          <span style="width:80px;font-size:0.8125rem;color:var(--color-text-muted)">${q}</span>
          <div class="progress-bar" style="flex:1;height:10px">
            <div class="progress-bar__fill" style="width:${(counts[i] / 80) * 100}%"></div>
          </div>
          <span style="width:30px;font-size:0.875rem;font-weight:600;text-align:right">${counts[i]}</span>
        </div>
      `).join('')}
    </div>`;
}
