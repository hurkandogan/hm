import ObjectService from '../../connection/object.service';

export const getObjects = () => dispatch => {
    dispatch({type: "GET_OBJECTS_START"});
    ObjectService.findAllObjects()
        .then(response => dispatch({ type: 'GET_OBJECTS_SUCCESS', payload: response.data }))
        .catch(err => console.log({ type: 'GET_OBJECTS_ERROR' , payload: err }));
}