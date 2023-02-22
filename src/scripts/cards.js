export default class Card {
    constructor({data, handleCardClick}, selector){

        this._title = data.title;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
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

        _setEventListeners() { 
                this._element.querySelector(".element__like").addEventListener("click", () => {
                    this._toggleLike();
                  });
                  const trash = this._element.querySelector(".element__trash");
                   trash.addEventListener("click", this._handleDelete);
                   this._element.querySelector(".element__image").addEventListener('click', () => {
                   this._handleCardClick({
                      title: this._title,
                      image: this._link,
                    });
      
                    });
};
}
