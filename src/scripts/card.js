import { deleteFromTheServer, patchNewLike, deleteLike } from './api.js';
import { openPopup, closePopup } from './modal.js';
import { deletePopup, deleteButtonConfirm } from './utils/constants.js';

const deleteCardPopup = document.querySelector('.popup_type_delete');

// SUB-FUNCTIONS of createCard main function section ============================================================
// Populates the card element with data from the provided cardData object.
function setupCardData(cardElement, cardData) {
    const cardDataToPut = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image'),
        likeCount: cardElement.querySelector('.card__like-button-span'),
        likeButton: cardElement.querySelector('.card__like-button'),
        deleteButton: cardElement.querySelector('.card__delete-button')
    };

    cardDataToPut.name.textContent = cardData.name;
    cardDataToPut.link.src = cardData.link;
    cardDataToPut.altText.alt = 'На картинке изображено: ' + cardData.name;
    cardDataToPut.likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

    return cardDataToPut;
}

// Attaches event listeners to the card element for delete, like, and open actions.
function attachEventListeners(cardElement, cardData, cardDataToPut, deleteCardCallback, likeCardCallback, openCardCallback, profileData) {

    // Attach an event listener to the card deletion button.
    cardDataToPut.deleteButton.addEventListener('click', () => deleteCardCallback(cardElement, cardData._id));

    // Attach an event listener to the card like button.
    cardDataToPut.likeButton.addEventListener('click', () => likeCardCallback(cardDataToPut.likeButton, cardData, profileData));

    // Attach an event listener to the card magnifier.
    cardDataToPut.link.addEventListener('click', () => openCardCallback(cardDataToPut.name, cardDataToPut.link));
}

// Updates the like button state based on whether the current user has liked the card or not.
function updateLikeButtonState(cardElement, cardData, profileData, cardDataToPut) {

    // Check if the card is liked by the current user
    const isLikedByCurrentUser = cardData.likes && Array.isArray(cardData.likes) 
    ? cardData.likes.some(like => like._id === profileData._id): false;

    // Update the like button state based on the check
    if (isLikedByCurrentUser) {
        cardDataToPut.likeButton.classList.add('card__like-button_is-active');
    } else {
        cardDataToPut.likeButton.classList.remove('card__like-button_is-active');
    }
}

// Hides the delete button on the card if the current user is not the owner of the card
export function hideDeleteButton(card, cardData, ID, cardDataToPut) {
    if (cardData.owner._id !== ID) {
        cardDataToPut.deleteButton.classList.add('card__delete-button-inactive');
    }
}

// Handles the deletion of a card by displaying a confirmation popup and removing the card from the DOM
// export function openDeletePopup(cardElement, id) {
//     openPopup(deletePopup);
// const formsfds = deleteCardPopup.querySelector('.popup__form');
  
//     // Complete card deletion (confirm/delete button).
//     async function deleteCardComplete(evt) {
//         console.log('boom!');
//       evt.preventDefault(); // Prevent default form submission behavior (page refresh)
  
//       try {
//         await deleteFromTheServer(id);
//         cardElement.remove();
//         closePopup(deletePopup);
//       } catch (error) {
//         console.error('Ошибка при удалении карточки:', error);
//         throw error;
//       }
//     }
//     formsfds.addEventListener('submit', deleteCardComplete);
//     console.log(deleteCardPopup);
// }

export function openDeletePopup(cardElement, id) {
    openPopup(deletePopup);
    const deleteForm = deleteCardPopup.querySelector('.popup__form'); 
  
    async function deleteCardComplete(evt) {
      evt.preventDefault(); 
      try {
        await deleteFromTheServer(id);
        cardElement.remove();
        closePopup(deletePopup);
      } catch (error) {
        console.error('Ошибка при удалении карточки:', error);
        throw error;
      }
    }
  
    deleteForm.addEventListener('submit', deleteCardComplete);
  }
  


// Event listener to SUBMIT card deletion 
// deleteCardPopup.addEventListener('submit', submitDeleteCard);

// Toggles the like state of a card for the current user.
export async function likeCard(likeButton, cardData, currentUser) {
    try {
        let updatedCardData;
        console.log(currentUser);

        // Check if the card is liked by the current user
        const isLiked = cardData.likes.some(like => like._id === currentUser._id);

        if (isLiked) {
            // If the card is already liked, send a DELETE request to remove the like
            updatedCardData = await deleteLike(cardData._id);
        } else {
            // If the card is not liked, send a PUT request to add a like
            updatedCardData = await patchNewLike(cardData._id);
            console.log(cardData._id);
        }

        // Update the card data with the new like information from the server
        cardData.likes = updatedCardData.likes;

        // Update the visual representation of the like button and like count
        updateLikeVisuals(likeButton, cardData.likes.length, isLiked);
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
}

// function to update likes state
function updateLikeVisuals(likeButton, likeCount, isLiked) {
    const likeCountElement = likeButton.nextElementSibling;
    likeCountElement.textContent = likeCount;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
}

// MAIN createCard function ===========================================================================
export function createCard(cardData, openDeletePopupCallback, likeCardCallback, openCardCallback, profileData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDataToPut = setupCardData(cardElement, cardData);
    hideDeleteButton(cardElement, cardData, profileData._id, cardDataToPut);

    // Attach event listeners
    attachEventListeners(cardElement, cardData, cardDataToPut, openDeletePopupCallback, likeCardCallback, openCardCallback, profileData);

    // Update the like button state
    updateLikeButtonState(cardElement, cardData, profileData, cardDataToPut);

    return cardElement;
}
