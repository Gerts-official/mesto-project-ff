import {deleteFromTheServer} from './api.js';


// Function to create cards 
export function createCard(newCardData, deleteCardCallback, likeCardCallback, openCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // New card's object
    const cardData = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image'),
    }

    // Fill the card with data from cards.js
    cardData.name.textContent = newCardData.name;
    cardData.link.src = newCardData.link;
    cardData.altText.alt = 'На картинке изображено: ' + newCardData.name;

    // Attach an event listener to the card deletion button.
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        console.log(newCardData);
        deleteCardCallback(cardElement, newCardData._id);
    });

    // Attach an event listener to the card like button.
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click',function(){
        likeCardCallback(likeButton);
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
}


// Handle function to delete card.
export function deleteCard(cardElement, id) {
    cardElement.remove();
    deleteFromTheServer(id);

  }
  
  
  // Handle function to like card.
  export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }