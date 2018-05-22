import { bookConstants } from "../constans/book.constans"
import { booksService } from '../services/book.service'
import { errorMessage } from './error-message.actions'

export const booksActions = {
    Delete,
    Edit,
    Add,
    IsEdit,
    SetBooks
}

const deleteBook = (id) => ({ type: bookConstants.DELETE_BOOK, id })
const isEditBook = (id, isEdit) => ({ type: bookConstants.IS_EDIT_BOOK, id, isEdit })
const editBook = (book) => ({ type: bookConstants.EDIT_BOOK, ...book })
const addBook = (book) => ({ type: bookConstants.ADD_NEW_BOOK, ...book })
const setBooks = (books) => ({ type: bookConstants.SET_BOOKS, books })


function SetBooks() {
    return dispatch => {
        booksService.setBooksEditPage()
            .then(
                books => {
                    dispatch(setBooks(books.map((book) => ({ isEdit: false, ...book }))));
                    dispatch(errorMessage.clear());
                },
                error => {
                    dispatch(errorMessage.error(error));
                }
            )
    };

}

function Add(book) {
    return dispatch => {
        booksService.addBook(book)
            .then(
                () => {
                    dispatch(addBook(book));
                    dispatch(errorMessage.clear());
                },
                error => {
                    dispatch(errorMessage.error(error));
                }
            )
    };

}

function Delete(id) {
    return dispatch => {
        booksService.deleteBook(id)
            .then(
                () => {
                    dispatch(deleteBook(id));
                    dispatch(errorMessage.clear());
                },
                error => {
                    dispatch(errorMessage.error(error));
                }
            )
    };


}

function IsEdit(id, isEdit) {
    return dispatch => {
        dispatch(isEditBook(id, isEdit))
    }

}


function Edit(book) {
    return dispatch => {
        booksService.editBook(book)
            .then(
                () => {
                    dispatch(editBook(book));
                    dispatch(errorMessage.clear());
                },
                error => {
                    dispatch(errorMessage.error(error));
                }
            )
    };

}