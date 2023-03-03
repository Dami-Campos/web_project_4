  export default class Api {
    constructor(options){
        this._options = options; 
    }

    getHeaders(){
        const myHeaders = new Headers();     
        myHeaders.append("Authorization", this._options.token, );
        return myHeaders;
    }

    getCards(){  
        const requestOptions = {
          method: 'GET',
          headers: this.getHeaders(),
        };
        
        return fetch(`${this._options.url}/cards`, requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
    }
    
    getUser(){
        const requestOptions = {
          method: 'GET',
          headers: this.getHeaders(),

        };
        
        return fetch(`${this._options.url}/users/me`, requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
    }
    
    deleteCard(cardId){
        const requestOptions = {
          method: 'DELETE',
          headers: this.getHeaders,
          refirect: "follow",
        };
        
        return fetch(`${this._options.url}/cards/${cardId}`, requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
    }

    updateUser(name, about){
        const requestOptions = {
          method: 'PATCH',
         headers: this.getHeaders,
          body: JSON.stringify({
            name: name,
            about: about,
          })
        };
        
        return fetch(`${this._options.url}/users/me`, requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
    }

    addCard(title, link){
         const requestOptions = {
          method: 'POST',
          headers:this.getHeaders,
          refirect: "follow",
          body: JSON.stringify({
            title: title,
            link: link,
          }),
        };
        
        return fetch(`${this._options.url}/cards`, requestOptions)
          .then(response => response.json())
          .catch(error => console.log('error', error));
    }

    updateAvatar(avatar){
      const requestOptions = {
        method: 'PATCH',
        headers:this.getHeaders,
        refirect: "follow",
      };
      
      return fetch(`${this._options.url}/users/me/${avatar}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }

    likeHandler(cardId){
      const requestOptions = {
        method: 'PUT',
        headers:this.getHeaders,
        refirect: "follow",
      };
      
      return fetch(`${this._options.url}/cards/likes/${cardId}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }

    deleteLikeHandler(cardId){
      const requestOptions = {
        method: 'DELETE',
        headers:this.getHeaders,
        refirect: "follow",
      };
      
      return fetch(`${this._options.url}/cards/likes/${cardId}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    }


  }
