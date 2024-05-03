// Import CSS
import './pages/index.css';
// Import cards.js
import { initialCards } from './scripts/cards.js';
// Import card.js
import { deleteCard, likeCard, createCard } from './scripts/card.js';
// Import modal.js
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';



// DOM узлы
const formNewCard = document.querySelector('.popup_type_new-card');
const cardList =  document.querySelector('.places__list');

const formEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const inputEditProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileJob = formEditProfile.querySelector('.popup__input_type_description');



// Функция-обработчик открытия формы редактирования профайла
function openEditProfilePopup(){

    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
}


// Функция - обработчик редактирования профайла
function handleFormSubmit(evt) {
    evt.preventDefault(); 
        
    profileName.textContent = inputEditProfileName.value;
    profileJob.textContent = inputEditProfileJob.value;

    closePopup(formEditProfile);
    deactivateClosingEventListeners();
}


// Функция-обработчик увеличения изображения по клику
function openScalePopup(name, link) {
    const popup = document.querySelector('.popup_type_image');
    popup.classList.add('popup_is-opened');
    const popupImageLink = popup.querySelector('.popup__image');
    const popupImageCaption = popup.querySelector('.popup__caption');

    popupImageLink.src = link.src;
    popupImageCaption.textContent = name.textContent;

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
  
    const newCardElement = createCard(newCardData, deleteCard, likeCard, openScalePopup);
    cardList.prepend(newCardElement);
    formInputLink.value = '';
    formInputName.value = '';

    closePopup(formNewCard);
    deactivateClosingEventListeners();
}


// Функция создания шести карточек при загрузке страницы
initialCards.forEach(function(item) {
    const cardList =  document.querySelector('.places__list');
    const card = createCard(item, deleteCard, likeCard, openScalePopup );
    cardList.append(card);
});


// Функция открытия формы добавления новой карты
function openAddNewCardPopup(){
    openPopup(formNewCard);
}


// <<<<<< EVENT LISTENERS SECTION >>>>>>
// Обработчик открытия формы редакитрования профайла 
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

// Обработчик кнопки SUBMIT в форме редактирования профиля
formEditProfile.addEventListener('submit', handleFormSubmit);


// Обработчик открытия формы добавления новой карты
document.querySelector('.profile__add-button').addEventListener('click', openAddNewCardPopup);


// Обработчик создания новой карты, кнопка SUBMIT
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Деактивируем все слушатели закрытия, повешанные на документе 
deactivateClosingEventListeners();




