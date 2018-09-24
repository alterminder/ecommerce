import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Header, Card, Icon, Button, Grid } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/actions';

import config from '../../config/config';

import './styles.css';

class ProductDetails extends Component {
  static isAnyCached(images) {
    return images
      .map((image) => {
        const newImage = new Image();
        newImage.src = image.original;
        return newImage.complete;
      })
      .filter(isCached => isCached === false);
  }

  constructor(props) {
    super(props);

    this.state = {
    };

    this.addItem = this.addItem.bind(this);
  }

  getCategories() {
    return this.props.product.categories.map(category => category.name).join(', ');
  }

  getImageGallery() {
    return this.props.product.images.map(image => ({ original: image.src }));
  }

  /**
   * Add product to cart.
   */
  addItem() {

    const { dispatch } = this.props;
    const product = this.props.product;

    dispatch(
      addProduct(
        product.id,
        product.name,
        product.price,
        product.images[0].src,
      ),
    );

    toastr.success('Added to Cart', product.name + ' was added to your shopping cart.');
  }

  render() {
    const anyCached =
      ProductDetails.isAnyCached(this.getImageGallery())[0] === false
        ? ProductDetails.isAnyCached(this.getImageGallery())[0]
        : true;

    return (
      <div>
        <Grid container stackable>
        <Grid.Row stretched>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Card fluid centered>
                <ImageGallery
                  items={this.getImageGallery()}
                  slideDuration={550}
                  showPlayButton={false}
                  showThumbnails={false}
                  showNav={window.navigator.onLine || anyCached}
                  disableSwipe={!window.navigator.onLine || !anyCached}
                />
              </Card>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Card fluid centered>
                <Card.Content>
                  <Card.Header as={Header}>
                    {this.props.product.name}
                  </Card.Header>
                  {this.props.product.categories.length === 0 ? null : (
                    <Card.Meta>{this.getCategories()}</Card.Meta>
                  )}
                  {this.props.product.price ?
                  (
                    <Header as="h3" color="orange">
                      <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.product.price }} />
                    </Header>
                  ) : null}

                  <Card.Description>
                    <div dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
                  </Card.Description>
                </Card.Content>
                <Button color="black" fluid onClick={this.addItem}>
                  ADD TO CART &nbsp;<Icon name="cart" />
                </Button>
              </Card>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
