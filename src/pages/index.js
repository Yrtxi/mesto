//Импорт
import { initialCards } from "../components/data.js";
import { Card } from "../components/Card.js";
import { config, FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//Импорт стилей
import "./index.css";

//Переменные кнопок добавления и редактирования профайла
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");

//Переменные полей ввода формы
const nameInput = document.querySelector(".popup__input_data_name");
const jobInput = document.querySelector(".popup__input_data_job");

//Функция создания новой карточки
const greateNewCard = (data) => {
  const card = new Card(data, ".element-template", () => handleCardClick(data));
  const cardElement = card.generateCard();
  return cardElement;
};

//Создаем экземпляр класса Section, отвечающевого за отрисовку элементов
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(greateNewCard(item));
    },
  },
  ".elements"
);

//отрисовываем карточки
cardsList.renderItems();

//Cоздаем экземпляры класса FormValidator
const validEdit = new FormValidator(config, document.forms.form_type_edit);
const validAdd = new FormValidator(config, document.forms.form_type_add);

//Включаем валидацию
validEdit.enableValidation();
validAdd.enableValidation();

//создаем экземпляр класса с информцией о пользователе
const user = new UserInfo({
  nameUserSelector: ".profile__name",
  infoUserSelector: ".profile__job",
});

//Cоздаем экземляры классов попапов
const editTypePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: ({ name, job }) => {
    user.setUserInfo({ name, job });
    editTypePopup.close();
  },
});

const addTypePopup = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: ({ place, link }) => {
    const nameCard = place;
    const linkCard = link;
    cardsList.addItem(greateNewCard({ nameCard, linkCard }));
    addTypePopup.close();
  },
});

const imgTypePopup = new PopupWithImage(".popup_type_image");

//Функция открывающая полноразмерную картинку
const handleCardClick = (data) => {
  imgTypePopup.open(data);
};

//Устанавливаем обработчики для попапов
editTypePopup.setEventListeners();
addTypePopup.setEventListeners();
imgTypePopup.setEventListeners();

//Устанавливаем обработчики
editButtonProfile.addEventListener("click", function () {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
  user.setUserInfo(user.getUserInfo());
  validEdit.resetValidation();
  editTypePopup.open();
});

addButtonProfile.addEventListener("click", function () {
  validAdd.resetValidation();
  addTypePopup.open();
});
