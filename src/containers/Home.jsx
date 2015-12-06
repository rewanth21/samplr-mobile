import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../actions/HomeActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import auth from '../core/auth';
import * as Service from '../services/UserService.js';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    credentialsActions: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { homeActions } = this.props;

    homeActions.loadHomeInfo();
    Service.getUserInfo(123, (name, surveysCompleted, activeHours) => {
      homeActions.loadedHomeInfo(name, surveysCompleted, activeHours);
    }, (error) => {

    });
  }

  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
  }

  render() {
    const { home, homeActions } = this.props;

    if (home.loading) {
      return (
        <div> Loading... </div>
      )
    }

    return (
      <div>
        {home.surveysCompleted}
        {home.name}
      </div>
    );
  }
}

export default connect(state => ({ home: state.home }), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  homeActions: bindActionCreators(HomeActions, dispatch)
}))(Home);
