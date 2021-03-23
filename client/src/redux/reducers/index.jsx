const INITIAL_STATE = {
    isLoading: false,
    objects: [],
    msg: {}
}
export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_OBJECTS_START':
            return { ...state, isLoading: true, message: '' };
        case 'GET_OBJECTS_SUCCESS':
            return { ...state, objects: action.payload, isLoading: false };
        case 'GET_OBJECTS_ERROR':
            return { ...state, msg: action.payload, isLoading: false };
        default: return state;
    }
}