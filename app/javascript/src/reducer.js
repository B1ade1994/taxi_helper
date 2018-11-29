import { combineReducers } from 'redux';
import { authReducer } from 'src/auth/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
});
