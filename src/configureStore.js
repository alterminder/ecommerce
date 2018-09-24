import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as toastr } from 'react-redux-toastr';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import config from './config/config';
import products from './views/Products/reducer';
import cart from './views/Cart/reducer';
import navbar from './components/NavBar/reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'navbar',
    'toastr',
    'products',
    'cart',
  ],
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  products: persistReducer(
    {
      key: 'products',
      storage,
      blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
    },
    products,
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage,
    },
    cart,
  ),
  navbar,
  toastr,
});

const history = createHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history)),
);

persistStore(store);

export { history };
export default store;
