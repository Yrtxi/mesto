export const options = {
  url: "https://mesto.nomoreparties.co",
  headers: {
    authorization: "0862dde7-7d25-46f1-b869-ffa04a468330",
    "Content-Type": "application/json",
  },
};

export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  //Обрабатываем ответ сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод для получения инфомации о пользователе
  getInfoUser() {
    return fetch(`${this._url}/v1/cohort-48/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод редактирования профиля
  editInfoUser({ name, about }) {
    return fetch(`${this._url}/v1/cohort-48/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  //Метод для получения массива первоночальных карточек
  getInitialCards() {
    return fetch(`${this._url}/v1/cohort-48/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод добавления новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._url}/v1/cohort-48/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  //Метод удаления карточки
  deleteCard(id) {
    return fetch(`${this._url}/v1/cohort-48/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод установки лайка
  setLike(id, likeStatus) {
    return fetch(`${this._url}/v1/cohort-48/cards/${id}/likes`, {
      method: likeStatus ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод на смену аватара
  changeAvatar(avatar) {
    return fetch(`${this._url}/v1/cohort-48/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._handleResponse);
  }
}
