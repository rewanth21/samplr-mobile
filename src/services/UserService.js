import request from 'superagent';
import { DEV_API_ROOT } from '../constants/Service';
import * as CredentialsActions from '../actions/CredentialsActions';
import * as GeneralActions from '../actions/GeneralActions';

export function login(email, password, success, error) {
  request
    .post(DEV_API_ROOT + 'auth/login')
    .set('Content-Type', 'application/json')
    .send({email: email, password: password})
    .end((err, res) => {
      console.log(err);
      console.log(res);

      var responseBody = JSON.parse(res.text);

      if (!err) {
        success(responseBody);
      } else {
        error(err);
      }
    });
}

export function getUserInfo(success, error) {
  success("Tim", 14, [800, 2000]);
}
