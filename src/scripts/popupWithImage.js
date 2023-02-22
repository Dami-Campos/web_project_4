import Popup from "./popup.js";

 class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }


open() {
  this._element.querySelector(".element__image").src = link;
  this._element.querySelector(".element__name").textContent = title;
    super.open();
}
close() {
  super.close();
}



}

 const previewPopup = new PopupWithImage("#open");

export default previewPopup;
