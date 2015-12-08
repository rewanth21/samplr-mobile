import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SurveyActions from '../actions/SurveyActions';
import * as GeneralActions from '../actions/GeneralActions';
import * as HomeActions from '../actions/HomeActions';
import * as Style from '../constants/Style';

export class Survey extends Component {
  static propTypes = {
    // Available survey questions
    survey: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired,
    generalActions: PropTypes.object.isRequired
  };

  componentWillReceiveProps() {
    // If there are no more questions, reroute to the home page
    const { survey, generalActions, homeActions } = this.props;
    if (survey.questions.length == 0) {
      generalActions.routeToPage("/main");
      homeActions.createNotification("Thank you for taking a survey!");
    }
  }

  answeredQuestions() {
    return this.props.survey.answeredQuestions.length;
  }

  totalQuestions() {
    return this.props.survey.answeredQuestions.length +
           this.props.survey.questions.length;
  }

  render() {
    const { survey, surveyActions } = this.props;

    // Just a safety check
    if (survey.questions.length == 0) {
      return <div></div>;
    }

    var currentQuestion = survey.questions[0].question;
    var answerButtons = currentQuestion.responses.map((response, index) => {
      let value = response.value;
      return <div>
             <button key={index}
                     style={Style.primaryButton}
                     onClick={() => surveyActions.answerQuestion(value)}>{response.text}</button>
            </div>
    });

    return (
      <div style={Style.CONTAINER_BASE}>
        <div style={Style.largeType}>{currentQuestion.title}</div>
        <div>{answerButtons}</div>
        <div style={this.styles.outerBar}>
          <div style={::this.innerBarStyle()}></div>
        </div>
        <div style={Style.smallType}>{::this.answeredQuestions()} / {::this.totalQuestions()} Questions Answered</div>
      </div>
    );
  }

  /**
   * Calculates the style needed for the progress bar
   */
  innerBarStyle() {
    const { survey } = this.props;
    var percentAnswered = Math.round((this.answeredQuestions() / this.totalQuestions()) * 100);
    return {
      height: '100%',
      backgroundColor: Style.GREEN,
      width: percentAnswered.toString() + '%'
    }
  }

  styles = {
    outerBar: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20px',
      backgroundColor: Style.BLUE,
      border: '1px solid white',
      width: '230px',
      height: '16px'
    }
  }
}

export default connect(state => ({
  survey: state.survey
}), dispatch => ({
  surveyActions: bindActionCreators(SurveyActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch),
  homeActions: bindActionCreators(HomeActions, dispatch)
}))(Survey);
