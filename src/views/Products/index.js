import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Loader, Container } from 'semantic-ui-react';

import { fetchProducts } from './actions';
import { getProductsFetching, getProducts, productPropType } from './reducer';
import ProductsList from '../../components/ProductsList';

class Products extends Component {
  constructor(props) {
    super(props);
    this.loadProducts = this.loadProducts.bind(this);
  }

  componentDidMount() {
    this.readProducts(1);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.categId !== prevProps.match.params.categId) {
      this.readProducts(1);
    }
  }

  getCategoryName(categories) {
    return categories.find(category =>
      Number(category.id) === Number(this.props.match.params.categId)).name;
  }

  loadProducts() {
  }

  readProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      category: this.props.match.params.categId,
      page,
      order: 'asc',
      orderby: 'title',
      per_page: 20,
    }));
  }

  render() {
    const { loading, products } = this.props;

    if (loading === 1 && products.length === 0) {
      return (
        <div>
          <Loader active />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Container>
          <p>No products found.</p>
        </Container>
      );
    }

    return (
        <ProductsList
          products={_.orderBy(products, ['name'], ['asc'])}
          title={this.getCategoryName(products[0].categories)}
        />
    );
  }
}

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products, props.match.params.categId),
});

export default connect(
  mapStateToProps,
)(Products);
