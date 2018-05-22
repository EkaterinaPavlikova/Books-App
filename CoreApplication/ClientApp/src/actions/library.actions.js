import { bookConstants } from "../constans/book.constans"
import { booksService } from '../services/book.service'
import { errorMessage } from './error-message.actions'

export const libraryActions = {
    //AddToCard,
    FilterBooks

}
const changePage = (selectedPage) => ({ type: bookConstants.SET_PAGING, selectedPage }) //
const changetextFilter = (searchString) => ({ type: bookConstants.SET_SEARCH_STRING, searchString })
const genreFilter = (genre) => ({ type: bookConstants.SET_GENRE, genre })
const addBookToCard = (book) => ({ type: bookConstants.ADD_BOOK_TO_CARD, ...book })
const setBooks = (books) => ({ type: bookConstants.SET_BOOKS, books })
const setPagination = (pagingInfo) => ({ type: bookConstants.SET_PAGING, pagingInfo })


function FilterBooks(searchString, selectedPage, genre, filter) {
    return dispatch => {

        switch (filter) {
            case bookConstants.SET_GENRE:
                dispatch(genreFilter(genre))
                break;
            case bookConstants.SET_PAGING:
                dispatch(changePage(selectedPage));
                break;
            case bookConstants.SET_SEARCH_STRING:
                dispatch(changetextFilter(searchString));
                break;
            default:
                break;
        }


        booksService.getBookList(searchString, selectedPage, genre)
            .then(
                data => {
                    dispatch(setBooks(data.Books));
                    dispatch(setPagination(data.pagingInfo));
                    dispatch(errorMessage.clear());
                },
                error => {
                    dispatch(errorMessage.error(error));
                }
            )
    };

}