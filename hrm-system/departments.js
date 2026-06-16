/**
 * HRM System — Departments Page
 * Department cards with headcount, budget, and CRUD operations.
 */

function initDepartments() {
  renderDepartmentCards();
  document.getElementById('add-dept-btn')?.addEventListener('click', () => openDeptForm());
}

/** Render department cards in a responsive grid */
function renderDepartmentCards() {
  const container = document.getElementById('dept-grid');
  if (!container) return;

  container.innerHTML = HRMData.departments.map(dept => `
    <div class="card">
      <div class="card__header">
        <span class="card__title">${dept.name}</span>
        ${HRMUtils.statusBadge('Active')}
      </div>
      <div class="card__body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.875rem">
          <div>
            <div style="color:var(--color-text-muted);font-size:0.75rem">Department Head</div>
            <div style="font-weight:500;margin-top:2px">${dept.head}</div>
          </div>
          <div>
            <div style="color:var(--color-text-muted);font-size:0.75rem">Employees</div>
            <div style="font-weight:500;margin-top:2px">${dept.employees}</div>
          </div>
          <div>
            <div style="color:var(--color-text-muted);font-size:0.75rem">Annual Budget</div>
            <div style="font-weight:500;margin-top:2px">${HRMUtils.formatCurrency(dept.budget)}</div>
          </div>
          <div>
            <div style="color:var(--color-text-muted);font-size:0.75rem">Location</div>
            <div style="font-weight:500;margin-top:2px">${dept.location}</div>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <button class="btn btn--ghost btn--sm" onclick="editDept('${dept.id}')">Edit</button>
        <button class="btn btn--ghost btn--sm" onclick="deleteDept('${dept.id}')">Delete</button>
      </div>
    </div>
  `).join('');
}

/** Open add/edit department modal */
function openDeptForm(dept = null) {
  const isEdit = !!dept;
  HRMModal.open({
    title: isEdit ? 'Edit Department' : 'Add Department',
    body: `
      <form id="dept-form">
        <div class="form-group">
          <label>Department Name <span class="required">*</span></label>
          <input class="form-control" name="name" required value="${dept?.name || ''}">
        </div>
        <div class="form-group">
          <label>Department Head</label>
          <input class="form-control" name="head" value="${dept?.head || ''}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Employee Count</label>
            <input class="form-control" type="number" name="employees" value="${dept?.employees || 0}">
          </div>
          <div class="form-group">
            <label>Annual Budget ($)</label>
            <input class="form-control" type="number" name="budget" value="${dept?.budget || 0}">
          </div>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input class="form-control" name="location" value="${dept?.location || ''}">
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-dept">${isEdit ? 'Update' : 'Create'}</button>`,
  });

  document.getElementById('save-dept').addEventListener('click', () => {
    const form = document.getElementById('dept-form');
    if (!HRMUtils.validateForm(form)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.employees = parseInt(data.employees);
    data.budget = parseInt(data.budget);

    if (isEdit) { Object.assign(dept, data); }
    else { data.id = HRMUtils.generateId('DEPT'); HRMData.departments.push(data); }

    HRMToast.show(`Department ${isEdit ? 'updated' : 'created'}`, 'success');
    HRMModal.close();
    renderDepartmentCards();
  });
}

function editDept(id) {
  const dept = HRMData.departments.find(d => d.id === id);
  if (dept) openDeptForm(dept);
}

function deleteDept(id) {
  HRMModal.confirm({
    title: 'Delete Department',
    message: 'Remove this department? Employees will need reassignment.',
    danger: true,
    onConfirm: () => {
      HRMData.departments = HRMData.departments.filter(d => d.id !== id);
      HRMToast.show('Department removed', 'success');
      renderDepartmentCards();
    },
  });
}
