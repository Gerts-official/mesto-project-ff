// Import CSS
import '../pages/index.css';
// Import cards.js
import { initialCards, deleteCard } from '../scripts/cards.js';
// Import modal.js
import { handlePopupButtonClick, closePopup } from '../scripts/modal.js';
  
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popups = [document.querySelectorAll('.popup')];
const openPupupButtons = document.querySelectorAll('.profile__edit-button, .profile__add-button');


// @todo: Функция создания карточек
function createCard(item, deleteCardCallback) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = 'На картинке изображено: ' + item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement);
    });

    return cardElement;
}



// Функция отображения шести карточек при загрузке страницы
initialCards.forEach(function(item) {
    const card = createCard(item, deleteCard);
    cardList.append(card);
});


// Обработчики отправки форм

// Функция-обработчик события открытия модального окна для редактирования профиля и добавления карточки

openPupupButtons.forEach((button) => {
    button.addEventListener('click', handlePopupButtonClick);
});


// Функция открытия модального окна изображения карточки

