import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import { Widget, addResponseMessage } from 'react-chat-widget';

import { isMenuVisible } from './components/NavBar/reducer';
import { closeMenu } from './components/NavBar/actions';
import NavBar from './components/NavBar';
import SideMenu from './views/SideMenu';

import './App.css';

import 'react-chat-widget/lib/styles.css';

class App extends Component {

  componentDidMount() {
    addResponseMessage("Welcome to this chat");
  }

  constructor(props) {
    super(props);
    this.hideSidebar = this.hideSidebar.bind(this);
  }

  hideSidebar() {
    if (this.props.sideMenuVisible) {
      this.props.closeMenu();
    }
  }

  handleNewUserMessage = (newMessage) => {
    // Send the message throught the backend API
    addResponseMessage('Hi, how can I help you?');
  }

  render() {
    return (
      <div>
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <Sidebar.Pushable>
          <SideMenu isVisible={this.props.sideMenuVisible} closeMenu={this.props.closeMenu} />
          <Sidebar.Pusher dimmed={this.props.sideMenuVisible} onClick={this.hideSidebar}>
            <NavBar />
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          subtitle=""
          title="Welcome"
        />
      </div>

    );
  }
}

App.propTypes = {
  sideMenuVisible: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

App.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
  sideMenuVisible: isMenuVisible(state.navbar),
});

export default withRouter(
  connect(
    mapStateToProps,
    { closeMenu },
  )(App),
);