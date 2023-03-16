export default class Card {
  constructor({data, handleCardClick, callbacks}, user, selector){
    this._title = data.title;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._user = user;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._callbacks = callbacks;
}
      
  _getTemplate() {
    const element = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
      return element; 
  }
      
  generateCard() {
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
        this._callbacks._deleteCard().then(() => {
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
}
