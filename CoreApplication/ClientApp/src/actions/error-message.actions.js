import { errorMessage as request } from "../constans/error-message.constants"

export const errorMessage = {
    error,
    clear
};


function error(message) {
    return { type: request.ERROR, message };
}

function clear() {
    return { type: request.CLEAR };
}