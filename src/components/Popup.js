export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  //Метод открытия попапа
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
  }

  //Метод закрытия попапа
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOverlayClick
    );
  }

  //Метод закрытия попапа на ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Метод закрытия попапа по клику
  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  //Устанавливаем обработчик клика иконке закрытия попапа
  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
