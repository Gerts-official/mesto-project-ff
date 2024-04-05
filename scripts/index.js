// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardList =  document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');




// @todo: Функция создания карточки

initialCards.forEach(function(item, index) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardList.append(cardElement);

    const deleteCardButton = cardElement.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode.querySelector('.card__title'));
        evt.target.parentNode.remove();
    });
});



// @todo: Функция удаления карточки




// @todo: Вывести карточки на страницу



