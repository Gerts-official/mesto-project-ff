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
const formNewCard = document.querySelector('.popup_type_new-card');

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

const formEditProfile = document.querySelector('.popup_type_edit');
// Находим поля формы в DOM
const profileInputName = formEditProfile.querySelector('.popup__input_type_name');
const profileInputJub = formEditProfile.querySelector('.popup__input_type_description');
const profileInputLink = formEditProfile.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    closePopup();
    profileName.textContent = profileInputName.value;
    profileJob.textContent = profileInputJub.value;
    profileImage.style.backgroundImage = `url(${profileInputLink.value})`;

    profileInputName.value = '';
    profileInputJub.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit);



// Раздел создания новой карточки

// DOM
// DOM
function cardLike() {
    let likes = document.querySelectorAll('.card__like-button');
    likes.forEach((item) => {
        item.addEventListener('click', likeFunction);
    });
}

// Like Function Evt
function likeFunction(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
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
    cardLike();
  }



formNewCard.addEventListener('submit', handleNewCardSubmit);



// Функция изменения картинки профайла 





cardLike();









// Функция открытия модального окна изображения карточки

// Обработчики отправки форм


