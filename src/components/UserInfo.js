export class UserInfo {
  constructor({ nameUser, infoUser }) {
    this._nameUser = document.querySelector(nameUser);
    this._infoUser = document.querySelector(infoUser);

    this._nameInput = document.querySelector(".popup__input_data_name");
    this._jobInput = document.querySelector(".popup__input_data_job");
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
    this._nameInput.value = name;
    this._jobInput.value = job;
  }
}
