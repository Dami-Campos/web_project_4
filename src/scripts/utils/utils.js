import {newPopupInfo, initialSection} from "../../index.js"
import Card from "../../scripts/cards"

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

export const formsElements = document.querySelectorAll('.popupprofile__form');
export const popupCloseButton = document.querySelector(".popup__close-button");


export function handleProfileSubmit() {
  const nameInput = document.querySelector(".popupprofile__name") 
  const jobInput = document.querySelector(".popupprofile__job") 
  document.querySelector('.profile__name').textContent = nameInput.value; 
  document.querySelector(".profile__explorador").textContent = jobInput.value; 
  newPopupInfo.close();
}




export function handleImageSubmit(evt) {
  const addFormCard = document.querySelector(".popupimage__form");
  const title = addFormCard.querySelector(".popupimage__name").value;
  const link = addFormCard.querySelector(".popupimage__job").value;
  const data = {title, link};
  const newCard = new Card(
    {
      data,
      handleCardClick: ({title, link}) => {
        previewPopup.open({title, link});
      },
    },
    "#template"
  );

  const card = newCard.generateCard();
  initialSection.setItem(card);
}

