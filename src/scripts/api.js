// GET user data from the server
export function getUserData() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
        headers: {
            authorization: '70d4b308-094b-447b-90dc-851238a69354'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('[SERVER] Initial  cards load - FAILED');
        }
        return response.json();
    })
    .catch(error => {
        console.error('[SERVER] Profile data load - FAILED', error);
    })
}

// GET initial cards from the server
export function getInitialCardsToLoad (){
    return fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
        headers: {
            authorization: '70d4b308-094b-447b-90dc-851238a69354'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('[SERVER] Initial  cards load - FAILED');
        }
        return response.json();
    })
    .catch(error => {
        console.error('[SERVER] Initial  cards load - FAILED', error);
    })
}


// PATCH new profile data (name / about) on the server.
export function patchChangedPrifileData(profileNewName, profileNewAbout) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '70d4b308-094b-447b-90dc-851238a69354',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profileNewName,
          about: profileNewAbout
        })
    })
    .then(response => {
        if(response.ok) {
            console.log('Profile data update - SUCCESS')
        } else {
            throw new Error('Profile data update - FAILED')
        }
    })
    .catch(error => {
        console.error('Profile data update - FAILED', error);
    })
}

// Post new card to the server
export function postNewCard(newCardName, newCardLink) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
        method: 'POST',
        headers: {
            authorization: '70d4b308-094b-447b-90dc-851238a69354',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newCardName,
            link: newCardLink
        })
    })
    .then(res => {
        if (res.ok) {
            console.log('Send new card to the server - SUCCESS');
            return res.json();
        } else {
            throw new Error('Send new card to the server - FAILED');
        }
    })
   
    .catch(error => {
        console.error('Send new card to the server - FAILED', error);
    });
}

    // Delete card from the server 
export function deleteFromTheServer(id) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': '70d4b308-094b-447b-90dc-851238a69354'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Card deleted successfully');
        } else {
            throw new Error('Failed to delete card from the server');
        }
    })
    .catch(error => {
        console.error('Failed to delete card from the server:', error);
    });
}

// PATCH new like
export function patchNewLike(cardData, profileData) {
    // Получить массив лайков из cardData и добавить в него новый профиль
     const updatedLikes = [profileData];
    // console.log(updatedLikes);
    
    return fetch(`https://nomoreparties.co/v1/wff-cohort-13/cards/likes/${cardData._id}`, {
        method: 'PUT', // Используйте метод PATCH для обновления данных
        headers: {
          authorization: '70d4b308-094b-447b-90dc-851238a69354',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes: profileData // Отправить обновленный массив лайков
        })
    })
    .then(response => {
        if(response.ok) {
            console.log('Like added - SUCCESS')
        } else {
            throw new Error('Profile data update - FAILED')
        }
    })
    .catch(error => {
        console.error('Profile data update - FAILED', error);
    })
}




    