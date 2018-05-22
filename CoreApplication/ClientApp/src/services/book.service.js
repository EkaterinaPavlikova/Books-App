export const booksService = {
    addBook,
    deleteBook,
    editBook,
    setBooksEditPage,
    getBookList

};

function getBookList(searchString, selectedPage, genre) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch('api/Book/BooksList?searchString=' + searchString + '&Page=' + selectedPage + '&genre=' + genre, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        });

}

function setBooksEditPage() {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch('api/Book/BooksEditPage', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        });

}

function addBook(book) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    };

    return fetch('api/Book/Create', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return Promise.resolve();
        })

}

function deleteBook(id) {

    return fetch('api/Book/Delete/' + id, {
            method: 'delete'
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return Promise.resolve();
        })

}

function editBook(book) {

    const requestOptions = {
        method: 'post',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch('api/Book/Edit', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return Promise.resolve();
        })


}