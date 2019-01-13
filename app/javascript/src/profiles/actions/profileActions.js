import { profileConstants, commonConstants } from 'src/constants';
import { api } from 'src/_utils';

function startSave() {
  return { type: profileConstants.SAVE_REQUEST };
}

function successSave() {
  return { type: profileConstants.SAVE_SUCCESS };
}

function failSave(errors) {
  return { type: profileConstants.SAVE_FAILURE, payload: errors };
}

function setRole(role) {
  return { type: commonConstants.SET_ROLE, payload: role };
}

function loadProfile(profile) {
  return { type: profileConstants.LOAD_PROFILE, payload: profile };
}

export function saveProfile(profile) {
  return (dispatch) => {
    dispatch(startSave());

    api.put('/profile', { user: profile })
      .then(() => {
        dispatch(setRole(profile.role));

        profile.cars = profile.cars_attributes;
        delete profile.cars_attributes;

        dispatch(loadProfile(profile));
        dispatch(successSave());
      })
      .catch((error) => {
        dispatch(failSave({ errors: error.response.data.errors }));
      });
  };
}
