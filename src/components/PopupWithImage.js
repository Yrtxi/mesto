import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imgPopup = this._popupElement.querySelector(".popup__image");
    this._imgPopupSubtitle =
      this._popupElement.querySelector(".popup__subtitle");
  }

  //Метод открытия полноразмерной картинки
  open(data) {
    this._imgPopup.src = data.linkCard;
    this._imgPopup.alt = data.nameCard;
    this._imgPopupSubtitle.textContent = data.nameCard;
    super.open();
  }
}
