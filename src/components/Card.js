export class Card {
  constructor(
    { data, cardSelector },
    myId,
    handleLikeClick,
    handleCardClick,
    handleDelClick
  ) {
    this._nameCard = data.name;
    this._linkCard = data.link;
    this._countLikesCard = data.likes;
    this._likeStatus = data.likes.some((i) => i._id === myId);
    this._cardSelector = cardSelector;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
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
    this._countLike = this._element.querySelector(".element__like-count");

    this._setEventListeners();
    this._setLike();

    this._element.querySelector(".element__title").textContent = this._nameCard;
    this._elementImage.src = this._linkCard;
    this._elementImage.alt = this._nameCard;

    if (this._countLikesCard.length > 0) {
      this._countLike.textContent = this._countLikesCard.length;
    }

    return this._element;
  }

  //Метод установки первоначального значения лайка
  _setLike() {
    if (this._likeStatus) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  //Метод удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //Добавляем слушатели
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDelClick();
      });
    }

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
