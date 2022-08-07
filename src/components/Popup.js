export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
   
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Метод открытия попапа
  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupSelector.addEventListener("mousedown", this._handleClickClose);
  }

  //Метод закрытия попапа
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Метод закрытия попапа на ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Метод закрытия попапа по клику
  _handleClickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      evt.target.classList.remove("popup_opened");
    }
  }

  //Устанавливаем обработчик клика иконке закрытия попапа
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
