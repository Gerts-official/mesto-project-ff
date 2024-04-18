// Import CSS
import '../pages/index.css';
// Import cards.js
import { initialCards } from '../scripts/cards.js';
// Import modal.js
import { openModalWindow, closePopUp } from '../scripts/modal.js';
  

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popups = [document.querySelectorAll('.popup')];
const popupsOpenButtons = [document.querySelector('.profile__edit-button'), document.querySelector('.profile__add-button')];


// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// Функция отображения шести карточек при загрузке страницы
initialCards.forEach(function(item) {
    const card = createCard(item, deleteCard);
    cardList.append(card);
});


// Обработчики отправки форм

// Функция-обработчик события открытия модального окна для редактирования профиля

function openPopup(evt){
    const popup = evt.target.parentNode;
    if(popup.classList.contains('profile__info')) {
        document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
        } else if(popup.classList.contains('page__section')) {
            document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
            } else {
                console.error('Ошибка в функции openPopup');
            }
    }
    // popup.classList.add('popup_is-opened');

popupsOpenButtons.forEach((item) => {
    item.addEventListener('click', openPopup);
    console.log(item);
});


// Функция открытия модального окна изображения карточки

