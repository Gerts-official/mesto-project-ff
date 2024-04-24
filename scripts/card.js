// Функция создания карточек
export function createCard(item, deleteCardCallback, likeCardCallback, openCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    // Объект вновь созданной карты 
    const cardData = {
        name: cardElement.querySelector('.card__title'),
        link: cardElement.querySelector('.card__image'),
        altText: cardElement.querySelector('.card__image')
    }
    // Наполняем новую карту данными из cards.js
    cardData.name.textContent = item.name;
    cardData.link.src = item.link;
    cardData.altText.alt = 'На картинке изображено: ' + item.name;


    // Вешаем слушатель на кнопку удаления карты
    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function() {
        deleteCardCallback(cardElement);
    });

    // Вешаем слушатель на кнопку лайка карты
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click',function(){
        likeCardCallback(likeButton);
    } )

    // Вешаем слушатель изображение для увеличения 
    cardData.link.addEventListener('click', function(){
        openCardCallback(cardData.name, cardData.link);
    })

    // Возвращаем готовую карту для последующей вставки
    return cardElement;
}


// Функция - обработчик удаления карточки 
export function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  
  // Функция - обработчик лайка карточки 
  export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
