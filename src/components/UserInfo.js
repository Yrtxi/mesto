export class UserInfo {
  constructor({ nameUserSelector, infoUserSelector }) {
    this._nameUser = document.querySelector(nameUserSelector);
    this._infoUser = document.querySelector(infoUserSelector);
  }

  //Метод возвращает объект с информацией о пользователе
  getUserInfo() {
    this._userValues = {
      name: this._nameUser.textContent,
      job: this._infoUser.textContent,
    };

    return this._userValues;
  }

  //Принимаем данные пользователя и добавляем их на страницу
  setUserInfo({ name, job }) {
    this._nameUser.textContent = name;
    this._infoUser.textContent = job;
  }
}
