export default class Card {
  constructor({data, handleCardClick, handleDeleteClick, handleLikeAdd, handleLikeDelete, userId,}, selector){
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._id = data._id;
    this._arrayLikes = data.likes;
    this._cardHearts = this._arrayLikes.length;
    this._ownerId = data.owner._id;
    this._user = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;

    this._element = this._getTemplate();
    
    this._elementLike = this._element.querySelector('.element__like');
    this._elementCount = this._element.querySelector('.element__count');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__name');
}
      
_getTemplate() {
  return document
  .querySelector(this._selector)
  .content.querySelector('.element')
  .cloneNode(true);
}

  addLike() {
    this._elementLike.classList.add('element__liked');
    this._elementCount.textContent = this._arrayLikes.length;
  }
  
  removeLike() {
    this._elementLike.classList.remove('element__liked');
    this._elementCount.textContent = this._arrayLikes.length;
    if (this._cardHearts === 0) {
      this._elementCount.textContent = '';
    }
  }

  _deleteButton() {
    const trashButton = this._element.querySelector('.card__delete-button');
    trashButton.closest('.element').remove();
  }
  
  updateLikes = (res) => {
    this._arrayLikes = res;
    return this._arrayLikes;
  };

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      const hasUserLiked = this._arrayLikes.some(
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
      
      this._elementImage.addEventListener('click', () =>{
      console.log(this._name, this._link)
      this._handleCardClick({name: this._name, link: this._link})
  });
      
      if (this._ownerId !== this._user) {
        this._element.querySelector('.card__delete-button').remove();
      }
    }
    
    generateCard() {
      this._setEventListeners();
      
      this._elementName.textContent = this._name;
      this._elementImage.src = this._link;
      this._elementCount.textContent = this._arrayLikes.length;
      
      const hasUserLiked = this._arrayLikes.some(
        (like) => like._id === this._user
      );
      this._elementLike.classList.toggle('element__liked', hasUserLiked);

    return this._element;
  }
}



