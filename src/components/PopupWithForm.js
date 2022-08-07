import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._formSubmit = this._formSubmit.bind(this);
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  //Cобираем значения инпутов формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //Метод отправки формы
  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  //Устанавливаем слушатели
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._formSubmit);
  }

  //Сбрасываем форму при закрытии
  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._formSubmit);
    this._popupForm.reset();
  }
}


