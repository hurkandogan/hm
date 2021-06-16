const INITIAL_STATE = {
    isLoading: false,
    loggedUser: {},
    msg: {}
}
export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN_START':
            return { ...state, isLoading: true, message: '' };
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loggedUser: action.payload, isLoading: false };
        case 'USER_LOGIN_ERROR':
            return { ...state, msg: action.payload, isLoading: false };
        default: return state;
    }
}