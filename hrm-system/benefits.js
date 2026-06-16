/**
 * HRM System — Benefits Page
 * Benefits catalog with enrollment stats and plan management.
 */

function initBenefits() {
  renderBenefitsGrid();
  renderBenefitsTable();
  document.getElementById('add-benefit-btn')?.addEventListener('click', () => openBenefitForm());
}

/** Render benefits as visual cards */
function renderBenefitsGrid() {
  const container = document.getElementById('benefits-grid');
  if (!container) return;

  const typeIcons = {
    Medical: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    Dental: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>',
    Financial: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    Wellness: '<path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>',
    Insurance: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    Allowance: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  };

  container.innerHTML = HRMData.benefits.map(b => `
    <div class="benefit-item">
      <div class="benefit-item__icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${typeIcons[b.type] || typeIcons.Medical}</svg>
      </div>
      <div>
        <div class="benefit-item__title">${b.name}</div>
        <div class="benefit-item__desc">${b.coverage} · ${b.provider} · ${b.cost}</div>
        <div style="margin-top:8px;font-size:0.75rem;color:var(--color-text-muted)">${b.enrolled} employees enrolled</div>
      </div>
    </div>
  `).join('');
}

/** Render benefits data table */
function renderBenefitsTable() {
  HRMTable.render(document.getElementById('benefits-table'), {
    columns: [
      { label: 'Benefit', key: 'name' },
      { label: 'Type', key: 'type' },
      { label: 'Coverage', key: 'coverage' },
      { label: 'Provider', key: 'provider' },
      { label: 'Cost', key: 'cost' },
      { label: 'Enrolled', key: 'enrolled' },
    ],
    data: HRMData.benefits,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="editBenefit('${row.id}')">Edit</button>
    `,
  });
}

function openBenefitForm(benefit = null) {
  const isEdit = !!benefit;
  HRMModal.open({
    title: isEdit ? 'Edit Benefit' : 'Add Benefit Plan',
    body: `
      <form id="benefit-form">
        <div class="form-group">
          <label>Benefit Name <span class="required">*</span></label>
          <input class="form-control" name="name" required value="${benefit?.name || ''}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Type</label>
            <select class="form-control" name="type">
              <option>Medical</option><option>Dental</option><option>Financial</option>
              <option>Wellness</option><option>Insurance</option><option>Allowance</option>
            </select>
          </div>
          <div class="form-group">
            <label>Provider</label>
            <input class="form-control" name="provider" value="${benefit?.provider || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>Coverage Details</label>
          <input class="form-control" name="coverage" value="${benefit?.coverage || ''}">
        </div>
        <div class="form-group">
          <label>Cost Structure</label>
          <input class="form-control" name="cost" value="${benefit?.cost || ''}" placeholder="Company paid">
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-benefit">${isEdit ? 'Update' : 'Add'}</button>`,
  });

  document.getElementById('save-benefit').addEventListener('click', () => {
    const form = document.getElementById('benefit-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());

    if (isEdit) { Object.assign(benefit, data); }
    else { data.id = HRMUtils.generateId('BEN'); data.enrolled = 0; HRMData.benefits.push(data); }

    HRMToast.show(`Benefit ${isEdit ? 'updated' : 'added'}`, 'success');
    HRMModal.close();
    renderBenefitsGrid();
    renderBenefitsTable();
  });
}

function editBenefit(id) {
  const benefit = HRMData.benefits.find(b => b.id === id);
  if (benefit) openBenefitForm(benefit);
}
