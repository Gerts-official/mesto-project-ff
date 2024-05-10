// ========================================================================================== HEADER ZONE START
// Import CSS
/**
 * Imports the main CSS file for the project.
 */
import './pages/index.css';

// Import card.js
/**
 * Imports the necessary functions from the `card.js` module for handling card operations.
 * @module card
 */
import { deleteCard, likeCard, createCard, hideDeleteButton } from './scripts/card.js';

// Import modal.js
/**
 * Imports the necessary functions from the `modal.js` module for handling modals.
 * @module modal
 */
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';

// Import validation.js
/**
 * Imports the necessary functions from the `validation.js` module for handling form validation.
 * @module validation
 */
import { enableValidation, clearValidation } from './scripts/validation.js';

// Import api.js
/**
 * Imports the necessary functions from the `api.js` module for handling API requests.
 * @module api
 */
import { getUserData, getInitialCardsToLoad, patchChangedProfileData, postNewCard } from './scripts/api.js';

// *** VALIDATION CONFIG ***
/**
 * Configuration object for form validation.
 * @type {Object}
 * @property {string} formSelector - CSS selector for form elements.
 * @property {string} inputSelector - CSS selector for input elements.
 * @property {string} submitButtonSelector - CSS selector for submit button elements.
 * @property {string} inactiveButtonClass - CSS class for disabled submit buttons.
 * @property {string} inputErrorClass - CSS class for input elements with errors.
 * @property {string} errorClass - CSS class for visible error messages.
 */
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// DOM nodes
/**
 * DOM node for the "New Card" form.
 * @type {HTMLElement}
 */
const formNewCard = document.querySelector('.popup_type_new-card');


/**
 * DOM node for the card list container.
 * @type {HTMLElement}
 */
const cardList = document.querySelector('.places__list');


/**
 * DOM node for the "Edit Profile" form.
 * @type {HTMLElement}
 */
const formEditProfile = document.querySelector('.popup_type_edit');


/**
 * DOM node for the profile name element.
 * @type {HTMLElement}
 */
const profileName = document.querySelector('.profile__title');

/**
 * DOM node for the profile job element.
 * @type {HTMLElement}
 */
const profileJob = document.querySelector('.profile__description');

/**
 * DOM node for the profile image element.
 * @type {HTMLElement}
 */
const profileImage = document.querySelector('.profile__image');

/**
 * DOM node for the "Confirm Delete Card" form.
 * @type {HTMLElement}
 */
const confirmDeleteCardForm = document.querySelector('.popup_type_delete');

/**
 * DOM node for the submit button in the "Confirm Delete Card" form.
 * @type {HTMLElement}
 */
const deleteSubmitButton = confirmDeleteCardForm.querySelector('.popup__button')

/**
 * DOM node for the "Name" input field in the "Edit Profile" form.
 * @type {HTMLElement}
 */
const inputEditProfileName = formEditProfile.querySelector('.popup__input_type_name');

/**
 * DOM node for the "Job" input field in the "Edit Profile" form.
 * @type {HTMLElement}
 */
const inputEditProfileJob = formEditProfile.querySelector('.popup__input_type_description');

/**
 * DOM node for the "Card Name" input field in the "New Card" form.
 * @type {HTMLElement}
 */
const inputNewCardName = formNewCard.querySelector('.popup__input_type_card-name');

/**
 * DOM node for the "Card Link" input field in the "New Card" form.
 * @type {HTMLElement}
 */
const inputNewCardLink = formNewCard.querySelector('.popup__input_type_url');

// ========================================================================================== MAIN ZONE START
// Handler function for opening the profile editing form
/**
 * Opens the "Edit Profile" form and populates the input fields with the current profile data.
 * Clears any previous validation errors.
 */
function openEditProfilePopup() {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
    clearValidation(formEditProfile, validationConfig);
}

// Handler function for editing the profile
/**
 * Handles the submission of the "Edit Profile" form.
 * Updates the profile data on the server and updates the UI with the new data.
 * @param {Event} evt - The submit event object.
 */
