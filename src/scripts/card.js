import {deleteFromTheServer, patchNewLike} from './api.js';
import {openPopup, closePopup} from './modal.js';


// Function to create cards 
export function createCard(profileData, newCardData, deleteCardCallback, likeCardCallback, openCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // New card's object
    const cardData = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image'),
        likeCount: cardElement.querySelector('.card__like-button-span')
    }

    // Fill the card with data from cards.js
    cardData.name.textContent = newCardData.name;
    cardData.link.src = newCardData.link;
    cardData.altText.alt = 'На картинке изображено: ' + newCardData.name;
    cardData.likeCount.textContent = newCardData.likes.length;

    // Attach an event listener to the card deletion button.
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement, newCardData._id);
    });

    // Attach an event listener to the card like button.
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click',function(){
        likeCardCallback(likeButton, newCardData, profileData );
    } )

    // Attach an event listener to the card magnifier.
    cardData.link.addEventListener('click', function(){
        openCardCallback(cardData.name, cardData.link);
    })

    // Return the card ready for insertion.
    return cardElement;
}

export function hideDeleteButton (card, cardData, ID){
    if(cardData.owner._id !== ID) {
        const noRightsDeleteButton = card.querySelector('.card__delete-button');
        noRightsDeleteButton.classList.add('card__delete-button-incative');
    }
};

// export function showLikeCount (card, cardData) {
//     //console.log (cardData.likes.length);
//     console.log(card);
//     //const likeCount = card__like-button-span

// };

 


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

 
  
// Handle function to like card.
    export function likeCard(likeButton, cardData, profileData) {
    likeButton.classList.toggle('card__like-button_is-active');
    updateLikeCount(cardData, profileData);
    console.log(cardData);

    // PATCH лайки
    // Обновить лайки
}

function updateLikeCount (cardData, profileData) {
    patchNewLike (cardData, profileData);
}