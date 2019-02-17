import { loginConstants, registerConstants, logoutConstants, verifyConstants, commonConstants } from 'src/constants';

const initialState = {
  appLoaded: false,
  isAuthenticated: false,
  isVerified: false,
  role: null,
  name: null,
  isLoading: false,
  errors: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case commonConstants.APP_LOADED:
      return { ...state, appLoaded: true };

    case commonConstants.SET_PROFILE_ATTRS:
      return { ...state, role: action.payload.role, name: action.payload.name };

    case registerConstants.REGISTER_REQUEST: case loginConstants.LOGIN_REQUEST: case verifyConstants.VERIFY_REQUEST: case verifyConstants.UPDATE_VERIFY_TOKEN_REQUEST: case logoutConstants.LOGOUT_REQUEST:
      return { ...state, isLoading: true, errors: {} };

    case registerConstants.REGISTER_SUCCESS: case loginConstants.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, isVerified: action.payload.verified, role: action.payload.role, name: action.payload.name || action.payload.phoneNumber, isLoading: false, errors: {} };

    case registerConstants.REGISTER_FAILURE: case loginConstants.LOGIN_FAILURE: case verifyConstants.VERIFY_FAILURE: case verifyConstants.UPDATE_VERIFY_TOKEN_FAILURE:
      return { ...state, errors: action.payload.errors, isLoading: false };

    case verifyConstants.VERIFY_SUCCESS:
      return { ...state, isVerified: true, isLoading: false, errors: {} };

    case verifyConstants.UPDATE_VERIFY_TOKEN_SUCCESS:
      return { ...state, isLoading: false, errors: {} };

    case logoutConstants.LOGOUT_SUCCESS:
      return { ...initialState, appLoaded: true };

    default:
      return state;
  }
}
