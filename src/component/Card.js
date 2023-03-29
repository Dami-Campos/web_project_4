export default class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeAdd, handleLikeDelete, userId,}, selector){
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._id = data._id;
    this._likesArray = data.likes;
    this._cardLikes = this._likesArray.length;
    this._ownerId = data.owner._id;
    this._user = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;

    this._element = this._getTemplate();
    
    this._heartButton = this._element.querySelector('.element__like');
    this._heartNumber = this._element.querySelector('.element__count');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__name');
}
      
  _getTemplate() {
    return document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
  }

  addHeart() {
    this._heartButton.classList.add('element__liked');
    this._heartNumber.textContent = this._likesArray.length;
  }
  
  removeHeart() {
    this._heartButton.classList.remove('element__liked');
    this._heartNumber.textContent = this._likesArray.length;
    if (this._cardLikes === 0) {
      this._heartNumber.textContent = '';
    }
  }

  _deleteButton() {
    const trashButton = this._element.querySelector('.card__delete-button');
    trashButton.closest('.element').remove();
  }
  
  updateLikes = (res) => {
    this._likesArray = res;
    return this._likesArray;
  };

  _setEventListeners() {
    this._heartButton.addEventListener('click', () => {
      const hasUserLiked = this._likesArray.some(
        (like) => like._id === this._user
        );
        if (hasUserLiked) {
          this._handleLikeDelete({id: this._id});
        } else {
          this._handleLikeAdd({id: this._id});
        }
      });
      
      this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this._handleDeleteClick({id: this._id});
      });
      
      this._cardImage.addEventListener('click', () =>
      this._handleCardClick({name: this._name, link: this._link})
      );
      
      if (this._ownerId !== this._user) {
        this._element.querySelector('.card__delete-button').remove();
      }
    }
    
    generateCard() {
      this._setEventListeners();
      
      this._element.querySelector(".element__name").textContent = this._name;
      this._cardImage.src = this._link;
      this._heartNumber.textContent = this._likesArray.lenght;
      //this._heartNumber.textContent = this._cardLikes ? this._cardLikes : '';

      const hasUserLiked = this._likesArray.some(
        (like) => like._id === this._user
      );
      this._heartButton.classList.toggle('element__liked', hasUserLiked);

    return this._element;
  }
}



  /*generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__name").textContent = this._title;
    this._element.querySelector(".element__count").textContent = this._likes.lenght;
      return this._element;
}

  _toggleLike() {
    const likeButton = this._element.querySelector(".element__like");
      likeButton.classList.toggle("element__liked");
} 

  _handleDelete(event){
    const listItem = event.target.closest(".element");
      listItem.remove();
}

  _isOwner(){
    return this._owner._id === this._user._id;
  }

  _hasOwnerLike(){
    return this._likes.some(item => {
      return item.owner._id === this._user._id;
    })
  }

  _setEventListeners() { 
    this._element
    .querySelector(".element__like")
    .addEventListener("click", () => {
      if(this._hasOwnerLike()){
        this.callbacks.deleteLikeHandler().then(() => {
          this._toggleLike()
        });
      }else{
        this._callbacks.likeHandler().then(() => {
          this._toggleLike()
        })
      }
    });

    if(this._isOwner()){
      this._element
      .querySelector(".popup__picture-save")
      .addEventListener("click", () => {
        this._callbacks._deleteHandler().then(() => {
          this._handleDelete();
        })
      })
    };

    this._element.querySelector(".element__image").addEventListener('click', () => {
      this._handleCardClick({ 
      title: this._title,
      link: this._link,
    });     
    });
  };
}*/
