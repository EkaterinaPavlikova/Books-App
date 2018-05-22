import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "../reducers"

const logger = store => next => action => {
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
}

const saver = store => next => action => {
    const result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result;
}

const storeFactory = () => applyMiddleware(saver, thunk, logger)(createStore)(
    rootReducer,
    (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : {}
)

export default storeFactory