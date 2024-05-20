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
// Popups
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newAvatarPopup = document.querySelector('.popup_type_new-avatar');
const scaleImagePopup = document.querySelector('.popup_type_image');
const deleteCardPopup = document.querySelector('.popup_type_delete');


// Forms
const newCardForm = document.forms['new-place'];
const editProfileForm = document.forms['edit-profile'];
const newAvatarForm = document.forms['new-avatar'];
const deleteCardForm = document.forms['confirm-delete'];

// Elements
const cardList = document.querySelector('.places__list');

const popupImageLink = scaleImagePopup.querySelector('.popup__image');
const popupImageCaption = scaleImagePopup.querySelector('.popup__caption');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const inputEditProfileName = editProfilePopup.querySelector('.popup__input_type_name');
const inputEditProfileJob = editProfilePopup.querySelector('.popup__input_type_description');
const inputNewCardName = newCardPopup.querySelector('.popup__input_type_card-name');
const inputNewCardLink = newCardPopup.querySelector('.popup__input_type_url');
const inputNewAvatarLink = newAvatarPopup.querySelector('.popup__input_type_url');
const deleteCardSubmitButton = deleteCardForm.querySelector('.popup__button');


export { validationConfig, newCardPopup, cardList, editProfilePopup, profileName, profileJob, profileImage,
     inputEditProfileName, inputEditProfileJob, inputNewCardName, inputNewCardLink, newAvatarPopup, inputNewAvatarLink,
      deleteCardPopup, newCardForm, editProfileForm, newAvatarForm, deleteCardForm, deleteCardSubmitButton, scaleImagePopup, popupImageLink, popupImageCaption };