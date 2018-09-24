import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import _ from 'lodash';
import { fetchProducts } from '../Products/actions';
import { getProductsFetching, getProducts, productPropType } from '../Products/reducer';
import ProductsList from '../../components/ProductsList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadProducts = this.loadProducts.bind(this);
  }

  componentDidMount() {
    if (this.props.searchVisible) {
      this.props.closeSearch();
    }

    this.readProducts(1);
  }

  /**
   * Filter and return featured products (if there are any)
   */
  getFilteredProducts() {
    const items = this.props.products.filter(product => product.featured);
    if (items.length > 0) {
      return items;
    }

    return this.props.products;
  }

  loadProducts() {

  }

  readProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      page,
      featured: 0,
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

    // Filter featured products (if there are any)
    const items = this.getFilteredProducts();

    return (
        <ProductsList products={_.orderBy(items, ['name'], ['asc'])} title="Home" />
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(productPropType).isRequired,
};

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
});

export default connect(
  mapStateToProps,
)(Home);
