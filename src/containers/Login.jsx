import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CredentialsActions from '../actions/CredentialsActions';
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

    const { credentialsActions } = this.props;
    credentialsActions.addCredentials();

    const email = this.refs.email.getDOMNode().value;
    const password = this.refs.password.getDOMNode().value;

    auth.login(email, password, (authenticated, hint) => {
      if (authenticated) {
        credentialsActions.addCredentialsSucess();
      } else {
        credentialsActions.addCredentialsFailure(hint);
      }
    });
  }

  handleSwitch(e) {
    e.preventDefault();

    const { credentialsActions } = this.props;
    const { registering } = this.props.credentials;
    if (!registering) {
      credentialsActions.switchToRegistering();
    }
  }

  render() {
    const { general, credentials } = this.props;
    const { mounted } = general;
    const { checkingToken, loggingIn, hint, registering } = credentials;
    const hideLogin = (!mounted) || checkingToken || loggingIn;

    var reEnterPasswordInput = null;
    if (registering) {
      reEnterPasswordInput = (
        <div style = {{paddingBottom: '5px'}}>
          <input type="password" ref="password" placeholder="Re-Enter Password"/>
        </div>
      )
    }

    var firstButtonText = registering ? "Register" : "Login";
    var secondButtonText = registering ? "Login" : "Register";

    return (
      <div style={this.styles.base}>

        {/* Container */}
        <div style={{position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>

          {/* Logo */}
          <div>
            <FontAwesome name="check-square-o" style={this.styles.icon}/>
            <h1>Samplr</h1>
          </div>

          {/* Login Form */}
          <div style={{maxHeight: hideLogin ? '0' : '149px', overflow: 'hidden',
                       transition: 'max-height 0.5s ease-in-out'}}>
            <form onSubmit={::this.handleSubmit}>
              <div style={{paddingTop: '5px'}}>
                <input type="text" ref="email" placeholder="Email"/>
              </div>
              <div style={{paddingTop: '5px'}}>
                <input type="password" ref="password" placeholder="Password"/>
                <div style={{height: '1em'}}>{hint && `Hint: ${hint}`}</div>
              </div>
              {reEnterPasswordInput}
              <div style={{paddingTop: '5px'}}>
                <input type="submit" value={firstButtonText}/>
              </div>
            </form>

            <button onClick={::this.handleSwitch}>{secondButtonText}</button>
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

    icon: {
      size: '64px'
    }
  }
}

export default connect(state => ({ general: state.general, credentials: state.credentials }), dispatch => ({ credentialsActions: bindActionCreators(CredentialsActions, dispatch) }))(Login);
