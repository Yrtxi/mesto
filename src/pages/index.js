//Импорт
import { Card } from "../components/Card.js";
import { config, FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithApprove } from "../components/PopupWithApprove.js";
import { UserInfo } from "../components/UserInfo.js";
import { options, Api } from "../components/Api.js";

//Импорт стилей
import "./index.css";

//Переменные кнопок добавления и редактирования профайла
const editButtonProfile = document.querySelector(".profile__edit-button");
const addButtonProfile = document.querySelector(".profile__add-button");
const changeAvatarButtonProfile = document.querySelector(
  ".profile__change-button"
);

//Переменные полей ввода формы
const nameInput = document.querySelector(".popup__input_data_name");
const jobInput = document.querySelector(".popup__input_data_job");
const avatarInput = document.querySelector(".popup__input_data_avatar");

//Cоздаем экземпляры класса FormValidator
const validEdit = new FormValidator(config, document.forms.form_type_edit);
const validAdd = new FormValidator(config, document.forms.form_type_add);
const validAvatar = new FormValidator(config, document.forms.form_type_avatar);

//Включаем валидацию
validEdit.enableValidation();
validAdd.enableValidation();
validAvatar.enableValidation();

//Создаем экземпляр класса Api
const api = new Api(options);

//Переменная с id (потом перезапишем из промиса)
let myId = null;

//Функция создания новой карточки
const generateNewCard = (data) => {
  const card = new Card(
    {
      data: data,
      cardSelector:
        data.owner._id === myId
          ? ".element-template"
          : ".element-template_type_notrash",
    },
    myId,
    () => handleLikeClick(data, cardElement),
    () => handleCardClick(data),
    () => handleDelClick(data, cardElement)
  );
  const cardElement = card.generateCard();
  return cardElement;
};

//Создаем экземпляр класса Section, отвечающевого за отрисовку элементов
const cardsList = new Section({
  renderer: (item) => {
    cardsList.addItemAppend(generateNewCard(item));
  },
  containerSelector: ".elements",
});

//создаем экземпляр класса с информцией о пользователе
const user = new UserInfo({
  nameUserSelector: ".profile__name",
  infoUserSelector: ".profile__job",
  avatarUserSelector: ".profile__avatar",
});

//в Promise.all передаем массив промисов которые нужно выполнить
Promise.all([api.getInfoUser(), api.getInitialCards()])
  .then(([userData, cardsArray]) => {
    //oпределяем id пользователя
    myId = userData._id;
    //Вставляем данные пользователя в разметку
    user.setUserInfo(userData);
    //отрисовываем карточки
    cardsList.renderItems(cardsArray);
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));

//Cоздаем экземляры классов попапов
const editTypePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: ({ name, job }) => {
    renderLoading(true, document.forms.form_type_edit, "Сохранить");
    api
      .editInfoUser({ name: name, about: job })
      .then((data) => {
        user.setUserInfo({
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
        editTypePopup.close();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
      .finally(() =>
        renderLoading(false, document.forms.form_type_edit, "Cохранить")
      );
  },
});

const addTypePopup = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: ({ place, link }) => {
    renderLoading(true, document.forms.form_type_add, "Создать");
    api
      .addNewCard({ name: place, link: link })
      .then((data) => {
        cardsList.addItemPrepend(generateNewCard(data));
        addTypePopup.close();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
      .finally(() =>
        renderLoading(false, document.forms.form_type_add, "Cоздать")
      );
  },
});

const imgTypePopup = new PopupWithImage(".popup_type_image");

const avatarTypePopup = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (avatar) => {
    renderLoading(true, document.forms.form_type_avatar, "Сохранить");
    api
      .changeAvatar(avatar)
      .then((userData) => {
        user.setUserInfo(userData);
        avatarTypePopup.close();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
      .finally(() =>
        renderLoading(false, document.forms.form_type_avatar, "Cохранить")
      );
  },
});

const delTypePopup = new PopupWithApprove({
  popupSelector: ".popup_type_approve",
  handleButtonSubmit: (data, cardElement) => {
    api
      .deleteCard(data._id)
      .then(() => {
        cardElement.remove();
        cardElement = null;
        delTypePopup.close();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  },
});

//Функция открывающая полноразмерную картинку
const handleCardClick = (data) => {
  imgTypePopup.open(data);
};

//Функция открывающая попап подтверждения удаления
const handleDelClick = (data, cardElement) => {
  delTypePopup.open(data, cardElement);
};

//Функция переключения лайка
const handleLikeClick = (data, card) => {
  const likeButton = card.querySelector(".element__like-button");
  const countLike = card.querySelector(".element__like-count");
  const likeStatus = likeButton.classList.contains(
    "element__like-button_active"
  );
  api
    .setLike(data._id, likeStatus)
    .then((data) => {
      likeButton.classList.toggle("element__like-button_active");
      data.likes.length > 0
        ? (countLike.textContent = data.likes.length)
        : (countLike.textContent = " ");
    })
    .catch((err) => console.log(err));
};

//Функция ожидания загрузки
const renderLoading = (isLoading, popupForm, message) => {
  const popupButton = popupForm.querySelector(".popup__button");
  isLoading
    ? (popupButton.textContent = "Сохранение...")
    : (popupButton.textContent = message);
};

//Устанавливаем обработчики для попапов
editTypePopup.setEventListeners();
addTypePopup.setEventListeners();
imgTypePopup.setEventListeners();
delTypePopup.setEventListeners();
avatarTypePopup.setEventListeners();

//Устанавливаем обработчики
editButtonProfile.addEventListener("click", function () {
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().about;
  validEdit.resetValidation();
  editTypePopup.open();
});

addButtonProfile.addEventListener("click", function () {
  validAdd.resetValidation();
  addTypePopup.open();
});

changeAvatarButtonProfile.addEventListener("click", function () {
  avatarInput.value = user.getUserInfo().avatar;
  validAvatar.resetValidation();
  avatarTypePopup.open();
});
