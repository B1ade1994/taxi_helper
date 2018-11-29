import { registerConstants } from 'src/constants';
import { api, setAuthToken } from 'src/_utils';

function startRegister() {
  return { type: registerConstants.REGISTER_REQUEST };
}

function successRegister(user) {
  return { type: registerConstants.REGISTER_SUCCESS, payload: user };
}

function failRegister(errors) {
  return { type: registerConstants.REGISTER_FAILURE, payload: errors };
}

export function register(phoneNumber, password, passwordConfirmation) {
  return (dispatch) => {
    dispatch(startRegister());

    const data = { api_v1_user: { phoneNumber, password, passwordConfirmation } };
    api.post('/register', data)
      .then((response) => {
        const jwt = response.headers.authorization;
        setAuthToken(jwt);
        dispatch(successRegister());
      })
      .catch((error) => {
        dispatch(failRegister(error.response.data));
      });
  };
}
