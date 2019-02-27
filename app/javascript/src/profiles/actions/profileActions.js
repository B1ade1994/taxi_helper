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

function setProfileAttrs(data) {
  return { type: commonConstants.SET_PROFILE_ATTRS, payload: data };
}

function loadProfile(profile) {
  return { type: profileConstants.LOAD_PROFILE, payload: profile };
}

export function saveProfile(profile, ownProps) {
  return (dispatch) => {
    dispatch(startSave());

    api.put('/profile', { user: profile })
      .then(() => {
        // загрузить поля в auth редусер
        dispatch(setProfileAttrs({ role: profile.role, name: profile.name }));

        profile.cars = profile.cars_attributes.filter(car => !car._destroy);
        delete profile.cars_attributes;

        dispatch(loadProfile(profile));
        dispatch(successSave());
        ownProps.history.push('/profile');
      })
      .catch((error) => {
        dispatch(failSave({ errors: error.response.data.errors }));
      });
  };
}
