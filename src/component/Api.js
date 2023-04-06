  export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _handleResponse(res) {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    }

    _requestOptions(method, url, body) {
      return fetch(url, {
        method: method,
        headers: this._headers,
        body: body ? JSON.stringify(body) : undefined,
      }).then((res) => {
        return this._handleResponse(res);
      });
    }

    getCards(){  
      return this._requestOptions('GET', `${this._baseUrl}/cards`);
    }
    
    getUserInfo(){
      return this._requestOptions('GET', `${this._baseUrl}/users/me`);
    }
    
    deleteCard(cardId){
      return this._requestOptions('DELETE', `${this._baseUrl}/cards/${cardId}`);
    }

    setUserInfo({name, about}){
      return this._requestOptions('PATCH', `${this._baseUrl}/users/me`, {name, about});
    }

    addCard({name, link}){
      return this._requestOptions('POST', `${this._baseUrl}/cards`, {name, link});
    }

    setUserAvatar(avatar){
      return this._requestOptions('PATCH', `${this._baseUrl}/users/me/avatar`, {avatar});
    }

    addLike(cardId){
      return this._requestOptions('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
    }

    removeLike  (cardId){
      return this._requestOptions('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
    }


  }
