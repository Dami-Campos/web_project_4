export default class UserInfo {
  constructor({uName, uJob}) {
    this._uName = document.querySelector(uName);
    this._uJob = document.querySelector(uJob);
  }

  getUserInfo() {
    return {
      uName: this._uName.textContent,
      uJob: this._uJob.textContent,
    };
  }

  setUserInfo(data) {
    const {uName, uJob} = data;
    this._uName.textContent = uName;
    this._uJob.textContent = uJob;
  }
}

export default class UserInfo {
  constructor({userName, userOcupation, userAvatar, userId}) {
    this._userName = userName;
    this._userOcupation = userOcupation;
    this._userId = userId;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOcupation: this._userOcupation.textContent,
    };
  }

  setUserInfo(data) {
    const {username, userocupation} = data;
    this._userName.textContent = username;
    this._userOcupation.textContent = userocupation;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}