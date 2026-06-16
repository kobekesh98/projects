/**
 * HRM System — Data Table Component
 * Renders sortable, searchable data tables with action buttons.
 */

const HRMTable = {
  /**
   * Render a data table into a container element.
   * @param {HTMLElement} container - Target DOM element
   * @param {Object} config - { columns, data, actions }
   */
  render(container, { columns, data, actions }) {
    if (!data.length) {
      container.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
          <p>No records found</p>
        </div>`;
      return;
    }

    const headerHTML = columns.map(col => `<th>${col.label}</th>`).join('');
    const actionsHeader = actions ? '<th>Actions</th>' : '';

    const rowsHTML = data.map((row, rowIndex) => {
      const cells = columns.map(col => {
        const value = col.render ? col.render(row, rowIndex) : (row[col.key] ?? '—');
        return `<td>${value}</td>`;
      }).join('');

      const actionsCell = actions
        ? `<td><div class="data-table__actions">${actions(row, rowIndex)}</div></td>`
        : '';

      return `<tr data-index="${rowIndex}">${cells}${actionsCell}</tr>`;
    }).join('');

    container.innerHTML = `
      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr>${headerHTML}${actionsHeader}</tr></thead>
          <tbody>${rowsHTML}</tbody>
        </table>
      </div>`;
  },

  /**
   * Render pagination controls below a table.
   */
  renderPagination(container, { currentPage, pages, total, onPageChange }) {
    if (pages <= 1) {
      container.innerHTML = '';
      return;
    }

    const prevDisabled = currentPage <= 1 ? 'disabled' : '';
    const nextDisabled = currentPage >= pages ? 'disabled' : '';

    let pageButtons = '';
    for (let i = 1; i <= pages; i++) {
      pageButtons += `<button class="pagination__btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    container.innerHTML = `
      <div class="pagination">
        <span>Showing page ${currentPage} of ${pages} (${total} records)</span>
        <div class="pagination__controls">
          <button class="pagination__btn" data-page="prev" ${prevDisabled}>? Prev</button>
          ${pageButtons}
          <button class="pagination__btn" data-page="next" ${nextDisabled}>Next ?</button>
        </div>
      </div>`;

    container.querySelectorAll('.pagination__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        const page = btn.dataset.page;
        if (page === 'prev') onPageChange(currentPage - 1);
        else if (page === 'next') onPageChange(currentPage + 1);
        else onPageChange(parseInt(page));
      });
    });
  },
};
