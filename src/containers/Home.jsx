import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../actions/HomeActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as SurveyActions from '../actions/SurveyActions';
import * as GeneralActions from '../actions/GeneralActions';
import auth from '../core/auth';
import * as UserService from '../services/UserService';
import * as SurveyService from '../services/SurveyService';
import * as Style from '../constants/Style';

@Radium
export class Home extends Component {
  static propTypes = {
    // Info about the user
    home: PropTypes.object.isRequired,
    // Available survey questions
    survey: PropTypes.object.isRequired,
    credentialsActions: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { homeActions, surveyActions, survey, home, credentials } = this.props;

    console.log("SURVEY LOADED");
    console.log(survey.loaded);
    //if (!survey.loaded) {
      console.log("loading surveys...")
      SurveyService.getQuestions(credentials.user, credentials.token, (questions) => {
        surveyActions.loadedQuestions(questions);
      }, (error) => {
        //TODO: Handle error
      });
   // }

    // If there are any answered questions, send them up to the server
    // This will happen when navigating back from taking the survey
    if (survey.answeredQuestions.length > 0) {
      SurveyService.putQuestions(credentials.user, credentials.token, survey.answeredQuestions, () => {

      }, (error) => {

      });
    }

    // Clear any notifications after 3 seconds
    if (home.notification) {
      setTimeout(homeActions.clearNotification, 3000);
    }
  }

  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
    this.props.generalActions.routeToPage('/login');
  }

  // Brings the user to the survey screen
  handleTakeSurvey() {
    const { generalActions } = this.props;
    generalActions.routeToPage('/survey');
  }

  render() {
    const { home, survey, credentials, homeActions } = this.props;

    // Conditionally create a take survey button
    var availableSurvey = null;
    if (survey.questions.length > 0) {
      availableSurvey = (
        <div>
          <div style={Style.mediumType}> You have survey questions available </div>
          <button key="0"
                  style={[Style.button, Style.primaryButton, Style.mediumType]}
                  onClick={::this.handleTakeSurvey}>Begin</button>
        </div>
      );
    }

    var notification = null;
    if (home.notification) {
      notification = (
        <div style={[{width: '100%', position: 'absolute',
                     top: 0, bottom: 0, backgroundColor: Style.GREEN,
                     height: '30px', paddingTop: '10px'}, Style.smallType]}>{home.notification}</div>
      )
    }

    return (
      <div style={Style.CONTAINER_BASE}>
        {notification}

        <div style={Style.mediumType}>
          Hi {credentials.name}!
        </div>
        {availableSurvey}

        <button key="1"
                style={[Style.button,
                        Style.secondaryButton,
                        Style.smallType]}
                onClick={::this.handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default connect(state => ({
  home: state.home,
  survey: state.survey,
  credentials: state.credentials
}), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  homeActions: bindActionCreators(HomeActions, dispatch),
  surveyActions: bindActionCreators(SurveyActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
}))(Home);
