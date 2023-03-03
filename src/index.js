import "./pages/index.css"
import Card from "./component/Card.js"
import Popup from "./component/Popup.js"
import PopupWithForm from "./component/PopupWithForm.js";
import FormValidator from "./component/FormValidator.js";
import PopupWithImage from "./component/PopupWithImage.js";
import Section from "./component/Section.js"
import UserInfo from "./component/UserInfo.js"
import Api from "./component/Api.js"
import { initialCards, selectors, formsElements, handleImageSubmit, handleProfileSubmit } from "./component/utils/Utils.js";

const api = new Api({
  token: "8497370c-558e-4854-8c70-728ddddc967f",
  url: "https://around.nomoreparties.com/v1/web_es_cohort_o4"
})

api.getCards().then(cardsResult => {
  initialSection.setItem(cardsResult);
  initialSection.renderer();
})

formsElements.forEach((form) => {
    const formValidator = new FormValidator(form, selectors);
    formValidator.enableValidation();
  });

  export const newPopupInfo = new PopupWithForm("#popupProfile", handleProfileSubmit); 
  export const newPopupImage = new PopupWithForm("#popupImage", handleImageSubmit);
  export const previewPopup = new PopupWithImage("#imageOpen");

  let cards = [];
  
  api.getCards().then(cardsResult => {
    cards = cardsResult;
    initialSection.renderItems();
  })

 const initialSection = new Section(
  {
    items: [],
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: (title, image) => {
            previewPopup.open(title, image);
          },
          callbacks: {
            deleteHandler() {
              return api.deleteCard(data._id);
            },
            likeHandler() {
              return api.like(data._id) 
            },
            deleteLikeHandler(){
              return api.removeLike(data._id);
            }
          }
        },
        "#template"
      );
      const cardElement = newCard.generateCard();
      initialSection.setItem(cardElement);
    },
  },
  ".elements"
);

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
