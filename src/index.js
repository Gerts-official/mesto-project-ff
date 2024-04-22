// Import CSS
import '../pages/index.css';
// Import card.js
import { deleteCard, likeCard, createCard } from '../scripts/card.js';
// Import modal.js
import { handlePopupButtonClick, closePopup, pageContent } from '../scripts/modal.js';


// DOM узлы
const formNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.querySelector('.popup_type_edit');
const cardList =  document.querySelector('.places__list');


// Функция - обработчик редактирования профайла
function handleFormSubmit(evt) {
    const profileInputName = formEditProfile.querySelector('.popup__input_type_name');
    const profileInputJub = formEditProfile.querySelector('.popup__input_type_description');
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');

    evt.preventDefault(); 
    
    profileName.textContent = profileInputName.value;
    profileJob.textContent = profileInputJub.value;
    closePopup();
}


// Функция создания карточки
function handleNewCardSubmit(evt) { 
    evt.preventDefault();
    let formInputLink = formNewCard.querySelector('.popup__input_type_url');
    let formInputName = formNewCard.querySelector('.popup__input_type_card-name');
  
    const newCardData = {
        link: formInputLink.value,
        name: formInputName.value
    }
  
    const newCardElement = createCard(newCardData, deleteCard, likeCard);
    cardList.prepend(newCardElement);
    formInputLink.value = '';
    formInputName.value = '';

    formNewCard.removeEventListener('submit', handleNewCardSubmit);
    closePopup();
}




// Обработчик редактирования профиля, кнопка SUBMIT
formEditProfile.addEventListener('submit', handleFormSubmit);



// Обработчик создания новой карты, кнопка SUBMIT
formNewCard.addEventListener('submit', handleNewCardSubmit);


// Обработчик открытия модальных окон
pageContent.addEventListener('click', handlePopupButtonClick);
