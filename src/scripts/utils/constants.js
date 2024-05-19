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
const NewCardPopup = document.querySelector('.popup_type_new-card');
const EditProfilePopup = document.querySelector('.popup_type_edit');
const NewAvatarPopup = document.querySelector('.popup_type_new-avatar');
const deleteCardPopup = document.querySelector('.popup_type_delete');

// Forms
const newCardForm = document.forms['new-place'];
const editProfileForm = document.forms['edit-profile'];
const newAvatarForm = document.forms['new-avatar'];
const deleteCardForm = document.forms['confirm-delete'];

// Elements
const cardList = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const inputEditProfileName = EditProfilePopup.querySelector('.popup__input_type_name');
const inputEditProfileJob = EditProfilePopup.querySelector('.popup__input_type_description');
const inputNewCardName = NewCardPopup.querySelector('.popup__input_type_card-name');
const inputNewCardLink = NewCardPopup.querySelector('.popup__input_type_url');
const inputNewAvatarLink = NewAvatarPopup.querySelector('.popup__input_type_url');
const deleteCardSubmitButton = deleteCardForm.querySelector('.popup__button');


export { validationConfig, NewCardPopup, cardList, EditProfilePopup, profileName, profileJob, profileImage,
     inputEditProfileName, inputEditProfileJob, inputNewCardName, inputNewCardLink, NewAvatarPopup, inputNewAvatarLink,
      deleteCardPopup, newCardForm, editProfileForm, newAvatarForm, deleteCardForm, deleteCardSubmitButton };