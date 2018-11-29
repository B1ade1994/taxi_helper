import { loginConstants } from 'src/constants';
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

export function login(phoneNumber = null, password = null) {
  return (dispatch) => {
    dispatch(startLogin());

    const data = { api_v1_user: { phoneNumber, password } };
    api.post('/login', data)
      .then((response) => {
        const jwt = response.headers.authorization;
        setAuthToken(jwt);
        dispatch(successLogin());
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(failLogin({ errors: error.response.data }));
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(startLogin());

    api.delete('/logout')
      .then(() => {
        setAuthToken(false);
        dispatch({ type: loginConstants.LOGOUT });
      })
      .catch((error) => {
        console.log(error.response.data);
        // dispatch(failLogin({ errors: error.response.data }));
      });
  };
}
