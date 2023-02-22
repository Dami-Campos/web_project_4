import Card from "../scripts/cards.js"
import Popup from "./popup.js"
import PopupWithForm from "./popupWithForm.js";
import FormValidator from "./validate.js";
import previewPopup from "./popupWithImage.js"
import Section from "./section.js"
import UserInfo from "./userInfo.js"
import { initialCards, selectors, formsElements } from "./utils/utils.js";


formsElements.forEach((form) => {
    const formValidator = new FormValidator(form, selectors);
    formValidator.enableValidation();
  });

  export const newPopupInfo = new PopupWithForm("#popupProfile", handleImageSubmit); 
  export const newPopupImage = new PopupWithForm("#popupImage", updateUserInfo);


  export function updateUserInfo(inputValues) {
    document.querySelector(".popupprofile__name").textContent = inputValues.name;
    document.querySelector(".popupprofile__job").textContent = inputValues.job; 

  }

  
  function handleProfileSubmit(event) {
    event.preventDefault();
    const inputValues = {
      name: formsElements.elements.name.value,
      job: formsElements.elements.job.value,
    };
    updateUserInfo(inputValues);
    newPopupInfo.close();
    event.target.reset();
  }
  



 function handleImageSubmit(evt) {
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

 

export const initialSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: ({title, image}) => {
            previewPopup.open({title, image});
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




const profileBackground = document.querySelector(".popupprofile-form");
const formImagebackground = document.querySelector(".popupimage-form");
const imageBackground = document.querySelector(".popup__image");


profileBackground.addEventListener('click', () => newPopupInfo.close());
imageBackground.addEventListener('click', () =>  previewPopup.close());
formImagebackground.addEventListener('click', () => newPopupImage.close());


newPopupImage._setEventListeners();
newPopupInfo._setEventListeners();
previewPopup._setEventListeners();