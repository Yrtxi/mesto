//Переменные кнопок добавления и редактирования профайла
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");

//Переменные полей профайла
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

//Переменные попапа редактирования
let editPopup = document.querySelector(".popup_type_edit");
let formEditPopup = document.querySelector(".popup__form_type_edit");
let nameInput = formEditPopup.querySelector(".popup__input_data_name");
let jobInput = formEditPopup.querySelector(".popup__input_data_job");

//Переменные попапа добавления
let addPopup = document.querySelector(".popup_type_add");
let formAddPopup = document.querySelector(".popup__form_type_add");
let placeInput = formAddPopup.querySelector(".popup__input_data_place");
let linkInput = formAddPopup.querySelector(".popup__input_data_link");

//Переменные попапа-картинки
let imgPopup = document.querySelector(".popup_type_image");
let urlPopup = document.querySelector(".popup__image");
let subtitlePopup = document.querySelector(".popup__subtitle");

//Переменная кнопок закрытия попапов
let closeButton = document.querySelectorAll(".popup__close-button");

//Массив с исходными значениями карточек
const initialCards = [
  {
    nameCard: "Эльбрус",
    linkCard: "./images/element-elbrus.jpg",
  },
  {
    nameCard: "Камчатка",
    linkCard: "./images/element-kamchatka.jpg",
  },
  {
    nameCard: "Иваново",
    linkCard: "./images/element-ivanovo.jpg",
  },
  {
    nameCard: "Карелия",
    linkCard: "./images/element-karelia.jpg",
  },
  {
    nameCard: "Куршская коса",
    linkCard: "./images/element-kosa.jpg",
  },
  {
    nameCard: "Сочи",
    linkCard: "./images/element-sochi.jpg",
  },
];

//Берем темплейт с заготовкой карточки
let cardTemplate = document.querySelector(".element-template").content;
let cardContainer = document.querySelector(".elements");

//функция отрисовки карточкм
function renderCard({ nameCard, linkCard }) {
  let card = cardTemplate.querySelector(".element").cloneNode(true);
  card.querySelector(".element__title").textContent = nameCard;
  card.querySelector(".element__image").src = linkCard;
  cardContainer.prepend(card);
  //фунция активации лайка (переключением классов)
  function activeLike() {
    let likeCard = card.querySelector(".element__like-button");
    likeCard.classList.toggle("element__like-button_active");
  }
  card
    .querySelector(".element__delete-button")
    .addEventListener("click", function () {
      deleteCard(card);
    });
  card
    .querySelector(".element__like-button")
    .addEventListener("click", function () {
      activeLike();
    });
  card.querySelector(".element__image").addEventListener("click", function () {
    openImage({ nameCard, linkCard });
  });
}

//функция отрисовки карточек со значениями из массива
function render() {
  initialCards.forEach(renderCard);
}

//отрисовываем
render();

function deleteCard(card) {
  card.remove();
}

//функция создания новой карточки ("отправка формы" попапа добавления)
function createCard(evt) {
  evt.preventDefault();
  let nameCard = placeInput.value;
  let linkCard = linkInput.value;
  renderCard({ nameCard, linkCard });
  closePopup(addPopup);
}

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

//фунция "отправки формы" попапа редактирования
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

//функция "вставить нужную картинку" при открытии попапа-картинки
function openImage({ nameCard, linkCard }) {
  urlPopup.src = linkCard;
  subtitlePopup.textContent = nameCard;
  openPopup(imgPopup);
}

editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", function () {
  placeInput.value = null;
  linkInput.value = null;
  openPopup(addPopup);
});

closeButton.forEach((elem) => {
  elem.addEventListener("click", () => {
    closePopup(editPopup);
    closePopup(addPopup);
    closePopup(imgPopup);
  });
});

formEditPopup.addEventListener("submit", formSubmitHandler);
formAddPopup.addEventListener("submit", createCard);
