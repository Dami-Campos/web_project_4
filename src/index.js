import "./pages/index.css"
import Card from "./component/Card.js"
import Popup from "./component/Popup.js"
import PopupWithForm from "./component/PopupWithForm.js";
import FormValidator from "./component/FormValidator";
import PopupWithImage from "./component/PopupWithImage.js"
import Section from "./component/Section.js"
import UserInfo from "./component/UserInfo.js"
import { initialCards, selectors, formsElements, handleImageSubmit, handleProfileSubmit } from "./component/utils/Utils.js";

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




