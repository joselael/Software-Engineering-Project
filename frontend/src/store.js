// file: src/store.js
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk,
      createLogger(),
    ),
    autoRehydrate()
  )
);
persistStore(store);
export default store;