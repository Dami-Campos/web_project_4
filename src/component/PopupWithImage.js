import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__size-image');
    this._title = this._popupElement.querySelector('.popup__footer');
  }

  open({name, link}) {
    this._image.src = link;
    this._title.textContent = name;
    super.open();
  }
}

