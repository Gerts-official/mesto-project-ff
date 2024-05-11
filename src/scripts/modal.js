// DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardAddButton = document.querySelector('.profile__add-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

// Opens the specified popup and activates the closing event listeners
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    activateClosingEventListeners();
}

// Closes the specified popup and deactivates the closing event listeners.
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    deactivateClosingEventListeners();
}

// Handles the click event on the close button of a popup.
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Handles the keydown event for the Escape key
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Handles the click event on the overlay of a popup
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Activates the closing event listeners for popups
export function activateClosingEventListeners() {
    document.addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
}

// Deactivates the closing event listeners for popups
export function deactivateClosingEventListeners() {
    document.removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
}