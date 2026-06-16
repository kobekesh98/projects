/**
 * HRM System — Settings Page
 * Company profile, notification preferences, and system config.
 */

function initSettings() {
  bindSettingsTabs();
}

/** Handle settings tab navigation */
function bindSettingsTabs() {
  const tabs = document.querySelectorAll('.settings-nav__link');
  const panels = document.querySelectorAll('.settings-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const panel = document.getElementById(tab.dataset.panel);
      if (panel) panel.style.display = 'block';
    });
  });

  // Save button handlers for each settings form
  document.querySelectorAll('[data-save-settings]').forEach(btn => {
    btn.addEventListener('click', () => {
      HRMToast.show('Settings saved successfully', 'success');
    });
  });
}
