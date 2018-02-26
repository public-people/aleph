import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import {throttle} from 'lodash';

import rootReducer from 'src/reducers';
import {loadState, saveState} from './storage';
import errorToastMiddleware from './error-toast-middleware';
import clippyMiddleware from './clippy-middleware';

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(
    thunk,
    errorToastMiddleware,
    clippyMiddleware,
    // logger
  )
);

store.subscribe(throttle(() => {
  saveState({
    session: store.getState().session
  })
}));

export default store;
