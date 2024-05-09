// Show error function
/**
 * Displays an error message for a specific input field.
 * @param {HTMLElement} formElement - The form element containing the input field.
 * @param {HTMLElement} inputElement - The input element for which the error should be displayed.
 * @param {string} errorMessage - The error message to be displayed.
 * @param {Object} config - The configuration object containing CSS class names.
 */
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// The function hides the error span
/**
 * Hides the error message for a specific input field.
 * @param {HTMLElement} formElement - The form element containing the input field.
 * @param {HTMLElement} inputElement - The input element for which the error should be hidden.
 * @param {Object} config - The configuration object containing CSS class names.
 */
export const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// Validation function.
/**
 * Checks the validity of an input field and displays or hides the error message accordingly.
 * @param {HTMLElement} formElement - The form element containing the input field.
 * @param {HTMLElement} inputElement - The input element to be validated.
 * @param {Object} config - The configuration object containing CSS class names.
 */
const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
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
/**
 * Checks if there are any invalid input fields in a list of input elements.
 * @param {Array} inputList - An array of input elements.
 * @returns {boolean} `true` if at least one input element is invalid, `false` otherwise.
 */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid);
    })
}

// The function sets the button to an inactive state.
/**
 * Toggles the state of the submit button based on the validity of the input fields.
 * @param {Array} inputList - An array of input elements.
 * @param {HTMLElement} buttonElement - The submit button element.
 * @param {Object} config - The configuration object containing CSS class names.
 */
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
}

// Enable input validation on input level.
/**
 * Sets up event listeners for input fields and the submit button within a specific form element.
 * @param {HTMLElement} formElement - The form element for which validation should be enabled.
 * @param {Object} config - The configuration object containing CSS class names and selectors.
 */
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            console.log('checking');
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Enable validation on form level.
/**
 * Enables validation for all forms on the page based on the provided configuration.
 * @param {Object} config - The configuration object containing CSS class names and selectors.
 */
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    // Prevent page reload in the submit event.
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        // Prevent enter down if the form isn't valid.
        formElement.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') {
                if (!formElement.checkValidity()) {
                    evt.preventDefault();
                }
            }
        })
        setEventListeners(formElement, config);
    });
};

// Clear up the error message from the previous session function.
/**
 * Clears any existing validation errors and disables the submit button for a specific form element.
 * @param {HTMLElement} profileForm - The form element for which validation should be cleared.
 * @param {Object} config - The configuration object containing CSS class names and selectors.
 */
export const clearValidation = (profileForm, config) => {
    const inputList = Array.from(profileForm.querySelectorAll(config.inputSelector));
    const buttonElement = profileForm.querySelector(config.submitButtonSelector);

    buttonElement.classList.add(config.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, config)
    })
}