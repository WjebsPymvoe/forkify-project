import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet, find a noce recipe and bookmark it. ;)';
  _message = '';

  //  Created this handler after problem. This is now called by the controller at init and rendered on page load
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log('bookmarksView this._data', this._data);
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
