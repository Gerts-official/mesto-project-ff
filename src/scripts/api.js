// API CONSTANTS
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-13';
const AUTHORIZATION_KEY = '70d4b308-094b-447b-90dc-851238a69354';

// Helper function to handle responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};

// Helper function to make API calls
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

//  ==================================================================================== API METHODS
// Get the user's data from the server
export const getUserData = () => makeRequest('users/me');

// Get the initial set of cards from the server
export const getInitialCardsToLoad = () => makeRequest('cards');

// Send the user's profile data to the server
export const patchChangedProfileData = (name, about) => makeRequest('users/me', 'PATCH', { name, about });

// Send a new card to the server
export const postNewCard = (name, link) => makeRequest('cards', 'POST', { name, link });

// Delete a card from the server
export const deleteFromTheServer = (id) => makeRequest(`cards/${id}`, 'DELETE');

// Adds a like to a card on the server
export const patchNewLike = (cardID, likes) => makeRequest(`cards/likes/${cardID}`, 'PUT', { likes });

// Removes a like from a card on the server
export const deleteLike = (cardID) => makeRequest(`cards/likes/${cardID}`, 'DELETE');

// Send new avatar to the server 
export const patchChangeUserAvatar = (avatar) => makeRequest('users/me/avatar', 'PATCH', { avatar });