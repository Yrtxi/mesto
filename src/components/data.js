const placeOne = new URL("../images/element-elbrus.jpg", import.meta.url);
const placeTwo = new URL("../images/element-kamchatka.jpg", import.meta.url);
const placeThree = new URL("../images/element-ivanovo.jpg", import.meta.url);
const placeFour = new URL("../images/element-karelia.jpg", import.meta.url);
const placeFive = new URL("../images/element-kosa.jpg", import.meta.url);
const placeSix = new URL("../images/element-sochi.jpg", import.meta.url);

//Массив с исходными значениями карточек
export const initialCards = [
  {
    nameCard: "Эльбрус",
    linkCard: placeOne,
  },
  {
    nameCard: "Камчатка",
    linkCard: placeTwo,
  },
  {
    nameCard: "Иваново",
    linkCard: placeThree,
  },
  {
    nameCard: "Карелия",
    linkCard: placeFour,
  },
  {
    nameCard: "Куршская коса",
    linkCard: placeFive,
  },
  {
    nameCard: "Сочи",
    linkCard: placeSix,
  },
];
