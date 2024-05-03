// Function to create cards 
export function createCard(item, deleteCardCallback, likeCardCallback, openCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // New card's object
    const cardData = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image')
    }

    // Fill the card with data from cards.js
    cardData.name.textContent = item.name;
    cardData.link.src = item.link;
    cardData.altText.alt = 'На картинке изображено: ' + item.name;

    // Attach an event listener to the card deletion button.
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement);
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


// Handle function to delete card.
export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  
  // Handle function to like card.
  export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }