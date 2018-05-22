import { errorMessage } from '../constans/error-message.constants'

export function error(state = null, action) {
    switch (action.type) {
        case errorMessage.ERROR:
            return {
                hasError: true,
                type: 'alert-danger',
                message: action.message
            };
        case errorMessage.CLEAR:
            return null;
        default:
            return state
    }
}