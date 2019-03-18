import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer'

const persistConfig = {
  key: 'root',
  storage: storage,
  // whitelist: ['authUserInfoReducer'], // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middlewares = [thunk];
if (__DEV__ === true) {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default () => {
  let store = compose(applyMiddleware(...middlewares))(createStore)(
    persistedReducer,
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
