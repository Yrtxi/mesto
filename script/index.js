//Импорт
import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { config, FormValidator } from "./FormValidator.js";

//Переменные кнопок добавления и редактирования профайла
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");

//Переменные полей профайла
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Переменные попапа редактирования
const editPopup = document.querySelector(".popup_type_edit");
const formEditPopup = document.querySelector(".popup__form_type_edit");
const nameInput = formEditPopup.querySelector(".popup__input_data_name");
const jobInput = formEditPopup.querySelector(".popup__input_data_job");

//Переменные попапа добавления
const addPopup = document.querySelector(".popup_type_add");
const formAddPopup = document.querySelector(".popup__form_type_add");
const placeInput = formAddPopup.querySelector(".popup__input_data_place");
const linkInput = formAddPopup.querySelector(".popup__input_data_link");

//Переменные попапа картинки
const imgTypePopup = document.querySelector(".popup_type_image");
const imgPopup = document.querySelector(".popup__image");
const imgPopupSubtitle = document.querySelector(".popup__subtitle");

//Переменная кнопок закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close-button");

//Переменная контейнера для карточек
const cardContainer = document.querySelector(".elements");

//функция отрисовки карточки в нужном месте
function renderCard(item) {
  const card = new Card(
    item,
    ".element-template",
    imgTypePopup,
    imgPopup,
    imgPopupSubtitle,
    openPopup
  );
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
}

//функция отрисовки карточек из массива
function render() {
  initialCards.forEach(renderCard);
}

//отрисовываем
render();

//Cоздаем экземпляры класса FormValidator
const validEdit = new FormValidator(config, document.forms.form_type_edit);
const validAdd = new FormValidator(config, document.forms.form_type_add);

//Включаем валидацию
validEdit.enableValidation();
validAdd.enableValidation();

//функция добавления новой карточки ("отправка формы" попапа добавления)
function addCard(evt) {
  evt.preventDefault();
  const nameCard = placeInput.value;
  const linkCard = linkInput.value;
  renderCard({ nameCard, linkCard });
  evt.target.reset();
  closePopup(addPopup);
}

//фунция "отправки формы" попапа редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

//функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
  popupElement.addEventListener("mousedown", closeOnCLick);
}

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
  popupElement.removeEventListener("mousedown", closeOnCLick);
}

//Функция закрытия попапа на ESC
function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

//Функция закрытия по клику
function closeOnCLick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

//Устанавливаем обработчики
editButtonProfile.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validEdit.resetValidation();
  openPopup(editPopup);
});

addButtonProfile.addEventListener("click", function () {
  validAdd.resetValidation();
  openPopup(addPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

formEditPopup.addEventListener("submit", handleProfileFormSubmit);
formAddPopup.addEventListener("submit", addCard);
