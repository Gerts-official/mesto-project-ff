// DOM
export const pageContent = document.querySelector('.page__content');


// Функция-обработчик открытия попапов по клику
export function handlePopupButtonClick(evt) {
    const targetClick = evt.target;
    if (targetClick.classList.contains('profile__edit-button')) {
        openPopup('edit');
    } else if (targetClick.classList.contains('profile__add-button')) {
        openPopup('new-card');
    } else if (targetClick.classList.contains('card__image')) {
        cardScale(evt);
    }
}


// Функция открытия модального окна 
export function openPopup(popupType, imageData) {
    const popup = document.querySelector(`.popup_type_${popupType}`);
    popup.classList.add('popup_is-opened');

    if('edit') {
        const profileInputName = document.querySelector('.popup__input_type_name');
        const profileInputJub = document.querySelector('.popup__input_type_description');
        const profileName = document.querySelector('.profile__title').textContent;
        const profileJob = document.querySelector('.profile__description').textContent;
        profileInputName.value = profileName;
        profileInputJub.value = profileJob;

        
        }else if(imageData) {
            const popupImageLink = popup.querySelector('.popup__image');
            const popupImageCaption = popup.querySelector('.popup__caption');

            popupImageLink.src = imageData.link;
            popupImageCaption.textContent = imageData.caption;
    }

    // Активируем все слушатели по закрытию
    activateClosingEventListeners();
}


// Функция открытия изображения карточки
function cardScale(evt) {
    const currentCard = evt.target.parentNode;
    const currentCardLink = currentCard.querySelector('.card__image').src;
    const currentCardCaption = currentCard.querySelector('.card__title').textContent;

    openPopup('image', {link: currentCardLink, caption: currentCardCaption});
}


// Функция закрытия модального окна 
 export function closePopup() {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');

    // Деактивируем все слушатели по закрытию
    deactivateClosingEventListeners();
   
}


// Функция-обработчик клика по кнопке закрытия попапа
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup();
    }
}


// Функция-обработчик нажатия клавиши Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}


// Функция-обработчик закрытия по клику на оверлей
function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
}


// Функция активации группы слушателей
function activateClosingEventListeners() {
    pageContent.addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
}


 // Функция деактивации группы слушателей 
 function deactivateClosingEventListeners(){
    pageContent.removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
}