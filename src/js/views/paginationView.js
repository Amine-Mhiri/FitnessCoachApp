import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
                <span>Page ${
                  curPage + 1
                } <i class="fa-solid fa-arrow-right"></i></span>
                
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
                <span> <i class="fa-solid fa-arrow-left"></i>
                Page ${curPage - 1}</span>
        </button>
      `;
    }
    // Other page
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <span> <i class="fa-solid fa-arrow-left"></i>
      Page ${curPage - 1}</span>
        </button>

      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
                <span>Page ${
                  curPage + 1
                } <i class="fa-solid fa-arrow-right"></i></span>
                
        </button>
      `;
    }
    // Page 1, and there are No other pages
    return '';
  }
}
export default new PaginationView();
