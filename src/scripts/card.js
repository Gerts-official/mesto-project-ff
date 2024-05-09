import {deleteFromTheServer, patchNewLike, deleteLike } from './api.js';
import {openPopup, closePopup} from './modal.js';


// Function to create cards 
export function createCard(cardData, deleteCardCallback, likeCardCallback, openCardCallback, profileData,) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    console.log(cardData.link);
    // New card's object
    const cardDataToPut = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image'),
        likeCount: cardElement.querySelector('.card__like-button-span')
    };

    console.log(cardData.link);

    // Fill the card with data from cards.js
    cardDataToPut.name.textContent = cardData.name;
    cardDataToPut.link.src = cardData.link;
    cardDataToPut.altText.alt = 'На картинке изображено: ' + cardData.name;
    cardDataToPut.likeCount.textContent = Array.isArray(cardData.likes) ? cardData.likes.length : 0;


    // Attach an event listener to the card deletion button.
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement, cardData._id);
    });

    // Attach an event listener to the card like button.
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function() {
        likeCardCallback(likeButton, cardData, profileData);
    });

    // Attach an event listener to the card magnifier.
    cardDataToPut.link.addEventListener('click', function() {
        openCardCallback(cardDataToPut.name, cardDataToPut.link);
    });

    // Check if the card is liked by the current user and update the like button state
    if (cardData.likes && Array.isArray(cardData.likes)) {
        const isLikedByCurrentUser = cardData.likes.some(like => like._id === profileData._id);
        if (isLikedByCurrentUser) {
            likeButton.classList.add('card__like-button_is-active');
        }
    } else {
        console.log("Likes data is not available or not an array");
        console.log(cardData.likes);
    }


    return cardElement;
}


export function hideDeleteButton (card, cardData, ID){
    if(cardData.owner._id !== ID) {
        const noRightsDeleteButton = card.querySelector('.card__delete-button');
        noRightsDeleteButton.classList.add('card__delete-button-inactive');
    }
};
 


// Handle function to delete card.
export function deleteCard(cardElement, id) {
    const deletePopup = document.querySelector('.popup_type_delete');
    const deleteButtonConfirm = deletePopup.querySelector('.popup__button');

    openPopup(deletePopup);

    // Complete card delition (confirm/delete button).
    const deleteCardComplete = () => {
        deleteFromTheServer(id);
        cardElement.remove();
        closePopup(deletePopup);
        document.removeEventListener('keydown', handleKeyDown);
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


/**
 * Toggles a like on a card.
 * @param {HTMLElement} likeButton - The like button element.
 * @param {Object} cardData - Data of the card.
 */
export async function likeCard(likeButton, cardData, currentUser) {
    try {
        let updatedCardData;

        // Проверяем, лайкнута ли карточка текущим пользователем
        const isLiked = cardData.likes.some(like => like._id === currentUser._id);

        if (isLiked) {
            // Если карточка уже лайкнута, отправляем DELETE-запрос для удаления лайка
            updatedCardData = await deleteLike(cardData._id);
        } else {
            // Если карточка не лайкнута, отправляем PUT-запрос для добавления лайка
            updatedCardData = await patchNewLike(cardData._id);
        }

        // Обновляем данные карточки новыми данными с сервера
        cardData.likes = updatedCardData.likes;

        // Обновляем визуальное отображение лайка и счётчик лайков
        updateLikeVisuals(likeButton, cardData.likes.length, isLiked);
    } catch (error) {
        console.error('Error toggling like:', error);
        // Опционально: показать сообщение об ошибке пользователю
    }
}

/**
 * Updates the like button visuals and like count.
 * @param {HTMLElement} likeButton - The like button element.
 * @param {number} likeCount - The new like count.
 * @param {boolean} isLiked - Whether the card is liked by the current user.
 */
function updateLikeVisuals(likeButton, likeCount, isLiked) {
    const likeCountElement = likeButton.nextElementSibling;
    likeCountElement.textContent = likeCount;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
}




  


