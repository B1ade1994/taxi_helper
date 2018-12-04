import { loginConstants, registerConstants, logoutConstants, verifyConstants } from 'src/constants';

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  userRole: null,
  isLoading: false,
  errors: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST: case loginConstants.LOGIN_REQUEST: case verifyConstants.VERIFY_REQUEST: case verifyConstants.UPDATE_VERIFY_TOKEN_REQUEST: case logoutConstants.LOGOUT_REQUEST:
      return { ...state, isLoading: true, errors: {} };

    case registerConstants.REGISTER_SUCCESS: case loginConstants.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, isVerified: action.payload.verified, isLoading: false, errors: {} };

    case registerConstants.REGISTER_FAILURE: case loginConstants.LOGIN_FAILURE: case verifyConstants.VERIFY_FAILURE: case verifyConstants.UPDATE_VERIFY_TOKEN_FAILURE:
      return { ...state, errors: action.payload.errors, isLoading: false };

    case verifyConstants.VERIFY_SUCCESS:
      return { ...state, isVerified: true, isLoading: false, errors: {} };

    case verifyConstants.UPDATE_VERIFY_TOKEN_SUCCESS:
      return { ...state, isLoading: false, errors: {} };

    case logoutConstants.LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
