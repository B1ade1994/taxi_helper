import { logoutConstants } from 'src/constants';
import { api, setAuthToken } from 'src/_utils';

function startLogout() {
  return { type: logoutConstants.LOGOUT_REQUEST };
}

function successLogout() {
  return { type: logoutConstants.LOGOUT_SUCCESS };
}

export function logout() {
  return (dispatch) => {
    dispatch(startLogout());

    api.delete('/logout')
      .then(() => {
        setAuthToken(false);
        dispatch(successLogout());
      })
      .catch((error) => {
        console.log(error.response.data);
        // dispatch(failLogin({ errors: error.response.data }));
      });
  };
}
