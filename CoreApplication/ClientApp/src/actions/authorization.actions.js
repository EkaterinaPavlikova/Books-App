import { userConstants } from "../constans/user.constans"
import { userService } from '../services/user.service'
import { errorMessage } from './error-message.actions'


export const userActions = {
    authorize,
    logout,
    register

}


function authorize(login, password) {

    return dispatch => {
        dispatch(request({ login }));
        userService.login(login, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(errorMessage.clear());

                },
                error => {
                    dispatch(failure(error));
                    dispatch(errorMessage.error(error));
                }
            )
    };


    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}

function register(login, password) {

    return dispatch => {
        dispatch(request({ login }));
        userService.register(login, password)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(errorMessage.clear());

                },
                error => {
                    dispatch(failure(error));
                    dispatch(errorMessage.error(error));
                }
            )
    };


    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}