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
import {  selectors, profileOpen, popupProfileForm, formImage, popupPictureForm, profileName, profileAbout, profileImage, profileAdd , addCardSubmitButton, deleteCardSubmitButton, editProfileSubmitButton, profileImageSubmitButton, profileImageOverlay, } from "./component/utils/Utils.js";


const api = new Api({
  url: "https://around.nomoreparties.co/v1/web_es_cohort_04",
  headers: {
    authorization: "8497370c-558e-4854-8c70-728ddddc967f",
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  userName: profileName,
  userOcupation: profileAbout,
  userAvatar: profileImage,
});

const popupProfileValidate = new FormValidator(popupProfileForm, selectors);
const formImageValidate = new FormValidator(formImage, selectors);
const popupPictureValidate = new FormValidator(popupPictureForm, selectors);

popupProfileValidate.enableValidation();
formImageValidate.enableValidation();
popupPictureValidate .enableValidation();

export const previewPopup = new PopupWithImage('#imageOpen');
previewPopup.setEventListeners();

const editProfile = new PopupWithForm({
  popupSelector: '.popupprofile',
  handleFormSubmit: (data) => {
    api
      .setUserInfo({name: data.name, about: data.about})
      .then((res) => {
        userInfo.setUserInfo({username: res.name, userocupation: res.about});

        editProfile.close();
      })
      .catch((err) => console.log(err));
  },
  submitButton: editProfileSubmitButton,
});

editProfile.setEventListeners();

profileOpen.addEventListener('click', () => {
  editProfile.open();
});

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({username: res.name, userocupation: res.about});
    userInfo.setUserAvatar(res.avatar);
    userInfo.userId = res._id;
  })
  .then(() => {
    api
      .getCards()
      .then((res) => {
        const cardRender= new Section(
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
          handleFormSubmit: (data) => {
            api
              .addCard({name: data['title-image'], link: data['link-image']})
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

        profileAdd.addEventListener('click', () => {
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
        userInfo.setUserAvatar(avatar);
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

 const deleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_delete',
  submitButton: deleteCardSubmitButton,
});

deleteCard.setEventListeners();

function createCard(data) {
  const newCard = new Card(
    {
      data,
      handleCardClick: ({name, link}) => {
        previewPopup.open({name, link});
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
            newCard.addLike();
          })
          .catch((err) => console.log(err));
      },
      handleLikeDelete: ({id}) => {
        api
          .removeLike(id)
          .then((res) => {
            newCard.updateLikes(res.likes);
            newCard.removeLike();
          })
          .catch((err) => console.log(err));
      },
      userId: userInfo.userId,
    },
    '.template'
  );
  return newCard.generateCard();
}