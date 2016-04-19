import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as GeneralActions from '../actions/GeneralActions';
import * as HomeActions from '../actions/HomeActions';
import * as UserService from '../services/UserService';
import * as Style from '../constants/Style';

@Radium
export class Login extends Component {

  static propTypes = {
    general: PropTypes.object,
    credentials: PropTypes.object,
    credentialsActions: PropTypes.object
  };

  handleSubmit(e) {
    e.preventDefault();

    const { credentialsActions, generalActions } = this.props;
    credentialsActions.addCredentials();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    UserService.login(email, password, response => {
      credentialsActions.addCredentialsSucess(response.token, response.user.firstName, response.user.id);
      generalActions.routeToPage("/main");
    }, error => {
      // TODO: Add error messaging
    });
  }

  render() {
    const { general, credentials } = this.props;
    const { mounted } = general;
    const { checkingToken, loggingIn, hint, registering } = credentials;
    const hideLogin = (!mounted) || checkingToken || loggingIn;

    return (
      <div style={Style.CONTAINER_BASE}>

        {/* Container */}
        <div>

          {/* Logo */}
          <div style={this.styles.logo}>
            <span>Login</span>
          </div>

          {/* Login Form */}
          <div>
	   <form onSubmit={::this.handleSubmit}>
              <div style={{paddingTop: '5px'}}>
                <input type="text" ref="email" placeholder="Email" style={Style.input}/>
              </div>

              <div style={{paddingTop: '5px'}}>
                <input type="password" ref="password" placeholder="Password" style={Style.input}/>
                <div style={{height: '1em'}}>{hint && `Hint: ${hint}`}</div>
              </div>

              <div style={{paddingTop: '5px'}}>
                <input type="submit"
                       value="Login"
                       style={[Style.button, Style.primaryButton]}/>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }

  styles = {
    logo: {
      height: '64px',
      color: 'white',
      fontSize: '48px'
    },

    icon: {
      width: '64px',
      height: '64px'
    }
  }
}

export default connect(state => ({ general: state.general, credentials: state.credentials }),
                       dispatch => ({ credentialsActions: bindActionCreators(CredentialsActions, dispatch),
                                       generalActions: bindActionCreators(GeneralActions, dispatch) }))(Login);
