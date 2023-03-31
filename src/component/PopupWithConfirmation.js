import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit, submitButton}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = submitButton;
    this._previewText = submitButton.textContent;
  }
  


  close() {
    super.close();
    this.renderLoading(false);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Guardando...';
    } else {
      this._submitButton.textContent = this._previewText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit();
    });
  }
}

