import "./pages/index.css"
import Card from "./component/Card.js"
import Popup from "./component/Popup.js"
import PopupWithForm from "./component/PopupWithForm.js";
import FormValidator from "./component/FormValidator.js";
import PopupWithImage from "./component/PopupWithImage.js";
import Section from "./component/Section.js"
import UserInfo from "./component/UserInfo.js"
import Api from "./component/Api.js"
import { selectors, formsElements, handleImageSubmit, handleProfileSubmit, handlePictureSubmit } from "./component/utils/Utils.js";

let newUserInfo = new UserInfo({
  uName: ".profile__name",
  uJob: ".profile__explorador",
  uAvatar: ".profile__avatar-image"
});


const api = new Api({
  url: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    Authorization: "8497370c-558e-4854-8c70-728ddddc967f",
    'Content-Type': 'application/json',
  },
})

api.getCards().then(cardsResult => {
  initialSection.setItems(cardsResult);
  initialSection.renderItems();
})

formsElements.forEach((form) => {
    const formValidator = new FormValidator(form, selectors);
    formValidator.enableValidation();
  });

  export const newPopupInfo = new PopupWithForm("#popupProfile", handleProfileSubmit, ".popupprofile__save"); 
  export const newPopupImage = new PopupWithForm("#popupImage", handleImageSubmit, ".popupimage__save");
  export const newPopupPicture = new PopupWithForm(".popup__picture", handlePictureSubmit, ".popup__picture-save")
  export const previewPopup = new PopupWithImage("#imageOpen");

  /*export const newPopupInfo = new PopupWithForm({
    popupSelector: "#popupProfile",
    handleProfileSubmit: (data) => {
      api.updateUser({name: data.name, about: data.about}).then((res) => {
          newUserInfo.setUserInfo({uName: res.name, uJob: res.about});
          newPopupInfo.close();
        }).catch((err) => console.log(err));
    },
    submitButton: ".popupprofile__save",
  });*/

  const formProfile = document.querySelector("#openProfile");
formProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPopupInfo.open();
});


 const initialSection = new Section(
  {
    items: [],
    renderer: (data) => {
      const newCard = new Card(
        {
          data,
          handleCardClick: (name, link) => {
            previewPopup.open(name, link);
          },
          callbacks: {
            deleteCard() {
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
        newUserInfo,//aquí va el user userObject
        "#template"
      );
      const cardElement = newCard.generateCard();
      initialSection.setItem(cardElement);
    },
  },
  ".elements"
);

/*const newPopupImage = new PopupWithForm({
  popupSelector: "#popupImage",
  handleFormSubmit: (data) => {
    api.addCard({title: data.title, link: data.link})
      .then((newCard) => {
        const cardElement = generateCard(newCard);
        initialSection.setItem(cardElement);
        addCardPopup.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: a".popupimage__save",
});*/

const formImage = document.querySelector("#openImage");
formImage.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPopupImage.open();
});

/*const newPopupPicture = new PopupWithForm({
  popupSelector: ".popup__picture",
  handleFormSubmit: (data) => {
    const avatar = data.link;
    api.setUserAvatar(avatar).then(() => {
        newUserInfo.setUserAvatar(avatar);
        newPopupPicture.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: ".popup__picture-save",
});*/


const formPicture = document.querySelector("#openFormPicture");
formPicture.addEventListener("click", (evt) => {
  evt.preventDefault();
  newPopupPicture.open();
})

const deleteCard = new PopupWithConfirmation({
  popupSelector: ".popup__delete",
  submitButton: ".popup__delete-save",
});

const formDelete = document.querySelector("#trash");
formDelete.addEventListener("click", (evt) => {
  evt.preventDefault();
  deleteCard.open;
})