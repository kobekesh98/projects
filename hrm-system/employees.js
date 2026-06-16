/**
 * HRM System — Employees Page
 * Employee directory with search, CRUD modals, and pagination.
 */

let empCurrentPage = 1;
let empSearchTerm = '';

function initEmployees() {
  renderEmployeeTable();
  bindEmployeeEvents();
}

/** Render the employee data table */
function renderEmployeeTable() {
  const filtered = HRMUtils.filterBySearch(
    HRMData.employees,
    empSearchTerm,
    ['firstName', 'lastName', 'email', 'department', 'position', 'status']
  );

  const { data, total, pages, currentPage } = HRMUtils.paginate(filtered, empCurrentPage, 8);

  HRMTable.render(document.getElementById('employee-table'), {
    columns: [
      { label: 'Employee', render: (row) => HRMUtils.employeeCell(row) },
      { label: 'ID', key: 'id' },
      { label: 'Department', key: 'department' },
      { label: 'Position', key: 'position' },
      { label: 'Join Date', render: (row) => HRMUtils.formatDate(row.joinDate) },
      { label: 'Status', render: (row) => HRMUtils.statusBadge(row.status) },
    ],
    data,
    actions: (row) => `
      <button class="btn btn--ghost btn--sm" onclick="viewEmployee('${row.id}')">View</button>
      <button class="btn btn--ghost btn--sm" onclick="editEmployee('${row.id}')">Edit</button>
      <button class="btn btn--ghost btn--sm" onclick="deleteEmployee('${row.id}')">Delete</button>
    `,
  });

  HRMTable.renderPagination(document.getElementById('employee-pagination'), {
    currentPage, pages, total,
    onPageChange: (p) => { empCurrentPage = p; renderEmployeeTable(); },
  });
}

/** Bind search input and add button events */
function bindEmployeeEvents() {
  const search = document.getElementById('employee-search');
  if (search) {
    search.addEventListener('input', HRMUtils.debounce((e) => {
      empSearchTerm = e.target.value;
      empCurrentPage = 1;
      renderEmployeeTable();
    }));
  }

  document.getElementById('add-employee-btn')?.addEventListener('click', () => openEmployeeForm());
}

/** Open modal to add a new employee */
function openEmployeeForm(employee = null) {
  const isEdit = !!employee;
  HRMModal.open({
    title: isEdit ? 'Edit Employee' : 'Add New Employee',
    size: 'lg',
    body: `
      <form id="employee-form">
        <div class="form-row">
          <div class="form-group">
            <label>First Name <span class="required">*</span></label>
            <input class="form-control" name="firstName" required value="${employee?.firstName || ''}">
          </div>
          <div class="form-group">
            <label>Last Name <span class="required">*</span></label>
            <input class="form-control" name="lastName" required value="${employee?.lastName || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>Email <span class="required">*</span></label>
          <input class="form-control" type="email" name="email" required value="${employee?.email || ''}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Department <span class="required">*</span></label>
            <select class="form-control" name="department" required>
              ${HRMData.departments.map(d => `<option value="${d.name}" ${employee?.department === d.name ? 'selected' : ''}>${d.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Position <span class="required">*</span></label>
            <input class="form-control" name="position" required value="${employee?.position || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Join Date</label>
            <input class="form-control" type="date" name="joinDate" value="${employee?.joinDate || ''}">
          </div>
          <div class="form-group">
            <label>Salary ($)</label>
            <input class="form-control" type="number" name="salary" value="${employee?.salary || ''}">
          </div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="form-control" name="status">
            <option value="Active" ${employee?.status === 'Active' ? 'selected' : ''}>Active</option>
            <option value="On Leave" ${employee?.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
            <option value="Inactive" ${employee?.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </form>`,
    footer: `
      <button class="btn btn--secondary" onclick="HRMModal.close()">Cancel</button>
      <button class="btn btn--primary" id="save-employee">${isEdit ? 'Update' : 'Add Employee'}</button>`,
  });

  document.getElementById('save-employee').addEventListener('click', () => {
    const form = document.getElementById('employee-form');
    if (!HRMUtils.validateForm(form)) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.salary = parseInt(data.salary) || 0;

    if (isEdit) {
      Object.assign(employee, data);
      HRMToast.show('Employee updated successfully', 'success');
    } else {
      data.id = HRMUtils.generateId('EMP');
      data.phone = '';
      HRMData.employees.push(data);
      HRMToast.show('Employee added successfully', 'success');
    }

    HRMModal.close();
    renderEmployeeTable();
  });
}

/** View employee details in a read-only modal */
function viewEmployee(id) {
  const emp = HRMData.getEmployee(id);
  if (!emp) return;

  HRMModal.open({
    title: 'Employee Details',
    body: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">FULL NAME</strong><p>${emp.firstName} ${emp.lastName}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">EMPLOYEE ID</strong><p>${emp.id}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">EMAIL</strong><p>${emp.email}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">PHONE</strong><p>${emp.phone || 'N/A'}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">DEPARTMENT</strong><p>${emp.department}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">POSITION</strong><p>${emp.position}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">JOIN DATE</strong><p>${HRMUtils.formatDate(emp.joinDate)}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">SALARY</strong><p>${HRMUtils.formatCurrency(emp.salary)}</p></div>
        <div><strong style="color:var(--color-text-muted);font-size:0.75rem">STATUS</strong><p>${HRMUtils.statusBadge(emp.status)}</p></div>
      </div>`,
    footer: `<button class="btn btn--secondary" onclick="HRMModal.close()">Close</button>`,
  });
}

function editEmployee(id) {
  const emp = HRMData.getEmployee(id);
  if (emp) openEmployeeForm(emp);
}

function deleteEmployee(id) {
  HRMModal.confirm({
    title: 'Delete Employee',
    message: 'Are you sure you want to remove this employee? This action cannot be undone.',
    confirmLabel: 'Delete',
    danger: true,
    onConfirm: () => {
      HRMData.employees = HRMData.employees.filter(e => e.id !== id);
      HRMToast.show('Employee removed', 'success');
      renderEmployeeTable();
    },
  });
}
