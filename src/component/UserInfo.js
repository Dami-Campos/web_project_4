export default class UserInfo {
  constructor({uName, uJob, uAvatar, userId}) {
    this._uName = uName;
    this._uJob = uJob;
    this._uAvatar = uAvatar;
    this._userId = userId
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

  setUserAvatar(avatar){
    this._uAvatar.src = avatar;
  }

}

