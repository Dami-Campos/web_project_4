import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback.bind(this);
  }

  close() {
    super.close();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement = this._popupElement.querySelector(".form");
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      evt.target.reset();
      this.close();
    });
  }

  _getInputValues() {
    this._inputElements = this._popupElement.querySelectorAll(".form__submit");
    this._formValues = {};
    this._inputElements.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}

