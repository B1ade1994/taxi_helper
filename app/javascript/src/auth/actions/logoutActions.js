import { logoutConstants, profileConstants } from 'src/constants';
import { api, setAuthToken } from 'src/_utils';

function startLogout() {
  return { type: logoutConstants.LOGOUT_REQUEST };
}

function successLogout() {
  return { type: logoutConstants.LOGOUT_SUCCESS };
}

function unloadProfile() {
  return { type: profileConstants.PROFILE_UNLOADED };
}

export function logout() {
  return (dispatch) => {
    dispatch(startLogout());

    api.delete('/logout')
      .then(() => {
        setAuthToken(false);
        dispatch(successLogout());
        dispatch(unloadProfile());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
}
