export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }


  open() {
    this._popupElement.style.display = "block";
    document.addEventListener('keydown', this._handleEscClose);
}

close() {
  this._popupElement.style.display = "none" ;
  document.removeEventListener('keydown', this._handleEscClose);
}

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _isClickOutside(evt) {
    return (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close-image')
    );
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (this._isClickOutside(evt)) {
        this.close();
      }
    });
  }
}


