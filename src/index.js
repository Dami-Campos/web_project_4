import "./pages/index.css"
import Card from "./component/Card.js"
import Popup from "./component/Popup.js"
import PopupWithForm from "./component/PopupWithForm.js";
import FormValidator from "./component/FormValidator.js";
import PopupWithImage from "./component/PopupWithImage.js";
import PopupWithConfirmation from "./component/PopupWithConfirmation";
import Section from "./component/Section.js"
import UserInfo from "./component/UserInfo.js"
import Api from "./component/Api.js"
import { selectors, formsElements, popupPicture, avatarImage, } from "./component/utils/Utils.js";

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

  //export const newPopupInfo = new PopupWithForm("#popupProfile", handleProfileSubmit, ".popupprofile__save"); 
  //export const newPopupImage = new PopupWithForm("#popupImage", handleImageSubmit, ".popupimage__save");
  //export const newPopupPicture = new PopupWithForm(".popup__picture", handlePictureSubmit, ".popup__picture-save")
  export const previewPopup = new PopupWithImage("#imageOpen");

  api.getUserInfo().then((res) => {
    newUserInfo.updateUser({name: res.name,  about: res.about});
    newUserInfo.updateAvatar(res.avatar);
    newUserInfo.userId = res._id;
  })
  

  
   const initialSection = new Section(
    {
      items: [],
      renderer: (data) => {
        const newCard = new Card(
          {
            data,
            handleCardClick: (title, link) => {
              previewPopup.open(title, link);
            },
            callbacks: {
              deleteHandler(){
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
          newUserInfo,
          "#template"
        );
        const cardElement = newCard.generateCard();
        initialSection.setItem(cardElement);
      },
    },
    ".elements"
  );


  const newPopupImage = new PopupWithForm({
    popupSelector: "#popupImage",
    handleFormSubmit: (data) => {
      api.addCard({title: data.title, link: data.link}).then((card) => {
        initialSection.prependItem(card);
        initialSection.clear();
        initialSection.renderItems();
          newPopupImage.close();
        })
        .catch((err) => console.log(err));
    },
    submitButton: ".popupimage__save",
  });
  
  
  const newPopupInfo = new PopupWithForm({
    popupSelector: "#popupProfile",
    handleProfileSubmit: (data) => {
      api.updateUser({name: data.name, about: data.about}).then((res) => {
          newUserInfo.setUserInfo({uName: res.name, uJob: res.about});
          newPopupInfo.close();
        }).catch((err) => console.log(err));
    },
    submitButton: ".popupprofile__save",
  });
  
  const newPopupPicture = new PopupWithForm({
    popupSelector: ".popup__picture",
    handleFormSubmit: (data) => {
      const avatar = data.link;
      api.updateAvatar(avatar).then(() => {
          newUserInfo.updateAvatar(avatar);
          newPopupPicture.close();
        })
        .catch((err) => console.log(err));
    },
    submitButton: ".popup__picture-save",
  });


const formProfile = document.querySelector("#openProfile");
formProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPopupInfo.open();
});


const formImage = document.querySelector("#openImage");
formImage.addEventListener('click', (evt) => {
  console.log("hola");
  evt.preventDefault();
  newPopupImage.open();
});



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
});

/*function handleImageSubmit() {
  const addFormCard = document.querySelector(".popupimage__form");
  const title = addFormCard.querySelector(".popupimage__name").value;
  const link = addFormCard.querySelector(".popupimage__job").value;
  api.addCard(title, link).then(card => {
      initialSection.prependItem(card);
      initialSection.clear();
      initialSection.renderItems();
  })
}*/
