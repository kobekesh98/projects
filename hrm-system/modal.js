/**
 * HRM System — Modal Component
 * Reusable modal dialog for forms, confirmations, and detail views.
 */

const HRMModal = {
  overlay: null,

  /**
   * Initialize the modal overlay element in the DOM.
   */
  init() {
    if (document.getElementById('modal-overlay')) return;

    this.overlay = document.createElement('div');
    this.overlay.id = 'modal-overlay';
    this.overlay.className = 'modal-overlay';
    this.overlay.innerHTML = '<div class="modal" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(this.overlay);

    // Close on overlay click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  },

  /**
   * Open a modal with the given title, body HTML, and footer buttons.
   * @param {Object} options - { title, body, footer, size }
   */
  open({ title, body, footer = '', size = '' }) {
    this.init();
    const modal = this.overlay.querySelector('.modal');
    modal.className = `modal${size ? ` modal--${size}` : ''}`;

    modal.innerHTML = `
      <div class="modal__header">
        <h2 class="modal__title">${title}</h2>
        <button class="modal__close" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">${body}</div>
      ${footer ? `<div class="modal__footer">${footer}</div>` : ''}
    `;

    modal.querySelector('.modal__close').addEventListener('click', () => this.close());
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  /**
   * Close the active modal.
   */
  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  },

  /**
   * Shorthand for a confirmation dialog.
   */
  confirm({ title, message, onConfirm, confirmLabel = 'Confirm', danger = false }) {
    this.open({
      title,
      body: `<p style="color:var(--color-text-secondary)">${message}</p>`,
      footer: `
        <button class="btn btn--secondary" id="modal-cancel">Cancel</button>
        <button class="btn ${danger ? 'btn--danger' : 'btn--primary'}" id="modal-confirm">${confirmLabel}</button>
      `,
    });

    const modal = this.overlay.querySelector('.modal');
    modal.querySelector('#modal-cancel').addEventListener('click', () => this.close());
    modal.querySelector('#modal-confirm').addEventListener('click', () => {
      onConfirm();
      this.close();
    });
  },
};
