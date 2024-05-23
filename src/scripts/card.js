import { patchNewLike, deleteLike } from './api.js';
import { openPopup } from './modal.js';
import { deleteCardPopup, deleteCardSubmitButton } from './utils/constants.js';

// DOM and GLOBAL variables
const cardTemplate = document.querySelector('#card-template');
export let selectedCardGlobal = {};


//  ===================================================================================================== SUB-FUNCTIONS
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
    cardDataToPut.altText.alt = 'The image of: ' + cardData.name;
    cardDataToPut.likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;

    return cardDataToPut;
}

// Attaches event listeners to the card element for delete, like, and open actions.
function attachEventListeners(cardElement, cardData, cardDataToPut, openDeletePopup, likeCardCallback, openCardCallback, profileData) {

    // Attach an event listener to the card deletion button.
    cardDataToPut.deleteButton.addEventListener('click', () => openDeletePopup(cardElement, cardData._id));

    // Attach an event listener to the card like button.
    cardDataToPut.likeButton.addEventListener('click', () => likeCardCallback(cardDataToPut.likeButton, cardData, profileData));

    // Attach an event listener to the card magnifier
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


 export function openDeletePopup(cardElement, id) {
    openPopup(deleteCardPopup);

    deleteCardSubmitButton.focus();

    selectedCardGlobal.id = id;
    selectedCardGlobal.element = cardElement;
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
    }
}

// function to update likes state
function updateLikeVisuals(likeButton, likeCount, isLiked) {
    const likeCountElement = likeButton.nextElementSibling;
    likeCountElement.textContent = likeCount;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
}

//=========================================================================================== MAIN createCard function

export function createCard(cardData, openDeletePopupCallback, likeCardCallback, openCardCallback, profileData) {
    const cardContent = cardTemplate.content.cloneNode(true);
    const cardElement = cardContent.querySelector('.places__item');
    const cardDataToPut = setupCardData(cardElement, cardData);
    hideDeleteButton(cardElement, cardData, profileData._id, cardDataToPut);

    // Attach event listeners
    attachEventListeners(cardElement, cardData, cardDataToPut, openDeletePopupCallback, likeCardCallback, openCardCallback, profileData);

    // Update the like button state
    updateLikeButtonState(cardElement, cardData, profileData, cardDataToPut);

    return cardElement;
}