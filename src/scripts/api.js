// API CONSTANTS  
const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-13';
const AUTHORIZATION_KEY = '70d4b308-094b-447b-90dc-851238a69354';


// Helper function to handle responses
const handleResponse = async (response) => {
    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    } 
    return response.json();
};



// Helper function to make API calls
/**
 * Base implementation of POST request
 * @param {string} uri partial path after base URL
 * @param {POST|PUT|DELETE} method HTTP request method 
 * @param {object | data} data to send to the server. Null by default -> no DATA = regular GET request. 
 */ 
const makeRequest = async (uri, method = "GET", data = null) => {
    const options = {
        method,
        headers : {
            'Authorization': AUTHORIZATION_KEY,
            'Content-Type': 'application/json'
        }
    };

    if(data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch (`${BASE_URL}/${uri}`, options);
        return await handleResponse(response);
    } catch (error) {
        console.error (`${method} request failed:`, error);
        throw error;
    }
};

// API methods 
export const getUserData = () => makeRequest('users/me');

export const getInitialCardsToLoad = () => makeRequest('cards');

export const patchChangedProfileData = (name, about) => makeRequest('users/me', 'PATCH', { name, about });

export const postNewCard = (name, link) => makeRequest('cards', 'POST', { name, link });

export const deleteFromTheServer = (id) => makeRequest(`cards/${id}`, 'DELETE');

export const patchNewLike = (cardID, likes) => makeRequest(`cards/likes/${cardID}`, 'PUT', { likes });

export const deleteLike = (cardID) => makeRequest(`cards/likes/${cardID}`, 'DELETE' );

