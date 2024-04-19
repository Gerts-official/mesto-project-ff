// Функция открытия модального окна 
function openPopup(popupType) {
    const popup = document.querySelector(`.popup_type_${popupType}`);
    popup.classList.add('popup_is-opened');


    // Навешиваем все слушатели по закрытию
    document.querySelector('.page__content').addEventListener('click', handlePopupCloseButtonClick);
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
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
    const targetButton = evt.target;
    if (targetButton.classList.contains('profile__edit-button')) {
        openPopup('edit');
    } else if (targetButton.classList.contains('profile__add-button')) {
        openPopup('new-card');
    }
}


