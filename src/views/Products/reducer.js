import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from './actions';

export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state;
    case RECEIVE_PRODUCTS:
      if (Array.isArray(action.products)) {
        return _.unionBy(action.products, state, 'id');
      }
      return _.unionBy([action.products], state, 'id');
    default:
      return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state + 1;
    case RECEIVE_PRODUCTS:
      return state - 1;
    default:
      return state;
  }
};

export const getProducts = (state, category = null) => {
  if (category === null) {
    return state.items;
  }

  return state.items.filter(product =>
    Array.isArray(product.categories) &&
    !_.isNil(_.find(product.categories, { id: Number(category) })));
};

export const getProductsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
