import React, { Component, PropTypes } from 'react';
import Router, { Route } from 'react-router';
import { createHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Survey from './Survey.jsx';

import * as GeneralActions from '../actions/GeneralActions';
import * as CredentialsActions from '../actions/CredentialsActions';

import auth from '../core/auth';

@connect(state => ({stores: state}), dispatch => ({ actions: {
  generalActions: bindActionCreators(GeneralActions, dispatch),
  credentialsActions: bindActionCreators(CredentialsActions, dispatch)
}}))

export default class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    const history = createHistory();
    this.state = {
      history,
      isMounted: false
    };

    const { credentialsActions } = props.actions;
    credentialsActions.checkCredentials();
    auth.loggedIn(authenticated => {
      if (authenticated) {
        credentialsActions.checkCredentialsSucess();
      } else {
        setTimeout(() => {
          credentialsActions.checkCredentialsFailure();
        });
      }
    });
  }

  componentDidMount() {
    this.props.actions.generalActions.mount();
  }

  componentDidUpdate(prevProps) {
    console.log("Did update");
    this.state.history.pushState(null, this.props.stores.general.page);
  }

  /**
   * Redirects to the login screen if the user is not logged in.
   */
  checkAuth(nextState, replaceState) {
    if (!this.props.stores.credentials.authenticated) {
      GeneralActions.routeToPage('/login');
    }
  }

  /**
   * Pushes the correct page state to the router based on which page we're on
   */
  handleRedirect(nextState, replaceState) {
    replaceState({ nextPathname: nextState.location.pathname },
                 this.props.stores.general.page);
  }

  render() {
    const { history, isMounted } = this.state;

    return (
      <Router history={history}>
        <Route path="/main" component={Home} onEnter={::this.checkAuth}/>
        <Route path="/survey" component={Survey} onEnter={::this.checkAuth}/>
        <Route path="/login" isFirstRender={(!isMounted)} component={Login}/>
        <Route path="*" onEnter={::this.handleRedirect}/>
      </Router>
    );
  }
}
