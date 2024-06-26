// ============================================================================================= HELPER FUNCTIONS 

// The function checks if all the inputs are valid. Returns true if any of the fields are false.
const hasInvalidInput = (inputList) => inputList.some(input => !input.validity.valid); 

// Function to validate all the inputs
const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    };

    return inputElement.validity.valid;
};

// Checks if the image can be loaded
export function checkImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function() {
            if (this.width > 0) {
                resolve(true);
            }
        };
        image.onerror = function() {
            resolve(false);
        };
        image.src = url;
    });
};

// Function to validate images
export async function validateImage(url) {
    try {
        const imageExists = await checkImage(url);
        if (!imageExists) {
            throw new Error('Image does not exist or cannot be loaded. Please check the link');
            } 
        } catch (error) {
        console.error('Failed to update profile:', error);
        throw error;
        }
}

function disableButton(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}
 
function enableButton(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

// Button State Management Function
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}

// Function for preventing invalid form submission
const preventInvalidFormSubmission = (formElement, event) => {
    if (!formElement.checkValidity()) {
        event.preventDefault();
    }
}


// ======================================================================================== SHOW/HIDE ERROR FUNCTIONS

// Function to show the error 
export const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Function to hide the error 
export const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};


// ======================================================================================== MAIN VALIDATION FUNCTIONS

// Enable input validation on input level.
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            const isValidInput = isValid(formElement, inputElement, config);
            if (!isValidInput) {
                showInputError(formElement, inputElement, inputElement.validationMessage, config);
            } else {
                hideInputError(formElement, inputElement, config);
            }
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Enable validation on form level.
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    // Prevent page reload in the submit event.
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        setEventListeners(formElement, config);
    });
};

// Clear up the error message from the previous session function.
export const clearValidation = (profileForm, config) => {
    const inputList = Array.from(profileForm.querySelectorAll(config.inputSelector));
    const buttonElement = profileForm.querySelector(config.submitButtonSelector);

    disableButton(buttonElement, config);

    inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, config);
    })
}