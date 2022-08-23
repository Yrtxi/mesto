export class UserInfo {
  constructor({ nameUserSelector, infoUserSelector, avatarUserSelector }) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
    this._avatarUser = document.querySelector(avatarUserSelector);
  }

  //Метод возвращает объект с информацией о пользователе
  getUserInfo() {
    this._userValues = {
      name: this._nameUser.textContent,
      about: this._infoUser.textContent,
      avatar: this._avatarUser.src
    };

    return this._userValues;
  }

  //Принимаем данные пользователя и добавляем их на страницу
  setUserInfo({ name, about, avatar }) {
    this._nameUser.textContent = name;
    this._infoUser.textContent = about;
    this._avatarUser.src = avatar;
  }
}
