// DOM объекты
const profileEditPopUp = document.querySelector('.popup_type_edit');
const closeButton = profileEditPopUp.querySelector('.popup__close');

// Функция открытия модального окна 
export function openModalWindow(evt) {
    // profileEditPopUp.classList.add('popup_is-opened');
    console.log(evt.target);
    console.log(evt);
}



// Функция закрытия модального окна 
export function closePopUp(evt) {
    console.log(evt)
}

// Функция обработчик события нажатия Esc


// Функция обработчик события клика по оверлею 