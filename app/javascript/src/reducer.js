import { combineReducers } from 'redux';
import { authReducer } from 'src/auth/reducers';
import { profileReducer } from 'src/profiles/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});
