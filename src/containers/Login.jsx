import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as GeneralActions from '../actions/GeneralActions';
import auth from '../core/auth';
import * as Style from '../constants/Style.js';

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

    auth.login(email, password, (authenticated, hint) => {
      if (authenticated) {
        credentialsActions.addCredentialsSucess();
        generalActions.routeToPage("/main");
      } else {
        credentialsActions.addCredentialsFailure(hint);
      }
    });
  }

  render() {
    const { general, credentials } = this.props;
    const { mounted } = general;
    const { checkingToken, loggingIn, hint, registering } = credentials;
    const hideLogin = (!mounted) || checkingToken || loggingIn;

    return (
      <div style={this.styles.base}>

        {/* Container */}
        <div>

          {/* Logo */}
          <div style={this.styles.logo}>
            {/* TODO: We don't need this stupid library, just use CSS for FontAwesome */}
            <FontAwesome name="check-square-o" style={this.styles.icon}/>
            <span>Samplr</span>
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
                <input type="submit" value="Login" style={[Style.button, Style.primaryButton]}/>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }

  styles = {
    base: {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      textAlign: 'center',
      backgroundColor: Style.BLUE
    },

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
