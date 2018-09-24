import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, Icon, Header } from 'semantic-ui-react';

import './styles.css';

const SideMenu = props => (
  <Sidebar
    as={Menu}
    borderless
    animation="overlay"
    width="thin"
    visible={props.isVisible}
    icon="labeled"
    vertical
    inverted
    color="black"
  >
    <Header as="h2" inverted>
      MENU
    </Header>
    <Link to="/" onClick={props.closeMenu}>
      <Menu.Item name="home">
        <Icon name="home" />Home
      </Menu.Item>
    </Link>
    <Link to="/cart" onClick={props.closeMenu}>
      <Menu.Item name="ordering">
        <Icon name="shopping basket" />Shopping Cart
      </Menu.Item>
    </Link>
  </Sidebar>
);

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default SideMenu;
