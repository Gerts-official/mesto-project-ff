// Import validation.js
import {enableValidation} from './validation';

// DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');



// Hande-function to open popup. 
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    activateClosingEventListeners();
    enableValidation();
};


//Hande-function to close popup.
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    deactivateClosingEventListeners();
    
}


//  Handle-function closing with the close-button.
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Handle-function closing with the Esc button
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Handle-function for closing on overlay click.
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')){
        closePopup(document.querySelector('.popup_is-opened'));
    }
}


// Activate group of listeneres function. 
export function activateClosingEventListeners() {
    document.addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose); 
    document.addEventListener('click', handleOverlayClose); 
}


// Deactivate group of listeneres function. 
export function deactivateClosingEventListeners() {
    document.removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose); 
    document.removeEventListener('click', handleOverlayClose); 
}