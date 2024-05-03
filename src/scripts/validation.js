
// Show error function
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// The unction hides the error span
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};


// Validation function. 
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// The function checks if all the inputs are valid. Returns true if any of the fields are false. 
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid);
    })
}

// The function sets the button to an inactive state.
const toggleButtonState = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_inactive');

    } else {
        buttonElement.classList.remove('button_inactive');
    }
}


// Enable input validation on input level.
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// Enable validation on form level.
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    // Pevent page reload in the submit event.
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        // Prevent enter down if the form isn't valid.
        formElement.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') {
                console.log(formElement.checkValidity());
                if (!formElement.checkValidity()){
                    evt.preventDefault();
                }
            }
        })
        setEventListeners(formElement);
    });
};



