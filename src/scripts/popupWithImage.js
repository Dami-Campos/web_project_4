import Popup from "./popup.js";

 export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }


open(title, link) {
  this._popupElement.querySelector(".popup__size-image").src = link;
  this._popupElement.querySelector(".popup__footer").textContent = title;
    super.open();
}
close() {
  super.close();
}



}




