// Import CSS
import '../pages/index.css';
// Import cards.js
import { initialCards, deleteCard } from '../scripts/cards.js';
// Import modal.js
import { handlePopupButtonClick, closePopup, activateClosingEventListeners } from '../scripts/modal.js';
  
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
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    closePopup();
    profileName.textContent = profileInputName.value;
    profileJob.textContent = profileInputJub.value;
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
    let cards = document.querySelectorAll('.card');
    cards.forEach((item) => {
        item.querySelector('.card__like-button').addEventListener('click', likeFunction);
        item.querySelector('.card__image').addEventListener('click', cardScale);
    });
}

// Like Function Evt
function likeFunction(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function cardScale(evt) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageLink = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');
    const currentCard = evt.target.parentNode;

    const currentCardLink = currentCard.querySelector('.card__image').src;
    const currentCardCaption = currentCard.querySelector('.card__title').textContent;

    popupImageLink.src = currentCardLink;
    popupImageCaption.textContent = currentCardCaption;
    popupImage.classList.add('popup_is-opened');
    activateClosingEventListeners();
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




cardLike();


// Массив карточек, отображаемых при загрузки страницы
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// Функция удаления и лайка карточки 
export function deleteCard(cardElement) {
  cardElement.remove();
}



// Функция открытия модального окна 
function openPopup(popupType) {
    const popup = document.querySelector(`.popup_type_${popupType}`);
    popup.classList.add('popup_is-opened');


    // Активируем все слушатели по закрытию
    activateClosingEventListeners();
}

// Функция закрытия модального окна 
 export function closePopup() {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');


    // Снимаем все слушатели по закрытию
    document.querySelector('.page__content').removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
}

// Функция-обработчик нажатия клавиши Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

// Функция-обработчик закрытия по клику на оверлей
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
}


// Функция-обработчик клика по кнопке закрытия попапа
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup();
    }
}

// Функция-обработчик открытия попапа по клику
export function handlePopupButtonClick(evt) {
    const targetButton = evt.target;
    if (targetButton.classList.contains('profile__edit-button')) {
        openPopup('edit');
    } else if (targetButton.classList.contains('profile__add-button')) {
        openPopup('new-card');
    }
}


export function activateClosingEventListeners() {
    document.querySelector('.page__content').addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
}













