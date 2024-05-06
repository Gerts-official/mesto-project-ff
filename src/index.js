// Import CSS
import './pages/index.css';
// Import cards.js
import { initialCards } from './scripts/cards.js';
// Import card.js
import { deleteCard, likeCard, createCard, hideDeleteButton} from './scripts/card.js';
// Import modal.js
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';
// Import validation.js
import {enableValidation, clearValidation} from './scripts/validation.js';
// Import api.js
import {getUserData, getInitialCardsToLoad, patchChangedPrifileData, postNewCard} from './scripts/api.js';

// *** VALIDATION CONFIG ***
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

// DOM nodes
const formNewCard = document.querySelector('.popup_type_new-card');
const cardList =  document.querySelector('.places__list');

const formEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const inputEditProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileJob = formEditProfile.querySelector('.popup__input_type_description');

const inputNewCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputNewCardLink = formNewCard.querySelector('.popup__input_type_url');
    


// Handler function for opening the profile editing form
function openEditProfilePopup(){
   
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
    clearValidation(formEditProfile, validationConfig);
}


// Handler function for editing the profile
function submitEditProfileButton(evt) {
    evt.preventDefault(); 

    const newName = inputEditProfileName.value;
    const newAbout = inputEditProfileJob.value;
        
    profileName.textContent = newName;
    profileJob.textContent = newAbout;

    
    patchChangedPrifileData(newName, newAbout);
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
async function handleNewCardSubmit(evt) { 
    evt.preventDefault();
    
    const newCardName = inputNewCardName.value;
    const newCardLink = inputNewCardLink.value;

    try {
        const newCardData = await postNewCard(newCardName, newCardLink);
    
        const newCardElement = createCard(newCardData, deleteCard, likeCard, openScalePopup);
        cardList.prepend(newCardElement);
        inputNewCardLink.value = '';
        inputNewCardName.value = '';

        closePopup(formNewCard);
        deactivateClosingEventListeners();
    } catch (error) {
        console.error('Failed to handle new card submission:', error);
      } 
}


Promise.all([getUserData(), getInitialCardsToLoad()])
    .then(results => {
        const profileData = results[0];
        const cardsData = results[1];

        const profileID = profileData._id;

        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
        
        cardsData.forEach(cardData => {
            const card = createCard(cardData, deleteCard, likeCard, openScalePopup);
            cardList.append(card);
            hideDeleteButton(card, cardData, profileID);
        });
    });


// Function to open the form for adding a new card
function openAddNewCardPopup(){
    inputNewCardLink.value = '';
    inputNewCardName.value = '';

    openPopup(formNewCard);
    clearValidation(formNewCard, validationConfig);
}


// <<<<<< EVENT LISTENERS SECTION >>>>>>
// Handler for opening the profile editing form 
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

// Handler for the SUBMIT button in the profile editing form
formEditProfile.addEventListener('submit', submitEditProfileButton);

// Handler for opening the form for adding a new card
document.querySelector('.profile__add-button').addEventListener('click', openAddNewCardPopup);

// Handler for creating a new card, SUBMIT button
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Deactivate all closing event listeners attached to the document 
deactivateClosingEventListeners();


// Activate validation for all the forms
enableValidation(validationConfig);





