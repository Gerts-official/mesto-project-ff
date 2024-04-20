// Import CSS
import '../pages/index.css';
// Import cards.js
import { initialCards, deleteCard, likeFunction } from '../scripts/cards.js';
// Import modal.js
import { handlePopupButtonClick, closePopup } from '../scripts/modal.js';

// DOM узлы
const cardTemplate = document.querySelector('#card-template').content; 
const cardList =  document.querySelector('.places__list');
const formNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.querySelector('.popup_type_edit');



// Функция создания карточек
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

// Функция создания шести карточек при загрузке страницы
initialCards.forEach(function(item) {
    const card = createCard(item, deleteCard);
    cardList.append(card);
});

// Функция - обработчик редактирования профайла
function handleFormSubmit(evt) {
    const profileInputName = formEditProfile.querySelector('.popup__input_type_name');
    const profileInputJub = formEditProfile.querySelector('.popup__input_type_description');
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');

    evt.preventDefault(); 
    closePopup();
    profileName.textContent = profileInputName.value;
    profileJob.textContent = profileInputJub.value;
    profileInputName.value = '';
    profileInputJub.value = '';
}

// Функция создания карточки
function handleNewCardSubmit(evt) { 
    evt.preventDefault();
    let formInputLink = formNewCard.querySelector('.popup__input_type_url');
    let formInputName = formNewCard.querySelector('.popup__input_type_card-name');
  
    const newCardData = {
        link: formInputLink.value,
        name: formInputName.value
    }
  
    const newCardElement = createCard(newCardData, deleteCard);
    cardList.prepend(newCardElement);
    closePopup();
    formInputLink.value = '';
    formInputName.value = '';
    formNewCard.removeEventListener('submit', handleNewCardSubmit);
  }


// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit);

// Обработчик лайка 
cardList.addEventListener('click', likeFunction);

// Обработчик создания новой карты, кнопка SUBMIT
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Обработчик открытия модальных окон
document.querySelector('.page__content').addEventListener('click', handlePopupButtonClick);
