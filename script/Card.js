export class Card {
  constructor(
    data,
    cardSelector,
    imgTypePopup,
    imgPopup,
    imgPopupSubtitle,
    openPopup
  ) {
    this._nameCard = data.nameCard;
    this._linkCard = data.linkCard;
    this._cardSelector = cardSelector;
    this._imgTypePopup = imgTypePopup;
    this._imgPopup = imgPopup;
    this._imgPopupSubtitle = imgPopupSubtitle;
    this._openPopup = () => {
      openPopup(this._imgTypePopup);
    };
  }

  //Берем темплейт с заготовкой карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //Метод создания новой карточки
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like-button");
    this._deleteButton = this._element.querySelector(".element__delete-button");
    this._elementImage = this._element.querySelector(".element__image");

    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._nameCard;
    this._elementImage.src = this._linkCard;
    this._elementImage.alt = this._nameCard;

    return this._element;
  }

  //Метод переключения лайка
  _toggleLike() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  //Метод удаления карточки
  _deleteCard() {
    this._element.remove();
  }

  //Метод открытия нужной картинки
  _openImage() {
    this._imgPopup.src = this._linkCard;
    this._imgPopup.alt = this._nameCard;
    this._imgPopupSubtitle.textContent = this._nameCard;
    this._openPopup(this._imgTypePopup);
  }

  //Добавляем слушатели
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener("click", () => {
      this._openImage();
    });
  }
}
