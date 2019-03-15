import { actionTypes } from '../actions/csrf_token';

const initialState = [];
const ACTION_HANDLERS = {
    [`${actionTypes.GET_TOKEN}_SUCCESS`]: (state, action) => ({
        _token: action.data._csrf
    }),
    [`${actionTypes.GET_TOKEN}_FAILURE`]: () => ({
        _token: ''
    })
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
};
