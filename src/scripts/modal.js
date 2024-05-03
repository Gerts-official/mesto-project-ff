// Import validation.js
import {enableValidation} from './validation';

// DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');



// Функция-обработчик открытия модального окна 
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    activateClosingEventListeners();
    enableValidation();
};


// Функция-обработчик закрытия модального окна 
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    deactivateClosingEventListeners();
    
}


// Функция-обработчик клика по кнопке закрытия попапа
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Функция-обработчик нажатия клавиши Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Функция-обработчик закрытия по клику на оверлей
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')){
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Функция активации группы слушателей 
export function activateClosingEventListeners() {
    document.addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose); 
    document.addEventListener('click', handleOverlayClose); 
}


// Функция деактивации группы слушателей 
export function deactivateClosingEventListeners() {
    document.removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose); 
    document.removeEventListener('click', handleOverlayClose); 
}