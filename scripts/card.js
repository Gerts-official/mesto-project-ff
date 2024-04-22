// Import cards.js
import { initialCards } from './cards.js';

// DOM
const cardList =  document.querySelector('.places__list');


// Функция создания карточек
export function createCard(item, deleteCardCallback, likeCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = 'На картинке изображено: ' + item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    // Вешаем слушатель на кнопку удаления карты
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement);
        console.log(cardElement);
    });

    // Вешаем слушатель на кнопку лайка карты
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click',function(){
        likeCardCallback(likeButton);
    } )

    return cardElement;
}

// Функция создания шести карточек при загрузке страницы
initialCards.forEach(function(item) {
    const card = createCard(item, deleteCard, likeCard);
    cardList.append(card);
});



// Функция - обработчик удаления карточки 
export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  
  // Функция - обработчик лайка карточки 
  export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
