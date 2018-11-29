import { loginConstants, registerConstants } from 'src/constants';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  errors: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST: case loginConstants.LOGIN_REQUEST:
      return { ...state, isLoading: true, errors: {} };

    case registerConstants.REGISTER_SUCCESS: case loginConstants.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, isLoading: false, errors: {} };

    case registerConstants.REGISTER_FAILURE: case loginConstants.LOGIN_FAILURE:
      return { ...state, errors: action.payload.errors, isLoading: false };

    case loginConstants.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
