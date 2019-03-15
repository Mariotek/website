export const actionTypes = {
    GET_TOKEN: 'GET_TOKEN'
};

export const getToken = () => ({
    type  : actionTypes.GET_TOKEN,
    remote: '/csrfToken',
    method: 'get'
});
