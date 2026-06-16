/**
 * HRM System — Main Application Bootstrap
 * Initializes shared components on every page load.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Read the active page identifier from the <body> data attribute
  const activePage = document.body.dataset.page || 'dashboard';

  // Render sidebar navigation with active state
  HRMSidebar.render(activePage);

  // Initialize modal and toast systems
  HRMModal.init();
  HRMToast.init();

  // Mobile sidebar toggle (hamburger button in header)
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Invoke page-specific initializer if defined
  const pageInit = window[`init${capitalize(activePage)}`];
  if (typeof pageInit === 'function') {
    pageInit();
  }
});

/** Capitalize first letter of a string */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