async function submitEditProfileButton(evt) {
    evt.preventDefault();

    const submitButton = evt.currentTarget.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const newName = inputEditProfileName.value;
    const newAbout = inputEditProfileJob.value;

    try {
        await patchChangedProfileData(newName, newAbout);
        profileName.textContent = newName;
        profileJob.textContent = newAbout;
        closePopup(formEditProfile);
        deactivateClosingEventListeners();
    } catch (error) {
        console.error('Failed to update profile:', error);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}

// Handler function for opening an image popup by click
/**
 * Opens the image popup and displays the selected image and its caption.
 * @param {HTMLElement} name - The name element of the selected card.
 * @param {HTMLElement} link - The image element of the selected card.
 */
function openScalePopup(name, link) {
    const popup = document.querySelector('.popup_type_image');
    popup.classList.add('popup_is-opened');
    const popupImageLink = popup.querySelector('.popup__image');
    const popupImageCaption = popup.querySelector('.popup__caption');

    popupImageLink.src = link.src;
    popupImageCaption.textContent = name.textContent;

    activateClosingEventListeners();
}

// Function to create a new card - SUBMIT
/**
 * Handles the submission of the "New Card" form.
 * Creates a new card on the server and adds it to the UI.
 * @param {Event} evt - The submit event object.
 */
async function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const newCardName = inputNewCardName.value;
    const newCardLink = inputNewCardLink.value;

    const submitButton = evt.currentTarget.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    try {
        let newCardData = await postNewCard(newCardName, newCardLink);
        newCardData.likes = newCardData.likes || [];

        const newCardElement = createCard(newCardData, deleteCard, likeCard, openScalePopup);
        cardList.prepend(newCardElement);
        
        closePopup(formNewCard);
        inputNewCardLink.value = '';
        inputNewCardName.value = '';
        deactivateClosingEventListeners();
        

    } catch (error) {
        console.error('Failed to add card:', error);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}

/**
 * Fetches the user data and initial cards from the server.
 * Renders the user profile and initial cards on the page.
 */
Promise.all([getUserData(), getInitialCardsToLoad()])
    .then(results => {
        const profileData = results[0];
        const cardsData = results[1];

        const profileID = profileData._id;

        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileImage.style.backgroundImage = `url('${profileData.avatar}')`;

        cardsData.forEach(newCardData => {
            const card = createCard(newCardData, deleteCard, likeCard, openScalePopup, profileData);
            cardList.append(card);
            hideDeleteButton(card, newCardData, profileID);
        });
    });

// Function to open the form for adding a new card
/**
 * Opens the "New Card" form and clears any previous input values.
 * Clears any previous validation errors.
 */
function openAddNewCardPopup() {
    inputNewCardLink.value = '';
    inputNewCardName.value = '';

    openPopup(formNewCard);
    clearValidation(formNewCard, validationConfig);
}

// ================================================================================ EVENT LISTENERS SECTION START
// Handler for opening the profile editing form
/**
 * Event listener for the "Edit Profile" button.
 * Calls the `openEditProfilePopup` function when clicked.
 */
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

// Handler for the SUBMIT button in the profile editing form
/**
 * Event listener for the submit event on the "Edit Profile" form.
 * Calls the `submitEditProfileButton` function when the form is submitted.
 */
formEditProfile.addEventListener('submit', submitEditProfileButton);

// Handler for opening the form for adding a new card
/**
 * Event listener for the "Add Card" button.
 * Calls the `openAddNewCardPopup` function when clicked.
 */
document.querySelector('.profile__add-button').addEventListener('click', openAddNewCardPopup);

// Handler for creating a new card, SUBMIT button
/**
 * Event listener for the submit event on the "New Card" form.
 * Calls the `handleNewCardSubmit` function when the form is submitted.
 */
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Deactivate all closing event listeners attached to the document
/**
 * Deactivates all closing event listeners attached to the document.
 */
deactivateClosingEventListeners();

// Activate validation for all the forms
/**
 * Enables form validation for all forms on the page using the provided configuration.
 */
enableValidation(validationConfig);