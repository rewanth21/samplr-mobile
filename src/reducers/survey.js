import { LOADED_QUESTIONS, ANSWER_QUESTION, CLEAR_ANSWERED_QUESTIONS } from '../constants/SurveyActionTypes';
import _ from 'lodash';

const initialState = {
  questions: [],
  answeredQuestions: [],
  loaded: false
};

function formQuestions(questions, responseValue) {

  let finalQuestions = [];
  var currQuestion = questions[0];
  var currentMainQuestionId = questions[0].question.id;
  var stateQuestions = questions;
  console.log("questionsss::", questions);
  console.log("currQuestion::", currQuestion.question);
  console.log("responseValue::", responseValue[0].value);

  var branchQuestions = currQuestion.question.branches;
  console.log("branches::", branchQuestions);
  console.log("expected::", currQuestion.question.expectedValue);
  if (currQuestion.question.expectedValue == 0) {
    finalQuestions = stateQuestions.slice(1, stateQuestions.length);
    console.log("FinalQuetsions when no branch- w::", finalQuestions)
    return finalQuestions;
  }

  var branchQuestionIdsOnly = [];

  for (var a = 0; a < branchQuestions.length; a++) {
    branchQuestionIdsOnly.push(branchQuestions[a].branchId)
  }

  if (currQuestion.question.questionType === "slider") {
    var tempExpectedValue = "noneExpected";
    if (currQuestion.question.expectedValue == 1) {
      tempExpectedValue = "lower";
    } else {
      tempExpectedValue = "higher";
    }

    var tempActualValue = "noneActual";
    if (responseValue[0].value <= 5) {
      tempActualValue = "lower";
    } else {
      tempActualValue = "higher";
    }
    console.log("tempExpectedValue in slider::", tempExpectedValue)
    console.log("tempActualValue in slider::", tempActualValue);
    if (tempExpectedValue === tempActualValue) {
      console.log("Inside if In slider");
      for (var i = 0; i < branchQuestions.length; i++) {
        var branchId = branchQuestions[i];
        console.log("Inside if expected true in sldier");
        console.log("branchId in slider::", branchId.branchId);
        for (var k = 0; k < stateQuestions.length; k++) {
          var currStateQuestionId = stateQuestions[k].question.id;
          console.log("currStateQuestionId in slider::", currStateQuestionId);
          if (branchId.branchId == currStateQuestionId) {
            console.log("Equal IDS in slider::", stateQuestions[k]);
            finalQuestions.push(stateQuestions[k]);
          }
          console.log("After1 in slider::");
        }
        console.log("After2 in slider::");
      }
      var temp = finalQuestions;
      console.log("Final questions after initial in slider::", temp);
      for (var x = 0; x < stateQuestions.length; x++) {
        var latterStateQuestionId = stateQuestions[x].question.id;
        console.log("latterStateQuestionId In slider::", latterStateQuestionId);
        if (_.includes(branchQuestionIdsOnly,latterStateQuestionId) || (currentMainQuestionId == latterStateQuestionId)) {
          //Dont add
          console.log("Present-Ignore In slider::");
          continue;
        }
        console.log("Absent-Add In slider::");
        finalQuestions.push(stateQuestions[x]);
      }
      console.log("Final-finalQues In slider", finalQuestions);
      return finalQuestions;
    } else {
      for (var b=0; b < stateQuestions.length; b++) {

        var currQuestionIdInAllQuestions = questions[b].question.id;

        if (_.includes(branchQuestionIdsOnly,currQuestionIdInAllQuestions) || (currentMainQuestionId == currQuestionIdInAllQuestions)) {
          continue;
        }

        finalQuestions.push(stateQuestions[b]);
      }
      return finalQuestions;
    }
  }
  //containssssss
  console.log("FinalQuestions- Before true compare", finalQuestions);
  if (currQuestion.question.expectedValue == responseValue[0].value) {

    console.log("Inside if");
    for (var i = 0; i < branchQuestions.length; i++) {
      var branchId = branchQuestions[i];
      console.log("Inside if expected true");
      console.log("branchId::", branchId.branchId);
      for (var k = 0; k < stateQuestions.length; k++) {
        var currStateQuestionId = stateQuestions[k].question.id;
        console.log("currStateQuestionId::", currStateQuestionId);
        if (branchId.branchId == currStateQuestionId) {
          console.log("Equal IDS::", stateQuestions[k]);
          finalQuestions.push(stateQuestions[k]);
        }
        console.log("After1::");
      }
      console.log("After2::");
    }
    var temp = finalQuestions;
    console.log("Final questions after initial::", temp);
    for (var x = 0; x < stateQuestions.length; x++) {
      var latterStateQuestionId = stateQuestions[x].question.id;
      console.log("latterStateQuestionId::", latterStateQuestionId);
      if (_.includes(branchQuestionIdsOnly,latterStateQuestionId) || (currentMainQuestionId == latterStateQuestionId)) {
        //Dont add
        console.log("Present-Ignore::");
        continue;
      }
      console.log("Absent-Add::");
      finalQuestions.push(stateQuestions[x]);
    }
    console.log("Final-finalQues", finalQuestions);
    return finalQuestions;
  } else {

    for (var b=0; b < stateQuestions.length; b++) {

      var currQuestionIdInAllQuestions = questions[b].question.id;

      if (_.includes(branchQuestionIdsOnly,currQuestionIdInAllQuestions) || (currentMainQuestionId == currQuestionIdInAllQuestions)) {
        continue;
      }

      finalQuestions.push(stateQuestions[b]);
    }

  }
  return finalQuestions;
}

export default function survey(state = initialState, action) {
  const { questions, responseValue } = action;

  switch(action.type) {
    case LOADED_QUESTIONS:
      return {
        ...state,
        loaded: true,
        questions
      }

    case ANSWER_QUESTION:
      console.log("ResponseValue in Survey.js::", responseValue);
      return {
        ...state,
        // Remove the answered question from the front
        questions: formQuestions(state.questions, responseValue),
        answeredQuestions: [
          ...state.answeredQuestions,
          {
            id: state.questions[0].id,
            values: responseValue
          }
        ]
      }

    case CLEAR_ANSWERED_QUESTIONS:
      return {
        ...state,
        answeredQuestions: []
      }

    default:
      return state;
  }
}

