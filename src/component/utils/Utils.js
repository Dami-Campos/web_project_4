export const profileOpen = document.querySelector('.profile__open');

export const profileAdd = document.querySelector('.profile__add');

export const popupProfileForm = document.querySelector('.popupprofile__form'); 

export const formImage = document.querySelector('.popupimage__form');

export const popupPictureForm = document.querySelector('.popup__picture-form');

export const profileName = document.querySelector('.profile__name');

export const profileAbout = document.querySelector('.profile__explorador');

export const profileImage = document.querySelector('.profile__avatar-image');

export const deleteCardSubmitButton = document.querySelector('.popup__delete-save');

export const editProfileSubmitButton = document.querySelector('.popupprofile__save');

export const profileImageSubmitButton = document.querySelector('.popup__picture-save');

export const profileImageOverlay = document.querySelector('.profile__avatar-image');

export const addCardSubmitButton = document.querySelector('.popupimage__save');


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
