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
import {  selectors, openFormProfile, formEdit, formImage, formProfileImage, profileTitle, profileProfession, profileImage, openCardButton, addCardSubmitButton, deleteCardSubmitButton, editProfileSubmitButton, profileImageSubmitButton, profileImageOverlay, } from "./component/utils/Utils.js";


const api = new Api({
  url: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "8497370c-558e-4854-8c70-728ddddc967f",
    'Content-Type': 'application/json',
  },
});

const profilePopupValidator = new FormValidator(formEdit, selectors);
const imagePopupValidator = new FormValidator(formImage, selectors);
const profileImagePopupValidator = new FormValidator(formProfileImage, selectors);

profilePopupValidator.enableValidation();
imagePopupValidator.enableValidation();
profileImagePopupValidator.enableValidation(); 

 export const previewPopup = new PopupWithImage('.popup__preview-image');
previewPopup.setEventListeners();

const editPopup = new PopupWithForm({
  popupSelector: '.popupprofile',
  handleFormSubmit: (data) => {
    api
      .setUserInfo({name: data.name, about: data.about})
      .then((res) => {
        profileInfo.setUserInfo({username: res.name, userocupation: res.about});

        editPopup.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: editProfileSubmitButton,
});

editPopup.setEventListeners();

export const profileUser = new UserInfo({
  userName: profileTitle,
  userOcupation: profileProfession,
  userAvatar: profileImage,
});

openFormProfile.addEventListener('click', () => {
  console.log("hola")
  editPopup.open();
});

api
  .getUserInfo()
  .then((res) => {
    profileUser.setUserInfo({username: res.name, userocupation: res.about});
    profileUser.setUserAvatar(res.avatar);
    profileUser.userId = res._id;
  })
  .then(() => {
    api
      .getCards()
      .then((res) => {
        const cardRender = new Section(
          {
            items: res,
            renderer: (data) => {
              const cardElement = createCard(data);
              cardRender.addCards(cardElement);
            },
          },
          '.elements'
        );
        cardRender.renderer();

        const newPopupImage = new PopupWithForm({
          popupSelector: '.popupimage',
          handleFormSubmit: (formData) => {
            api
              .addCard({title: formData['title-image'], link: formData['link-image']})
              .then((newCard) => {
                const newCardElement = createCard(newCard);
                cardRender.addItem(newCardElement);
                newPopupImage.close();
              })
              .catch((err) => console.log(err));
          },
          submitButton: addCardSubmitButton,
        });

        newPopupImage.setEventListeners();

        openCardButton.addEventListener('click', () => {
          console.log("hola")
          newPopupImage.open();
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

const newPopupPicture = new PopupWithForm({
  popupSelector: '.popup__picture',
  handleFormSubmit: (data) => {
    const avatar = data['link-image'];
    api
      .setUserAvatar(avatar)
      .then(() => {
        profileUser.setUserAvatar(avatar);
        newPopupPicture.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: profileImageSubmitButton,
});

newPopupPicture.setEventListeners();

profileImageOverlay.addEventListener('click', () => {
  console.log("hola")
  newPopupPicture.open();
});

export const deleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_delete',
  submitButton: deleteCardSubmitButton,
});

deleteCard.setEventListeners();

function createCard(data) {
  const newCard = new Card(
    {
      data,
      handleCardClick: ({title, link}) => {
        previewPopup.open({title, link});
      },
      handleDeleteClick: ({id}) => {
        deleteCard.open();
        deleteCard.setSubmitAction(() => {
          api
            .deleteCard(id)
            .then(() => {
              deleteCard.close();
              newCard._deleteButton();
            })
            .catch((err) => console.log(err));
        });
      },
      handleLikeAdd: ({id}) => {
        api
          .addLike(id)
          .then((res) => {
            newCard.updateLikes(res.likes);
            newCard.addHeart();
          })
          .catch((err) => console.log(err));
      },
      handleLikeDelete: ({id}) => {
        api
          .removeLike(id)
          .then((res) => {
            newCard.updateLikes(res.likes);
            newCard.removeHeart();
          })
          .catch((err) => console.log(err));
      },
      userId: profileUser.userId,
    },
    '.template'
  );
  return newCard.generateCard();
}
