// DOM объекты
const modalContainer = document.querySelector('.page__content');
const closeButton = document.querySelector('.popup__close');


// Функция открытия модального окна 
function openPopup(popupType) {
    document.querySelector(`.popup_type_${popupType}`).classList.add('popup_is-opened');
}

// Функция закрытия модального окна 
export function closePopup(evt) {
    let popup = evt.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
}

// Функция-обработчик закрытия модального окна 
modalContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(evt);
    }
});


export function handlePopupButtonClick(evt){
    let targetButton = evt.target;
    console.log(targetButton);
    if(targetButton.classList.contains('profile__edit-button')) {
        openPopup('edit');
        } else if(targetButton.classList.contains('profile__add-button')) {
            openPopup('new-card');
            }
    }

// Функция обработчик события нажатия Esc

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        console.log(evt.target);
        closePopup(evt);
    } 
});

// Функция обработчик события клика по оверлею 
modalContainer.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt);
    }
});