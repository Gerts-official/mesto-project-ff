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

// Функция-обработчик события открытия модального окна для редактирования профиля и добавления карточки
openPupupButtons.forEach((button) => {
    button.addEventListener('click', handlePopupButtonClick);
});

// Функция редактирования профайла 

const formElement = document.querySelector('.popup_type_edit');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    closePopup();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    nameInput.value = '';
    jobInput.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


// Функция открытия модального окна изображения карточки

// Обработчики отправки форм