// ========================================================================================== HEADER ZONE 
// Import SECTION
import './pages/index.css';
import { deleteCard, likeCard, createCard, hideDeleteButton } from './scripts/card.js';
import { openPopup, closePopup, activateClosingEventListeners, deactivateClosingEventListeners } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserData, getInitialCardsToLoad, patchChangedProfileData, postNewCard, patchChangeUserAvatar, getMimeType } from './scripts/api.js';

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



// ========================================================================================== MAIN ZONE 
// Handler function for opening the profile editing form
function openEditProfilePopup() {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(formEditProfile);
    clearValidation(formEditProfile, validationConfig);
}

// Handler function for editing the profile
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
function openAddNewCardPopup() {
    inputNewCardLink.value = '';
    inputNewCardName.value = '';

    openPopup(formNewCard);
    clearValidation(formNewCard, validationConfig);
}


// Function to open the form for adding a new card
function openEditAvatarPopup() {
    inputNewAvatarLink.value = '';

    openPopup(formNewAvatar);
    clearValidation(formNewAvatar, validationConfig);
}

// // Function to change the avatar image
// async function handleNewAvatarSubmit(evt) {
//     evt.preventDefault();
//     console.log('1: ', profileImage);

//     const submitButton = evt.currentTarget.querySelector('.popup__button');
//     const originalButtonText = submitButton.textContent;
//     submitButton.textContent = 'Сохранение...';

//     const newAvatarLink = inputNewAvatarLink.value;
//     console.log('2: ', newAvatarLink);

//     if(await checkImage(newAvatarLink)) {;

//         try {
//             await patchChangeUserAvatar(newAvatarLink);
//             profileImage.style.backgroundImage = `url('${newAvatarLink}')`;
//             closePopup(formNewAvatar);
//             deactivateClosingEventListeners();

//         } catch (error) {
//             console.error("Failed to update avatar:", error);
//         } finally {
//             submitButton.textContent = originalButtonText;
//         }
//     }
// }

// async function checkImage(url) {
//     const image = new Image();
//     image.onload = function() {
//       if (this.width > 0) {
//         console.log("image exists");
//       }
//     }
//     image.onerror = function() {
//       console.log("image doesn't exist");
//     }
//     image.src = url;
//   }
  
//   // Пример использования
//   const imageUrl = 'https://example.com/path/to/image.jpg';
//   checkImageUrl(imageUrl);
  

async function handleNewAvatarSubmit(evt) {
    evt.preventDefault();
    console.log('1: ', profileImage);

    const submitButton = evt.currentTarget.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const newAvatarLink = inputNewAvatarLink.value;
    console.log('2: ', newAvatarLink);

    if (await checkImage(newAvatarLink)) {
        try {
            await patchChangeUserAvatar(newAvatarLink);
            profileImage.style.backgroundImage = `url('${newAvatarLink}')`;
            closePopup(formNewAvatar);
            deactivateClosingEventListeners();
        } catch (error) {
            console.error("Failed to update avatar:", error);
        } finally {
            submitButton.textContent = originalButtonText;
        }
    } else {
        console.log("Image does not exist or could not be loaded.");
        submitButton.textContent = originalButtonText;
    }
}

function checkImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function() {
            if (this.width > 0) {
                console.log("Image exists");
                resolve(true);
            }
        };
        image.onerror = function() {
            console.log("Image doesn't exist");
            resolve(false);
        };
        image.src = url;
    });
}




// ================================================================================ EVENT LISTENERS ZONE 
// Event listener to OPEN the profile editing form
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);
// Event listener to SUBMIT profile editing form
formEditProfile.addEventListener('submit', submitEditProfileButton);

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