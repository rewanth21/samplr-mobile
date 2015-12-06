import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../actions/HomeActions';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as SurveyActions from '../actions/SurveyActions';
import * as GeneralActions from '../actions/GeneralActions';
import auth from '../core/auth';
import * as UserService from '../services/UserService';
import * as SurveyService from '../services/SurveyService';

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
    const { homeActions, surveyActions, survey } = this.props;

    // TODO: move actions to services
    homeActions.loadHomeInfo();
    UserService.getUserInfo((name, surveysCompleted, activeHours) => {
      homeActions.loadedHomeInfo(name, surveysCompleted, activeHours);
    }, (error) => {

    });

    if (!survey.loaded) {
      SurveyService.getQuestions((questions) => {
        surveyActions.loadedQuestions(questions);
      }, (error) => {

      });
    }
  }

  handleLogout() {
    auth.logout();
    this.props.credentialsActions.clearCredentials();
  }

  // Brings the user to the survey screen
  handleTakeSurvey() {
    const { generalActions } = this.props;
    generalActions.routeToPage('/survey');
  }

  render() {
    const { home, survey, homeActions } = this.props;

    if (home.loading) {
      return (
        <div> Loading... </div>
      )
    }

    // Conditionally create a take survey button
    var availableSurvey = null;
    if (survey.questions.length > 0) {
      availableSurvey = (
        <div>
          <div> You have survey questions available </div>
          <button onClick={::this.handleTakeSurvey}> Begin </button>
        </div>
      );
    }

    return (
      <div>
        <div>
          Hi {home.name}!
        </div>
        {availableSurvey}

        <button onClick={::this.handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default connect(state => ({
  home: state.home,
  survey: state.survey
}), dispatch => ({
  credentialsActions: bindActionCreators(CredentialsActions, dispatch),
  homeActions: bindActionCreators(HomeActions, dispatch),
  surveyActions: bindActionCreators(SurveyActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
}))(Home);
