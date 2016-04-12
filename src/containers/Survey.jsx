import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SurveyActions from '../actions/SurveyActions';
import * as GeneralActions from '../actions/GeneralActions';
import * as HomeActions from '../actions/HomeActions';
import * as Style from '../constants/Style';
import CheckBoxList from 'react-checkbox-list';
import _ from 'lodash';
import RadioGroup from 'react-radio';

var RES_VALUES = [];
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

  saveList (values) {
    console.log("values::",values);
    RES_VALUES = _.map(values, (x) => {
      return {
        value: x
      }
    });
  }

  saveListForRadioButton(value) {
    console.log("value in saveListForRadioButton::", value);
    RES_VALUES = [];
    RES_VALUES.push({value: value});
  }

  sendResponse(values) {
    console.log("Final Values in sendResponse in survey JSx:", values);
    this.props.surveyActions.answerQuestion(values);
    RES_VALUES = [];
    console.log("refreence-before::",this.refs.respValues);
    this.refs.respValues.reset();
    console.log("state-before::",this.refs.respValues.state.data);

    console.log("state-after::",this.refs.respValues.state.data);
    console.log("refreence-after::",this.refs.respValues);
  }
   /*handleCheckClick(){
      document.getElementById("CheckBoXType").checked=true;
    }*/

    handleRadioClick(){
      document.getElementById("RadioButtonType").checked=true;
    }
    
  

  render() {
    const { survey, surveyActions } = this.props;

    // Just a safety check
    if (survey.questions.length == 0) {
      return <div></div>;
    }

    var currentQuestion = survey.questions[0].question;
    var data = [];
    currentQuestion.responses.map((response, index) => {
      data.push({value: (response.value).toString(), label: response.text})
    });
    console.log("data:", data);
    console.log("GLOBAL RESP:", RES_VALUES);
    if (this.refs.respValues != undefined) {

      this.refs.respValues.setState({data: data});
      console.log("this.refs.respValues.setState({data: data}):", this.refs.respValues.state.data);
    } else {
      console.log("Undefinedddddd")
    }

    var questionType = currentQuestion.questionType;

    console.log("questionType::",questionType);

    if (questionType === "checkbox") {

      return (
        <div style={Style.CONTAINER_BASE}>
          <div style={Style.largeType}>{currentQuestion.title}</div>
          <div style={Style.innercontainer}>
         
        
          <div style={Style.fontType}>
            <CheckBoxList /*id="CheckBoXType"*/ defaultData={data}
                          onChange={this.saveList.bind(this)}
                         /*onClick={this.handleCheckClick.bind(this)}*/
                          ref="respValues" />
                          

          </div>
          </div>
          
          <div>
            <button style={Style.primaryButton}
                    onClick={() => this.sendResponse(RES_VALUES)}
                    /*{() => {
                      var c=document.getElementById("CheckBoXType");
                      if(c.checked===true){
                         this.sendResponse(RES_VALUES);
                       }else{
                        alert("Please select atleast one answer.");
                       }
                     }
                    }*/
             >Next</button>
          </div>
          <div style={this.styles.outerBar}>
            <div style={::this.innerBarStyle()}></div>
          </div>
          <div style={Style.smallType}>{::this.answeredQuestions()} / {::this.totalQuestions()} Questions Answered</div>
        </div>
      );

    } else if (questionType === "radiobutton") {

      var radioButtons = [];
      currentQuestion.responses.forEach((response, index) => {

        radioButtons.push(
          (<div>
            <input type="radio" value={response.value} />{response.text}
          </div>)
        );
      });

      return (
        <div style={Style.CONTAINER_BASE}>
          <div style={Style.largeType}>{currentQuestion.title}</div>
          <div style={Style.innercontainer}>
       
        
          <div style={Style.fontType}>
            <RadioGroup  id="RadioButtonType" name="responseValues" onChange={this.saveListForRadioButton}
             onClick={this.handleRadioClick.bind(this)} >
           
              {radioButtons}
            </RadioGroup>
            </div>
          </div>
          <div>
            <button style={Style.primaryButton}
                    onClick={() =>{
                     var r=document.getElementById("RadioButtonType");
                     if(r.checked===true){
                      this.sendResponse(RES_VALUES);
                     }else{
                        alert("Please Select aleast one answer");
                     }
                    }

                     }
            >Next</button>
          </div>
          <div style={this.styles.outerBar}>
            <div style={::this.innerBarStyle()}></div>
          </div>
          <div style={Style.smallType}>{::this.answeredQuestions()} / {::this.totalQuestions()} Questions Answered</div>
        </div>
      );

    }


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