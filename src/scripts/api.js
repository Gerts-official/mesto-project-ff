// API CONSTANTS
/**
 * The base URL for the API endpoint.
 * @type {string}
 */
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-13';

/**
 * The authorization key required for making requests.
 * @type {string}
 */
const AUTHORIZATION_KEY = '70d4b308-094b-447b-90dc-851238a69354';

// Helper function to handle responses
/**
 * Handles the response from the server.
 * @param {Response} response - The response object from the fetch API.
 * @returns {Promise<Object>} A Promise that resolves with the parsed JSON response.
 * @throws {Error} If the response is not successful, throws an error with the error message from the server.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};

// Helper function to make API calls
/**
 * Base implementation of an API request.
 * @param {string} uri - The partial path after the base URL.
 * @param {string} method - The HTTP request method (default is "GET").
 * @param {Object|null} data - The data to be sent with the request (default is null).
 * @returns {Promise<Object>} A Promise that resolves with the parsed JSON response.
 * @throws {Error} If the request fails, throws an error with the error message.
 */
const makeRequest = async (uri, method = "GET", data = null) => {
    const options = {
        method,
        headers: {
            'Authorization': AUTHORIZATION_KEY,
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}/${uri}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error(`${method} request failed:`, error);
        throw error;
    }
};

// API methods
/**
 * Retrieves the user's data from the server.
 * @returns {Promise<Object>} A Promise that resolves with the user's data.
 */
export const getUserData = () => makeRequest('users/me');

/**
 * Retrieves the initial set of cards from the server.
 * @returns {Promise<Object>} A Promise that resolves with the initial set of cards.
 */
export const getInitialCardsToLoad = () => makeRequest('cards');

/**
 * Updates the user's profile data on the server.
 * @param {string} name - The new name for the user's profile.
 * @param {string} about - The new about information for the user's profile.
 * @returns {Promise<Object>} A Promise that resolves with the updated user's data.
 */
export const patchChangedProfileData = (name, about) => makeRequest('users/me', 'PATCH', { name, about });

/**
 * Creates a new card on the server.
 * @param {string} name - The name of the new card.
 * @param {string} link - The link to the image for the new card.
 * @returns {Promise<Object>} A Promise that resolves with the created card data.
 */
export const postNewCard = (name, link) => makeRequest('cards', 'POST', { name, link });

/**
 * Deletes a card from the server.
 * @param {string} id - The ID of the card to be deleted.
 * @returns {Promise<Object>} A Promise that resolves with the deleted card data.
 */
export const deleteFromTheServer = (id) => makeRequest(`cards/${id}`, 'DELETE');

/**
 * Adds a like to a card on the server.
 * @param {string} cardID - The ID of the card to be liked.
 * @param {Object} likes - The likes data for the card.
 * @returns {Promise<Object>} A Promise that resolves with the updated card data.
 */
export const patchNewLike = (cardID, likes) => makeRequest(`cards/likes/${cardID}`, 'PUT', { likes });

/**
 * Removes a like from a card on the server.
 * @param {string} cardID - The ID of the card to remove the like from.
 * @returns {Promise<Object>} A Promise that resolves with the updated card data.
 */
export const deleteLike = (cardID) => makeRequest(`cards/likes/${cardID}`, 'DELETE');