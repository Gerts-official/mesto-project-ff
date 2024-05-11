import { deleteFromTheServer, patchNewLike, deleteLike } from './api.js';
import { openPopup, closePopup } from './modal.js';

// SUB-FUNCTIONS of createCard main function section ============================================================
// Populates the card element with data from the provided cardData object.
function setupCardData(cardElement, cardData) {
    const cardDataToPut = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image'),
        likeCount: cardElement.querySelector('.card__like-button-span')
    };

    cardDataToPut.name.textContent = cardData.name;
    cardDataToPut.link.src = cardData.link;
    cardDataToPut.altText.alt = 'На картинке изображено: ' + cardData.name;
    cardDataToPut.likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

    return cardDataToPut;
}

// Attaches event listeners to the card element for delete, like, and open actions.
function attachEventListeners(cardElement, cardData, cardDataToPut, deleteCardCallback, likeCardCallback, openCardCallback, profileData) {
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    // Attach an event listener to the card deletion button.
    deleteCardButton.addEventListener('click', () => deleteCardCallback(cardElement, cardData._id));

    // Attach an event listener to the card like button.
    likeButton.addEventListener('click', () => likeCardCallback(likeButton, cardData, profileData));

    // Attach an event listener to the card magnifier.
    cardDataToPut.link.addEventListener('click', () => openCardCallback(cardDataToPut.name, cardDataToPut.link));

    return cardElement;
}

// Updates the like button state based on whether the current user has liked the card or not.
function updateLikeButtonState(cardElement, cardData, profileData) {
    const likeButton = cardElement.querySelector('.card__like-button');

    // Check if the card is liked by the current user
    const isLikedByCurrentUser = cardData.likes && Array.isArray(cardData.likes) 
    ? cardData.likes.some(like => like._id === profileData._id): false;

    // Update the like button state based on the check
    if (isLikedByCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
}

// Hides the delete button on the card if the current user is not the owner of the card
export function hideDeleteButton(card, cardData, ID) {
    if (cardData.owner._id !== ID) {
        const noRightsDeleteButton = card.querySelector('.card__delete-button');
        noRightsDeleteButton.classList.add('card__delete-button-inactive');
    }
}

// Handles the deletion of a card by displaying a confirmation popup and removing the card from the DOM
export function deleteCard(cardElement, id) {
    const deletePopup = document.querySelector('.popup_type_delete');
    const deleteButtonConfirm = deletePopup.querySelector('.popup__button');

    openPopup(deletePopup);

    // Complete card deletion (confirm/delete button).
    const deleteCardComplete = () => {
        deleteFromTheServer(id);
        cardElement.remove();
        closePopup(deletePopup);
        document.removeEventListener('keydown', handleKeyDown);
        deleteButtonConfirm.removeEventListener('click', deleteCardComplete);
    };

    // Handle pressing Enter on the delete button
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            deleteCardComplete();
        }
    };

    // Handler for affirm deletion of the card by click.
    deleteButtonConfirm.addEventListener('click', deleteCardComplete);
    // Enter submit handler
    document.addEventListener('keydown', handleKeyDown);
}

// Toggles the like state of a card for the current user.
export async function likeCard(likeButton, cardData, currentUser) {
    try {
        let updatedCardData;

        // Check if the card is liked by the current user
        const isLiked = cardData.likes.some(like => like._id === currentUser._id);

        if (isLiked) {
            // If the card is already liked, send a DELETE request to remove the like
            updatedCardData = await deleteLike(cardData._id);
        } else {
            // If the card is not liked, send a PUT request to add a like
            updatedCardData = await patchNewLike(cardData._id);
        }

        // Update the card data with the new like information from the server
        cardData.likes = updatedCardData.likes;

        // Update the visual representation of the like button and like count
        updateLikeVisuals(likeButton, cardData.likes.length, isLiked);
    } catch (error) {
        console.error('Error toggling like:', error);
        // Optionally: show an error message to the user
    }
}

// function to update likes state
function updateLikeVisuals(likeButton, likeCount, isLiked) {
    const likeCountElement = likeButton.nextElementSibling;
    likeCountElement.textContent = likeCount;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
}

// MAIN createCard function ===========================================================================
export function createCard(cardData, deleteCardCallback, likeCardCallback, openCardCallback, profileData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDataToPut = setupCardData(cardElement, cardData);

    // Attach event listeners
    attachEventListeners(cardElement, cardData, cardDataToPut, deleteCardCallback, likeCardCallback, openCardCallback, profileData);

    // Update the like button state
    updateLikeButtonState(cardElement, cardData, profileData);

    return cardElement;
}