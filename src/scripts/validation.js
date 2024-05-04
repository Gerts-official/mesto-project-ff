// Show error function
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// The unction hides the error span
export const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};


// Validation function. 
const isValid = (formElement,inputElement, config) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        console.log(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
        console.log(inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, config);
    }
}


// The function checks if all the inputs are valid. Returns true if any of the fields are false. 
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid);
    })
}

// The function sets the button to an inactive state.
const toggleButtonState = (inputList, buttonElement, config) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);

    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}


// Enable input validation on input level.
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Enable validation on form level.
export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

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
        setEventListeners(formElement, validationConfig);
    });
};


// const clearValidation = (formElement, inputElement, config) => {

// }


