import {newPopupInfo} from "../../index.js"


export const initialCards = [
  {
    title: "Valle de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    title: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    title: "Montañas Calvas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    title: "Parque Nacional de la Vanoise",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    title: "Lago di Braies",
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
  api.addCard(title, link).then(card => {
    initialSection.prepend(card);
  })
}

export function handlePictureSubmit() {
  const addAvatar = document.querySelector(".popup__picture-form");
  const avatar = addAvatar.querySelector(".popup__picture-link");
  api.updateAvatar(avatar).then(newAvatar => {
    
  })

}

