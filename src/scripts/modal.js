// DOM
/**
 * DOM node for the "Edit Profile" button.
 * @type {HTMLElement}
 */
const profileEditButton = document.querySelector('.profile__edit-button');

/**
 * DOM node for the "Add Card" button.
 * @type {HTMLElement}
 */
const newCardAddButton = document.querySelector('.profile__add-button');

/**
 * DOM node for the "Edit Profile" popup.
 * @type {HTMLElement}
 */
const profileEditPopup = document.querySelector('.popup_type_edit');

/**
 * DOM node for the "New Card" popup.
 * @type {HTMLElement}
 */
const newCardPopup = document.querySelector('.popup_type_new-card');

// Hande-function to open popup.
/**
 * Opens the specified popup and activates the closing event listeners.
 * @param {HTMLElement} popupElement - The popup element to open.
 */
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    activateClosingEventListeners();
}

// Hande-function to close popup.
/**
 * Closes the specified popup and deactivates the closing event listeners.
 * @param {HTMLElement} popupElement - The popup element to close.
 */
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    deactivateClosingEventListeners();
}

// Handle-function closing with the close-button.
/**
 * Handles the click event on the close button of a popup.
 * Closes the currently opened popup.
 * @param {Event} evt - The click event object.
 */
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Handle-function closing with the Esc button
/**
 * Handles the keydown event for the Escape key.
 * Closes the currently opened popup.
 * @param {Event} evt - The keydown event object.
 */
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Handle-function for closing on overlay click.
/**
 * Handles the click event on the overlay of a popup.
 * Closes the currently opened popup.
 * @param {Event} evt - The click event object.
 */
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// Activate group of listeneres function.
/**
 * Activates the closing event listeners for popups.
 * Adds event listeners for close button click, Escape key press, and overlay click.
 */
export function activateClosingEventListeners() {
    document.addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
}

// Deactivate group of listeneres function.
/**
 * Deactivates the closing event listeners for popups.
 * Removes event listeners for close button click, Escape key press, and overlay click.
 */
export function deactivateClosingEventListeners() {
    document.removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
}