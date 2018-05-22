import { combineReducers } from 'redux'
import { authentication } from './authentication.reducer';
import { error } from './error.reducer'
import { menu } from './role-menu.reducer'
import { books } from './books.reducer'
import { bookConstants as C } from '../constans/book.constans';


const rootReducer = combineReducers({
    error,
    authentication,
    //menu,
    books,
    authors,
    genres,
    selectedGenre,
    searchingString,
    paging

});

const selectedGenre = (state = "", action) => {
    switch (action.type) {
        case C.SET_GENRE:
            return action;

        default:
            return state
    }
}

const searchingString = (state = "", action) => {
    switch (action.type) {
        case C.SET_SEARCH_STRING:
            return action;

        default:
            return state
    }
}

const paging = (state = {}, action) => {
    switch (action.type) {
        case C.SET_PAGING_INFO:
            return {
                currentPage: action.currentPage,
                temsPerPage: action.temsPerPage,
                totalItems: action.totalItems
            }
        case C.SET_PAGING:
            return {
                ...state,
                currentPage: action
            }

        default:
            return state
    }
}

const authors = (state = [], action) => {
    switch (action.type) {
        case C.SET_AUTHORS:
            return action;

        default:
            return state
    }
}
const genres = (state = [], action) => {
    switch (action.type) {
        case C.SET_GENRES:
            return action;

        default:
            return state
    }
}


export default rootReducer;