// Import CSS
import './pages/index.css';
// Import cards.js
import { initialCards } from './scripts/cards.js';
// Import card.js
import { deleteCard, likeCard, createCard } from './scripts/card.js';
// Import modal.js
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';
// Import validation.js
import {enableValidation, hideInputError} from './scripts/validation.js';

// *** VALIDATION CONFIG ***
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
// ***

// DOM nodes
const formNewCard = document.querySelector('.popup_type_new-card');
const cardList =  document.querySelector('.places__list');

const formEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const inputEditProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileJob = formEditProfile.querySelector('.popup__input_type_description');



// Handler function for opening the profile editing form
function openEditProfilePopup(){

    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
}


// Handler function for editing the profile
function handleFormSubmit(evt) {
    evt.preventDefault(); 
        
    profileName.textContent = inputEditProfileName.value;
    profileJob.textContent = inputEditProfileJob.value;

    closePopup(formEditProfile);
    deactivateClosingEventListeners();
}


// Handler function for opening an image popup by click
function openScalePopup(name, link) {
    const popup = document.querySelector('.popup_type_image');
    popup.classList.add('popup_is-opened');
    const popupImageLink = popup.querySelector('.popup__image');
    const popupImageCaption = popup.querySelector('.popup__caption');

    popupImageLink.src = link.src;
    popupImageCaption.textContent = name.textContent;

    activateClosingEventListeners();
}


// Function to create a new card
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


// Function to create six cards when the page loads
initialCards.forEach(function(item) {
    const cardList =  document.querySelector('.places__list');
    const card = createCard(item, deleteCard, likeCard, openScalePopup );
    cardList.append(card);
});


// Function to open the form for adding a new card
function openAddNewCardPopup(){
    openPopup(formNewCard);
}


// <<<<<< EVENT LISTENERS SECTION >>>>>>
// Handler for opening the profile editing form 
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

// Handler for the SUBMIT button in the profile editing form
formEditProfile.addEventListener('submit', handleFormSubmit);


// Handler for opening the form for adding a new card
document.querySelector('.profile__add-button').addEventListener('click', openAddNewCardPopup);


// Handler for creating a new card, SUBMIT button
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Deactivate all closing event listeners attached to the document 
deactivateClosingEventListeners();

// Activate validation for all the forms
enableValidation(validationConfig);