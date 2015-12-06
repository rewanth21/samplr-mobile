import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SurveyActions from '../actions/SurveyActions';
import * as GeneralActions from '../actions/GeneralActions';

export class Survey extends Component {
  static propTypes = {
    // Available survey questions
    survey: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired,
    generalActions: PropTypes.object.isRequired
  };

  render() {
    const { survey } = this.props;

    var currentQuestion = survey.questions[0];
    var answerButtons = currentQuestion.responses.map(response => {
      return <button> {response.text} </button>
    });

    return (
      <div>
        <div> {currentQuestion.title} </div>
        <div>
          {answerButtons}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  survey: state.survey
}), dispatch => ({
  surveyActions: bindActionCreators(SurveyActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
}))(Survey);
