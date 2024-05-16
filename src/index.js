// ========================================================================================== HEADER ZONE 
// Import SECTION
import './pages/index.css';
import { deleteCard, likeCard, createCard, hideDeleteButton } from './scripts/card.js';
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';
import { enableValidation, clearValidation, showInputError, hideInputError, validateImage } from './scripts/validation.js';
import { getUserData, getInitialCardsToLoad, patchChangedProfileData, postNewCard, patchChangeUserAvatar } from './scripts/api.js';

// *** VALIDATION CONFIG ***
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// DOM nodes
const formNewCard = document.querySelector('.popup_type_new-card');
const cardList = document.querySelector('.places__list');
const formEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const inputEditProfileName = formEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileJob = formEditProfile.querySelector('.popup__input_type_description');
const inputNewCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputNewCardLink = formNewCard.querySelector('.popup__input_type_url');

const formNewAvatar = document.querySelector('.popup_type_new-avatar');
const inputNewAvatarLink = formNewAvatar.querySelector('.popup__input_type_url');

// GLOBAL 
let profileDataGlobal;  




// ========================================================================================== MAIN ZONE 
// Load website's data from the server
Promise.all([getUserData(), getInitialCardsToLoad()])
    .then(results => {
        const profileData = results[0];
        const cardsData = results[1];
        profileDataGlobal = profileData;


        const profileID = profileData._id;


        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileImage.style.backgroundImage = `url('${profileData.avatar}')`;

        cardsData.forEach(newCardData => {
        const card = createCard(newCardData, deleteCard, likeCard, openScalePopup, profileData);
            //const newCardElement = createCard(newCardData, deleteCard, likeCard, openScalePopup);
            cardList.append(card);
            hideDeleteButton(card, newCardData, profileID);
        });
    });



// Handler function to OPEN profile edit form
function openEditProfilePopup() {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
    clearValidation(formEditProfile, validationConfig);
}
// Handler function to SUBMIT edit profile form
async function submitEditProfileForm(evt) {
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
        throw error;
    } finally {
        submitButton.textContent = originalButtonText;
    }
}


// Handler function to OPEN a new card form
function openAddNewCardPopup() {
    inputNewCardLink.value = '';
    inputNewCardName.value = '';

    openPopup(formNewCard);
    clearValidation(formNewCard, validationConfig);
}
// Function to SUBMIT a new card creation 
async function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const newCardName = inputNewCardName.value;
    const newCardLink = inputNewCardLink.value;

    const formElement = document.querySelector('.popup_type_new-card');
    const submitButton = evt.currentTarget.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    try {
        await validateImage(newCardLink);
        let newCardData = await postNewCard(newCardName, newCardLink);
        newCardData.likes = newCardData.likes || [];

        const newCardElement = createCard(newCardData, deleteCard, likeCard, openScalePopup, profileDataGlobal);
        cardList.prepend(newCardElement);
        
        closePopup(formNewCard);
        inputNewCardLink.value = '';
        inputNewCardName.value = '';
        deactivateClosingEventListeners();
        hideInputError(formElement, inputNewAvatarLink, validationConfig);
    } catch (error) {
        console.error('Failed to add card:', error);
        showInputError(formElement, inputNewAvatarLink, error.message, validationConfig);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}


// Handler function to OPEN a change avatar form
function openEditAvatarPopup() {
    inputNewAvatarLink.value = '';

    openPopup(formNewAvatar);
    clearValidation(formNewAvatar, validationConfig);
}
// Function to SUBMIT the changing of profile's avatar
async function handleNewAvatarSubmit(evt) {
    evt.preventDefault();

    const formElement = document.querySelector('.popup_type_new-avatar');
    const inputNewAvatarLink = formElement.querySelector('.popup__input_type_url');
    const submitButton = evt.currentTarget.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const newAvatarLink = inputNewAvatarLink.value;

    try {
        await validateImage(newAvatarLink);
        await patchChangeUserAvatar(newAvatarLink);
        profileImage.style.backgroundImage = `url('${newAvatarLink}')`;
        closePopup(formNewAvatar);
        deactivateClosingEventListeners();
        hideInputError(formElement, inputNewAvatarLink, validationConfig);
    } catch (error) {
        console.error("Failed to update avatar:", error);
        showInputError(formElement, inputNewAvatarLink, error.message, validationConfig);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}

// Handler function to OPEN an image popup by click
function openScalePopup(name, link) {
    const popup = document.querySelector('.popup_type_image');
    popup.classList.add('popup_is-opened');
    const popupImageLink = popup.querySelector('.popup__image');
    const popupImageCaption = popup.querySelector('.popup__caption');

    popupImageLink.src = link.src;
    popupImageCaption.textContent = name.textContent;

    activateClosingEventListeners();
}


// ================================================================================ EVENT LISTENERS ZONE 
// Event listener to OPEN the profile editing form
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);
// Event listener to SUBMIT profile editing form
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Event listener to OPEN the add new card form 
document.querySelector('.profile__add-button').addEventListener('click', openAddNewCardPopup);
// Event listener to SUBMIT the add new card form
formNewCard.addEventListener('submit', handleNewCardSubmit);

// Event listener to OPEN the profile changing avatar form
profileImage.addEventListener('click', openEditAvatarPopup);
// // Event listener to SUBMIT the profile changing avatar form
formNewAvatar.addEventListener('submit', handleNewAvatarSubmit);

// Deactivate all closing event listeners attached to the document
deactivateClosingEventListeners();

// Activate validation for all the forms
enableValidation(validationConfig);