export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. workout)
   * @returns {undefined}
   * @this {object} View instance
   * @author Amine Mhiri
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // A DOM Updating algorithm to change only relevant text and attributes
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    // Convert the string to a real DOM Node Object / Virtual DOM :
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // We use Array.from to convert the node list to a real array
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed Text :
      if (
        !newEl.isEqualNode(curEl) &&
        // nodeValue method returns null if the node is an element and returns text content if it's text
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed Attributes:
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class ="spinner">
    <i class="fa-solid fa-spinner"></i>  
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <p>
            <i class="nav_fa fa-solid fa-triangle-exclamation"></i>
            ${message}</p>
        </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <p>
            <i class="fa-solid fa-dumbbell"></i>
            ${message}</p>
        </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
