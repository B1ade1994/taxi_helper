import { profileConstants } from 'src/constants';

const initialState = {
  id: null,
  phoneNumber: '',
  email: null,
  role: 'driver',
  personalAccount: '',
  name: '',
  photo: '',
  cars: [],
  isLoading: false,
  errors: {},
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case profileConstants.LOAD_PROFILE:
      return { ...state, ...action.payload };
    case profileConstants.SAVE_REQUEST:
      return { ...state, isLoading: true, errors: {} };
    case profileConstants.SAVE_SUCCESS:
      return { ...state, isLoading: false, errors: {} };
    case profileConstants.SAVE_FAILURE:
      return { ...state, isLoading: false, errors: action.payload.errors };
    case profileConstants.PROFILE_UNLOADED:
      return initialState;
    default:
      return state;
  }
}
