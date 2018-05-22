import { bookConstants as C } from '../constans/book.constans';

const book = (state = {}, action) => {
    switch (action.type) {

        case C.ADD_NEW_BOOK:
            return {
                id: action.id,
                title: action.title,
                genre: action.genre,
                author: action.author,
                year: action.year,
                count: action.count,
                isEdit: false
            }
        case C.IS_EDIT_BOOK:
            return (state.id !== action.id) ?
                state : {
                    ...state,
                    isEdit: action.isEdit
                }
        case C.EDIT_BOOK:
            return (state.id !== action.id) ?
                state : {
                    id: action.id,
                    title: action.title,
                    genre: action.genre,
                    author: action.author,
                    year: action.year,
                    count: action.count,
                    isEdit: false
                }

        default:
            return state
    }
}


export const books = (state = [], action) => {
    switch (action.type) {

        case C.SET_BOOKS:
            return action.books;

        case C.ADD_NEW_BOOK:
            return [
                ...state,
                book({}, action)
            ]

        case C.DELETE_BOOK:
            return state.filter(
                c => c.id !== action.id
            )

        case C.IS_EDIT_BOOK:
            return state.map(
                c => book(c, action))
        case C.EDIT_BOOK:
            return state.map(
                c => book(c, action))
        default:
            return state
    }
}