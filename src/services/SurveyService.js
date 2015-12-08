import request from 'superagent';
import { DEV_API_ROOT } from '../constants/Service';

export function getQuestions(user, token, success, error) {
  request
    .get(DEV_API_ROOT + 'user/' + user + '/response')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .end((err, res) => {
      console.log(err);
      console.log(res);

      var responseBody = JSON.parse(res.text);
      console.log(responseBody);
      success(responseBody);
    });
}

export function putQuestions(user, token, questions, success, error) {
  request
    .put(DEV_API_ROOT + 'user/' + user + '/response')
    .set('Content-Type', 'application/json')
    .set('x-access-token', token)
    .send({responses: questions})
    .end((err, res) => {
      console.log(err);
      console.log(res);

    });
}
