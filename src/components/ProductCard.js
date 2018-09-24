import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header, Icon, Image, Grid } from 'semantic-ui-react';
import config from '../config/config';

class ProductCard extends Component {
  render() {
    const categories = this.props.categories.map(category => category.name);

    return (
      <Grid.Column mobile={16} tablet={8} computer={4}>
      <Card fluid centered>
              <Link to={'/product/' + this.props.id}> 
                <Image src={this.props.src} fluid />
              </Link>
        <Card.Content>
              <Card.Header className="break-words">{this.props.name}</Card.Header>
              <Card.Meta>{categories.join(', ')}</Card.Meta>
              <Card.Description>
              {this.props.short_description ?
                (
                  <div dangerouslySetInnerHTML={{ __html: this.props.short_description }} />
                )
              : null}
              {this.props.price ?
                (
                  <Header as="h3" color="orange">
                    <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.price }} />
                  </Header>
                )
                : null}
                </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={'/product/' + this.props.id}>
              <Button color="black" icon labelPosition='right' size='small' fluid>
                Shop Now <Icon name='cart' />
              </Button>
            </Link>
          </Card.Content>
      </Card>
      </Grid.Column>

    );
  }
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductCard;
