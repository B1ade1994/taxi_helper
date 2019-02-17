import { loginConstants, commonConstants, profileConstants } from 'src/constants';
import { api, setAuthToken } from 'src/_utils';

function startLogin() {
  return { type: loginConstants.LOGIN_REQUEST };
}

function successLogin(user) {
  return { type: loginConstants.LOGIN_SUCCESS, payload: user };
}

function failLogin(errors) {
  return { type: loginConstants.LOGIN_FAILURE, payload: errors };
}

function loadProfile(profile) {
  return { type: profileConstants.LOAD_PROFILE, payload: profile };
}

function appLoaded() {
  return { type: commonConstants.APP_LOADED };
}

export function login(phoneNumber = null, password = null, ownProps = null) {
  return (dispatch) => {
    dispatch(startLogin());

    const data = { api_v1_user: { phoneNumber, password } };
    api.post('/login', data)
      .then((response) => {
        const { data } = response;
        const jwt = response.headers.authorization;
        setAuthToken(jwt);

        dispatch(appLoaded());
        dispatch(loadProfile(data));
        dispatch(successLogin(data));

        if (ownProps) {
          if (data.name) {
            ownProps.history.push('/orders');
          } else {
            ownProps.history.push('/profile/edit');
          }
        }
      })
      .catch((error) => {
        dispatch(appLoaded());
        dispatch(failLogin({ errors: error.response.data }));
      });
  };
}

export function onAppLoad() {
  return (dispatch) => {
    dispatch(appLoaded());
  };
}
