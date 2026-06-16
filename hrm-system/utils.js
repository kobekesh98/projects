/**
 * HRM System ù Utility Functions
 * Shared helpers for formatting, DOM manipulation, and validation.
 */

const HRMUtils = {
  /**
   * Format a number as USD currency.
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  },

  /**
   * Format an ISO date string to a readable format.
   */
  formatDate(dateStr) {
    if (!dateStr || dateStr === 'ù') return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  /**
   * Map status strings to badge CSS classes.
   */
  statusBadge(status) {
    const map = {
      Active: 'success', Open: 'success', Present: 'success', Approved: 'success',
      Paid: 'success', Completed: 'success', Full: 'warning',
      Pending: 'warning', Processing: 'warning', 'In Progress': 'warning',
      Late: 'warning', Screening: 'info', Interview: 'info', Applied: 'neutral',
      'On Leave': 'warning', Upcoming: 'info',
      Inactive: 'neutral', Closed: 'neutral', Absent: 'danger', Rejected: 'danger',
      Offer: 'accent',
    };
    const type = map[status] || 'neutral';
    return `<span class="badge badge--${type}">${status}</span>`;
  },

  /**
   * Generate initials avatar HTML for an employee.
   */
  avatarHTML(firstName, lastName) {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    return `<div class="employee-cell__avatar">${initials}</div>`;
  },

  /**
   * Build an employee cell with avatar, name, and email.
   */
  employeeCell(employee) {
    return `
      <div class="employee-cell">
        ${this.avatarHTML(employee.firstName, employee.lastName)}
        <div>
          <div class="employee-cell__name">${employee.firstName} ${employee.lastName}</div>
          <div class="employee-cell__email">${employee.email}</div>
        </div>
      </div>`;
  },

  /**
   * Debounce a function call.
   */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Generate a unique ID with a prefix.
   */
  generateId(prefix = 'ID') {
    return `${prefix}${Date.now().toString(36).toUpperCase()}`;
  },

  /**
   * Simple form validation ù checks required fields.
   */
  validateForm(formEl) {
    let valid = true;
    formEl.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      const existing = group?.querySelector('.form-error');
      if (existing) existing.remove();

      if (!field.value.trim()) {
        valid = false;
        field.classList.add('form-control--error');
        if (group) {
          const err = document.createElement('span');
          err.className = 'form-error';
          err.textContent = 'This field is required';
          group.appendChild(err);
        }
      } else {
        field.classList.remove('form-control--error');
      }
    });
    return valid;
  },

  /**
   * Filter an array by a search term across specified keys.
   */
  filterBySearch(items, searchTerm, keys) {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return items;
    return items.filter(item =>
      keys.some(key => String(item[key]).toLowerCase().includes(term))
    );
  },

  /**
   * Paginate an array and return the current page slice.
   */
  paginate(items, page, perPage = 10) {
    const start = (page - 1) * perPage;
    return {
      data: items.slice(start, start + perPage),
      total: items.length,
      pages: Math.ceil(items.length / perPage),
      currentPage: page,
    };
  },
};
