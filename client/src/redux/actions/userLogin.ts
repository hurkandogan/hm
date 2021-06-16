import api from '../../connection/common_http';

export const userLogin = (userData: JSON) => (dispatch) => {
    dispatch({type: "USER_LOGIN_START"});
    api.post("/api/signin", userData)
        .then(response => dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data }))
        .catch(err => console.log({ type: 'USER_LOGIN_ERROR' , payload: err }));
}