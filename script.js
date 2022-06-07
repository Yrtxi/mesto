let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let Popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_job');
let Name = document.querySelector('.profile__name');
let Job = document.querySelector('.profile__job');

function OpenPopup () {
  Popup.classList.add('popup_opened');
}

function ClosePopup () {
  Popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', OpenPopup);
closeButton.addEventListener('click', ClosePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.value;
  jobInput.value;
  Name.textContent = nameInput.value;
  Job.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', ClosePopup);


