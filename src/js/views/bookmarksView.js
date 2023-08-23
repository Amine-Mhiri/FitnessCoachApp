import View from './View';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No workouts for this session yet. Start searching and adding workouts to build your training session ;)`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.gif}" alt="${result.name}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.name}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>
    `;
  }
}

export default new BookmarksView();
