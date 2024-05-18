// ========================================================================================================= HEADER ZONE  
// Import SECTION
import './pages/index.css';
import { openDeletePopup, likeCard, createCard, selectedCardGlobal } from './scripts/card.js';
import { openPopup, closePopup, activateClosingEventListeners } from './scripts/modal.js';
import { enableValidation, clearValidation, showInputError, validateImage } from './scripts/validation.js';
import { getUserData, getInitialCardsToLoad, patchChangedProfileData, postNewCard, patchChangeUserAvatar, deleteFromTheServer } from './scripts/api.js';
import { validationConfig, NewCardPopup, cardList, EditProfilePopup, profileName, profileJob, profileImage, inputEditProfileName, inputEditProfileJob, inputNewCardName, inputNewCardLink, NewAvatarPopup, inputNewAvatarLink, deleteCardPopup, newCardForm, editProfileForm, newAvatarForm, deleteCardForm } from './scripts/utils/constants.js';

// GLOBAL 
let profileDataGlobal;  


// ========================================================================================================= MAIN ZONE 
// Load website's data from the server
(async () => {
    // Wait for the user's data and initial set of cards to load
    try {
        const [profileData, cardsData] = await Promise.all([getUserData(), getInitialCardsToLoad()]);

        profileDataGlobal = profileData;

        profileName.textContent = profileData.name;
        profileJob.textContent = profileData.about;
        profileImage.style.backgroundImage = `url('${profileData.avatar}')`;

        for (const newCardData of cardsData) {
            const card = createCard(newCardData, openDeletePopup, likeCard, openScalePopup, profileDataGlobal);
            cardList.append(card);
        }
    } catch (error) {
        console.error('Failed to load website data:', error);
    }
}) ();


// Handler function to OPEN profile edit form
function openProfilePopup() {
    inputEditProfileName.value = profileName.textContent;
    inputEditProfileJob.value = profileJob.textContent;
    openPopup(EditProfilePopup);
    clearValidation(EditProfilePopup, validationConfig);
}
// Handler function to SUBMIT edit profile form
async function updateProfileSubmit(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const newName = inputEditProfileName.value;
    const newAbout = inputEditProfileJob.value;

    try {
        await patchChangedProfileData(newName, newAbout);
        profileName.textContent = newName;
        profileJob.textContent = newAbout;
        closePopup(EditProfilePopup);
    } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
    } finally {
        submitButton.textContent = originalButtonText;
    }
}


// Handler function to OPEN a new card form
function openNewCardPopup() {
    newCardForm.reset();
    
    openPopup(NewCardPopup);
    clearValidation(NewCardPopup, validationConfig);
}
// Function to SUBMIT a new card creation 
async function addNewCardSubmit(evt) {
    evt.preventDefault();

    const newCardName = inputNewCardName.value;
    const newCardLink = inputNewCardLink.value;

    const submitButton = evt.submitter;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    try {
        await validateImage(newCardLink);
        let newCardData = await postNewCard(newCardName, newCardLink);
        newCardData.likes = newCardData.likes || [];

        const newCardElement = createCard(newCardData, openDeletePopup, likeCard, openScalePopup, profileDataGlobal);
        cardList.prepend(newCardElement);
        
        closePopup(NewCardPopup);
    } catch (error) {
        console.error('Failed to add card:', error);
        showInputError(NewCardPopup, inputNewAvatarLink, error.message, validationConfig);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}


// Handler function to OPEN a change avatar form
function openAvatarPopup() {
    newAvatarForm.reset();

    openPopup(NewAvatarPopup);
    clearValidation(NewAvatarPopup, validationConfig);
}
// Function to SUBMIT the changing of profile's avatar
async function updateAvatarSubmit(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const newAvatarLink = inputNewAvatarLink.value;

    try {
        await validateImage(newAvatarLink);
        await patchChangeUserAvatar(newAvatarLink);
        profileImage.style.backgroundImage = `url('${newAvatarLink}')`;
        closePopup(NewAvatarPopup);
    } catch (error) {
        console.error("Failed to update avatar:", error);
        showInputError(NewAvatarPopup, inputNewAvatarLink, error.message, validationConfig);
    } finally {
        submitButton.textContent = originalButtonText;
    }
}

// Handler function to OPEN an image popup by click
function openScalePopup(name, link) {
    const scalePopup = document.querySelector('.popup_type_image');
    openPopup(scalePopup);
    const popupImageLink = scalePopup.querySelector('.popup__image');
    const popupImageCaption = scalePopup.querySelector('.popup__caption');

    popupImageLink.src = link.src;
    popupImageCaption.textContent = name.textContent;

    activateClosingEventListeners();
}


// Function to SUBMIT the deletion of a card
async function deleteCardConfirmed (evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Удаление...';

    try {
      await deleteFromTheServer(selectedCardGlobal.id);
      selectedCardGlobal.element.remove();
      closePopup(deleteCardPopup);
    } catch (error) {
      console.error('Ошибка при удалении карточки:', error);
      throw error;
    } finally {
        submitButton.textContent = originalButtonText;
    }
  }



// ============================================================================================= EVENT LISTENERS ZONE 
// Event listener to OPEN the profile editing form
document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);
// Event listener to SUBMIT profile editing form
EditProfilePopup.addEventListener('submit', updateProfileSubmit);

// Event listener to OPEN the add new card form 
document.querySelector('.profile__add-button').addEventListener('click', openNewCardPopup);
// Event listener to SUBMIT the add new card form
newCardForm.addEventListener('submit', addNewCardSubmit);

// Event listener to OPEN the profile changing avatar form
profileImage.addEventListener('click', openAvatarPopup);
// // Event listener to SUBMIT the profile changing avatar form
newAvatarForm.addEventListener('submit', updateAvatarSubmit);

// Event listener to SUBMIT card deletion 
deleteCardForm.addEventListener('submit', deleteCardConfirmed );

// Enable validation
enableValidation(validationConfig);