const cache = new Map();

// Store in cache with ttl for 5 minutes
const set = (key, value) => cache.set(key, { value, ttl: Date.now() + 300000 });
const find = key => cache.get(key);

const requests = ({ getState }) => next => action => {
    const { type, ...others } = action;
    let { body, remote, isUpload } = action;


    /**
     * This state change is request ?!
     */
    if (remote) {
        const method = (action.method || 'GET').toLowerCase();

        /**
         * Add caching mechanism to GET requests
         */
        if (!method || method.toLowerCase() === 'get') {
            const cached = find(remote);

            // If endpoint is in cache and still valid,
            // return success action with cache
            if (cached && cached.ttl > Date.now()) {
                next({
                    type  : `${type}_SUCCESS`,
                    data  : cached.value.data,
                    cached: true,
                    ...others
                });

                // Return a promise, to be coherent with `request` answer.
                return new Promise(resolve => resolve(cached.value));
            }
        }


        /**
         * Add csrf token to request
         */
        const state = getState();

        console.log('In request file state is ::: ', state);
        if (state.csrf_token._token) {
            const token = state.csrf_token._token;
            if (method !== 'get' && !isUpload) {
                body = body || {};
                body._csrf = token;
            } else {
                remote += (remote.indexOf('?') > -1 ? '&_csrf=' : '?_csrf=') + encodeURIComponent(token);
            }
        }


        /**
         * Add jwt token
         * @type {Headers}
         */
        let fetchHeaders;
        const headersObject = {};
        if (method === 'post' || method === 'put') {
            // headersObject['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (
            state.loginAndRegister.loggedIn
            && state.loginAndRegister.userInfo
            && state.loginAndRegister.userInfo.token
        ){
            headersObject.Authorization = `Bearer ${state.loginAndRegister.userInfo.token}`;
        }
        fetchHeaders = new Headers(headersObject);


        /**
         * Do our fetch
         */
        return fetch(`${process.env.API_URL}${remote}`, {
            method,
            body       : isUpload ? body : JSON.stringify(body),
            mode       : 'cors',
            headers    : fetchHeaders,
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // if user not logged in
                if (data.code === '1001' || data.code === 1001 || data.message === 'jwt expired'){
                    return next({ type: 'DO_LOGIN_FAILURE' });
                }
                return next({ type: `${type}_SUCCESS`, data, ...others });
            })
            .then(data => {
                /**
                 * Cache get requests
                 */
                if (!method || method === 'get') {
                    set(remote, data);
                }

                return data;
            })
            .catch(error => {
                next({ type: `${type}_FAILURE`, error });
                throw new Error(error);
            });
    }

    return next(action);
};

export default requests;
