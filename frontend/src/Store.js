// file: src/store.js

import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers';

const Store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            createLogger(),
        ),
        autoRehydrate()
    )
);

persistStore(Store);
export default Store;