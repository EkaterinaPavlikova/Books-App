export const userService = {

    login,
    logout,
    register

};

function login(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ login, password })
    };

    return fetch('api/Account/Login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));

            }

            return user;
        });
}

function register(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ login, password })
    };

    return fetch('api/Account/Register', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));

            }

            return user;
        });
}



function logout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
    };

    fetch('api/Account/Logout', requestOptions);
    localStorage.removeItem('user');
}