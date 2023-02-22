import { popupCloseButton } from "./utils/utils.js"

export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popupElement.style.display = "block"
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
    
    _setEventListeners() {
      this._element.addEventListener("click", () => {
        this.close();
      });
      
    }
    }