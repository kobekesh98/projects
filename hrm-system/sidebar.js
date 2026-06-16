/**
 * HRM System — Sidebar Navigation Component
 * Renders the sidebar with active page highlighting.
 */

const HRMSidebar = {
  /* Navigation items grouped by section */
  navItems: [
    { section: 'Overview', links: [
      { href: 'index.html', label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
      { href: 'reports.html', label: 'Reports', icon: 'reports', page: 'reports' },
    ]},
    { section: 'People', links: [
      { href: 'employees.html', label: 'Employees', icon: 'employees', page: 'employees' },
      { href: 'departments.html', label: 'Departments', icon: 'departments', page: 'departments' },
      { href: 'recruitment.html', label: 'Recruitment', icon: 'recruitment', page: 'recruitment' },
    ]},
    { section: 'Operations', links: [
      { href: 'attendance.html', label: 'Attendance', icon: 'attendance', page: 'attendance' },
      { href: 'leave.html', label: 'Leave Management', icon: 'leave', page: 'leave' },
      { href: 'payroll.html', label: 'Payroll', icon: 'payroll', page: 'payroll' },
    ]},
    { section: 'Development', links: [
      { href: 'performance.html', label: 'Performance', icon: 'performance', page: 'performance' },
      { href: 'training.html', label: 'Training', icon: 'training', page: 'training' },
      { href: 'benefits.html', label: 'Benefits', icon: 'benefits', page: 'benefits' },
    ]},
    { section: 'System', links: [
      { href: 'settings.html', label: 'Settings', icon: 'settings', page: 'settings' },
    ]},
  ],

  /* SVG icon paths mapped by name */
  icons: {
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    reports: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    employees: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    departments: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>',
    recruitment: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>',
    attendance: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    leave: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    payroll: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    performance: '<path d="M12 20V10M18 20V4M6 20v-4"/>',
    training: '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
    benefits: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
  },

  /**
   * Render the sidebar into the #sidebar container.
   * @param {string} activePage - Current page identifier for highlighting
   */
  render(activePage) {
    const container = document.getElementById('sidebar');
    if (!container) return;

    const navHTML = this.navItems.map(section => `
      <div class="sidebar__section-label">${section.section}</div>
      ${section.links.map(link => `
        <a href="${link.href}" class="sidebar__link ${link.page === activePage ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.icons[link.icon]}</svg>
          ${link.label}
        </a>
      `).join('')}
    `).join('');

    container.innerHTML = `
      <div class="sidebar__brand">
        <div class="sidebar__logo">NX</div>
        <div>
          <div class="sidebar__title">Nexora HRM</div>
          <div class="sidebar__subtitle">Enterprise Suite</div>
        </div>
      </div>
      <nav class="sidebar__nav" aria-label="Main navigation">${navHTML}</nav>
      <div class="sidebar__footer">
        <div class="sidebar__user">
          <div class="sidebar__avatar">AP</div>
          <div class="sidebar__user-info">
            <div class="sidebar__user-name">Aisha Patel</div>
            <div class="sidebar__user-role">HR Administrator</div>
          </div>
        </div>
      </div>`;
  },
};
