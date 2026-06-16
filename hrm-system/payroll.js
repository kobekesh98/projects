/**
 * HRM System — Payroll Page
 * Payroll summary, salary table, and payslip generation.
 */

function initPayroll() {
  renderPayrollSummary();
  renderPayrollTable();
}

/** Render payroll summary totals */
function renderPayrollSummary() {
  const container = document.getElementById('payroll-summary');
  if (!container) return;

  const totalGross = HRMData.payroll.reduce((s, p) => s + p.baseSalary + p.bonus, 0);
  const totalDeductions = HRMData.payroll.reduce((s, p) => s + p.deductions, 0);
  const totalNet = HRMData.payroll.reduce((s, p) => s + p.netPay, 0);

  container.innerHTML = `
    <div class="payroll-summary">
      <div class="payroll-summary__item">
        <div class="payroll-summary__label">Total Gross Pay</div>
        <div class="payroll-summary__amount">${HRMUtils.formatCurrency(totalGross)}</div>
      </div>
      <div class="payroll-summary__item">
        <div class="payroll-summary__label">Total Deductions</div>
        <div class="payroll-summary__amount" style="color:var(--color-danger)">${HRMUtils.formatCurrency(totalDeductions)}</div>
      </div>
      <div class="payroll-summary__item">
        <div class="payroll-summary__label">Total Net Pay</div>
        <div class="payroll-summary__amount" style="color:var(--color-success)">${HRMUtils.formatCurrency(totalNet)}</div>
      </div>
    </div>`;
}

/** Render payroll records table */
function renderPayrollTable() {
  HRMTable.render(document.getElementById('payroll-table'), {
    columns: [
      { label: 'Employee', render: (r) => HRMData.getEmployeeName(r.employeeId) },
      { label: 'Period', key: 'period' },
      { label: 'Base Salary', render: (r) => HRMUtils.formatCurrency(r.baseSalary) },
      { label: 'Bonus', render: (r) => HRMUtils.formatCurrency(r.bonus) },
      { label: 'Deductions', render: (r) => HRMUtils.formatCurrency(r.deductions) },
      { label: 'Net Pay', render: (r) => `<strong>${HRMUtils.formatCurrency(r.netPay)}</strong>` },
      { label: 'Status', render: (r) => HRMUtils.statusBadge(r.status) },
    ],
    data: HRMData.payroll,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="viewPayslip('${row.id}')">Payslip</button>
    `,
  });
}

/** Show payslip detail in a modal */
function viewPayslip(id) {
  const pay = HRMData.payroll.find(p => p.id === id);
  if (!pay) return;
  const emp = HRMData.getEmployee(pay.employeeId);

  HRMModal.open({
    title: `Payslip — ${pay.period}`,
    body: `
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-family:var(--font-display);font-size:1.25rem;font-weight:600">Nexora Inc.</div>
        <div style="color:var(--color-text-muted);font-size:0.8125rem">Payslip for ${emp ? emp.firstName + ' ' + emp.lastName : pay.employeeId}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.875rem">
        <div style="padding:12px;background:var(--color-bg-tertiary);border-radius:8px">
          <div style="color:var(--color-text-muted);font-size:0.75rem">Base Salary</div>
          <div style="font-weight:600;margin-top:4px">${HRMUtils.formatCurrency(pay.baseSalary)}</div>
        </div>
        <div style="padding:12px;background:var(--color-bg-tertiary);border-radius:8px">
          <div style="color:var(--color-text-muted);font-size:0.75rem">Bonus</div>
          <div style="font-weight:600;margin-top:4px">${HRMUtils.formatCurrency(pay.bonus)}</div>
        </div>
        <div style="padding:12px;background:var(--color-bg-tertiary);border-radius:8px">
          <div style="color:var(--color-text-muted);font-size:0.75rem">Deductions</div>
          <div style="font-weight:600;margin-top:4px;color:var(--color-danger)">-${HRMUtils.formatCurrency(pay.deductions)}</div>
        </div>
        <div style="padding:12px;background:var(--color-accent-muted);border-radius:8px">
          <div style="color:var(--color-text-muted);font-size:0.75rem">Net Pay</div>
          <div style="font-weight:700;margin-top:4px;color:var(--color-accent);font-size:1.125rem">${HRMUtils.formatCurrency(pay.netPay)}</div>
        </div>
      </div>`,
    footer: `<button class="btn btn--secondary" onclick="HRMModal.close()">Close</button>`,
  });
}
