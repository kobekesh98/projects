/**
 * HRM System — Toast Notification Component
 * Displays brief success, error, and info messages.
 */

const HRMToast = {
  container: null,

  /**
   * Ensure the toast container exists in the DOM.
   */
  init() {
    if (document.getElementById('toast-container')) {
      this.container = document.getElementById('toast-container');
      return;
    }
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  /**
   * Show a toast message.
   * @param {string} message - Text to display
   * @param {string} type - 'success' | 'error' | 'info'
   * @param {number} duration - Auto-dismiss time in ms
   */
  show(message, type = 'info', duration = 3500) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
};
