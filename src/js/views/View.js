import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * <short description here> Render the recieved object to the DOM
   * @param {Object || Object[]} data   // {<expectedInput> | <inputs>} <nameOfParameter> // Data to be rendered (e.g. recipe)
   * @param {boolean} [render=true]   // <type> [<optional=defaultParam>] // If false, create markup string instead of rendering to DOM
   * @returns {undefined | string}  // A markup string is returned if render=false
   * @this {Object} view instance
   * @author Vidar Oxlund
   * @todo  Finish implementation // What is still in development
   *  // VS Code will show this data when you hover parts of the function.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    // console.log('View data render', data, render);

    if (!render) return markup;
    // console.log(data, render);

    this._clear();
    // console.log('View this._clear ', this);

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    // NOTE  ONLY UPDATE PARTS OF DOM THAT HAS CHANGED, COMPARING OLD AND NEW STATES

    // Convert markup string to a DOM object that is living in the memory, and then compare it to the actual DOM on the page

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Converting the NodeList to an Array
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Compare old and new node elements
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // console.log(newEl.firstChild.nodeValue.trim());

        curEl.textContent = newEl.textContent;
      }

      // Updates chenged ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
        `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
