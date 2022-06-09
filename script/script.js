let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_data_name');
let jobInput = formElement.querySelector('.popup__input_data_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup()
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



