import { Popup } from "./Popup";

export class PopupWithApprove extends Popup {
  constructor({ popupSelector, handleButtonSubmit }) {
    super(popupSelector);
    this._handleButtonSubmit = handleButtonSubmit;
    this._popupButton = this._popupElement.querySelector(".popup__button");
  }
  
  open(data, cardElement) {
    this._popupButton.addEventListener("click", () => {
      this._handleButtonSubmit(data, cardElement);
    });
    super.open();
  }

}


