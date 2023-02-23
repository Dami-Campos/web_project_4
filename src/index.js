import "./pages/index.css"
import Card from "./scripts/cards.js"
import Popup from "./scripts/popup.js"
import PopupWithForm from "./scripts/popupWithForm.js";
import FormValidator from "./scripts/validate.js";
import PopupWithImage from "./scripts/popupWithImage.js"
import Section from "./scripts/section.js"
import UserInfo from "./scripts/userInfo.js"
import { initialCards, selectors, formsElements, handleImageSubmit, handleProfileSubmit } from "./scripts/utils/utils.js";


formsElements.forEach((form) => {
    const formValidator = new FormValidator(form, selectors);
    formValidator.enableValidation();
  });

  export const newPopupInfo = new PopupWithForm("#popupProfile", handleProfileSubmit); 
  export const newPopupImage = new PopupWithForm("#popupImage", handleImageSubmit);
  const previewPopup = new PopupWithImage("#imageOpen");


 

export const initialSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: (title, image) => {
            previewPopup.open(title, image);
          },
        },
        "#template"
      );
      const cardElement = newCard.generateCard();
      initialSection.setItem(cardElement);
    },
  },
  ".elements"
);
initialSection.renderItems();




const newUserInfo = new UserInfo({
  uName: ".profile__name",
  uJob: ".profile__explorador",
});

newUserInfo.getUserInfo(); 

const formImage = document.querySelector("#openImage");
formImage.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPopupImage.open();
});

const formProfile = document.querySelector("#openProfile");
formProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPopupInfo.open();
});




