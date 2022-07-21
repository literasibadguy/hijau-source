import createStore from 'unistore'
import devtools from 'unistore';

const initialState = {
    isNavigationDrawerOpen: false
}

// eslint-disable-next-line no-undef
let viewStore = devtools(createStore(initialState));

export {viewStore};