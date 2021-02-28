import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // Here we need to select the button in order to know which page to go to. For that we need to establish a connection between the DOM and our code.
  // The way to do that is by using the custom data attributes. -Create a data attribute on each of the buttons, which will contain the page we eant to go to.
  addHandlerClick(handler) {
    // NOTE  Event delegation. Figure out which button was clicked, based on the event
    this._parentElement.addEventListener('click', function (e) {
      // Select the closest button-element to the clicked element.
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      // The Controller is made and marked in the controller.js

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // Compute number of pages the search result returns
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    //      ///     This could/should be refactored. Maybe with a method called "generateMarkupButton"
    // Page 1, and there are other pages
    // Added data attribute to navigate between pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    // Page 1 and there are NO other pages
    return 'only 1 page';
  }
}

export default new PaginationView();
