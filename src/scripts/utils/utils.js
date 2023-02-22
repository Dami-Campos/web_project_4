/*import Card from "../scripts/cards.js"
import { newPopupInfo, initialSection } from "../index.js";
import previewPopup from "./popupWithImage.js"*/


export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

export const selectors = {
  form: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: ".popup__save-white",
  buttonImage: ".popupimage__save",
  buttonProfile : ".popupprofile__save",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const formsElements = document.querySelectorAll('.form');

//export const cardsContainer = document.querySelector(".elements")
//export const popupImage = document.querySelector("#popupImage"); 

export const popupCloseButton = document.querySelector(".popup__close-button");
