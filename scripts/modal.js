// Функция открытия модального окна 
export function openPopup(popupType) {
    const popup = document.querySelector(`.popup_type_${popupType}`);
    popup.classList.add('popup_is-opened');


    // Активируем все слушатели по закрытию
    activateClosingEventListeners();
}

// Функция закрытия модального окна 
 export function closePopup() {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    openedPopup.classList.remove('popup_is-opened');


    // Снимаем все слушатели по закрытию
    document.querySelector('.page__content').removeEventListener('click', handlePopupCloseButtonClick);
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
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


// Функция-обработчик клика по кнопке закрытия попапа
function handlePopupCloseButtonClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup();
    }
}

// Функция-обработчик открытия попапа по клику
export function handlePopupButtonClick(evt) {
    const targetClick = evt.target;
    if (targetClick.classList.contains('profile__edit-button')) {
        openPopup('edit');
    } else if (targetClick.classList.contains('profile__add-button')) {
        openPopup('new-card');
    } else if (targetClick.classList.contains('card__image')) {
        console.log(evt.target);
        cardScale(evt);
    }
}

function cardScale(evt) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageLink = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');
    const currentCard = evt.target.parentNode;

    const currentCardLink = currentCard.querySelector('.card__image').src;
    const currentCardCaption = currentCard.querySelector('.card__title').textContent;

    popupImageLink.src = currentCardLink;
    popupImageCaption.textContent = currentCardCaption;
    popupImage.classList.add('popup_is-opened');
    activateClosingEventListeners();
}


export function activateClosingEventListeners() {
    document.querySelector('.page__content').addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
}
