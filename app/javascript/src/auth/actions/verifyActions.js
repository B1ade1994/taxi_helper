import { verifyConstants } from 'src/constants';
import { api } from 'src/_utils';

function startVerify() {
  return { type: verifyConstants.VERIFY_REQUEST };
}

function successVerify() {
  return { type: verifyConstants.VERIFY_SUCCESS };
}

function failVerify(errors) {
  return { type: verifyConstants.VERIFY_FAILURE, payload: errors };
}

function startUpdateVerifyToken() {
  return { type: verifyConstants.UPDATE_VERIFY_TOKEN_REQUEST };
}

function successUpdateVerifyToken() {
  return { type: verifyConstants.UPDATE_VERIFY_TOKEN_SUCCESS };
}

function failUpdateVerifyToken(errors) {
  return { type: verifyConstants.UPDATE_VERIFY_TOKEN_FAILURE, payload: errors };
}

export function verify(code) {
  return (dispatch) => {
    dispatch(startVerify());

    const data = { code };
    api.put('/verify', data)
      .then(() => {
        dispatch(successVerify());
      })
      .catch((error) => {
        dispatch(failVerify({ errors: error.response.data.errors }));
      });
  };
}

export function updateVerifyToken() {
  return (dispatch) => {
    dispatch(startUpdateVerifyToken());

    api.post('/verify')
      .then(() => {
        dispatch(successUpdateVerifyToken());
      })
      .catch((error) => {
        dispatch(failUpdateVerifyToken({ errors: error.response.data }));
      });
  };
}
