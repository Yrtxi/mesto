import { Popup } from "./Popup";

export class PopupWithApprove extends Popup {
  constructor({ popupSelector, handleButtonSubmit }) {
    super(popupSelector);
    this._handleButtonSubmit = handleButtonSubmit;
    this._popupButton = this._popupElement.querySelector(".popup__button");
  }

  open(data, cardElement) {
    super.open();
    this._data = data;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => {
      this._handleButtonSubmit(this._data, this._cardElement);
    });
  }
}
