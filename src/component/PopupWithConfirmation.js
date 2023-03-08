import Popup from "./Popup.js";

export default class  PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButton) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = submitButton;
  }

  close() {
    super.close();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector(".popup__delete-save").addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}