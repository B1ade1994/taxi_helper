import { orderConstants } from 'src/constants';

const initialState = {
  data: [],
  isLoading: false,
  errors: {},
};

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case orderConstants.LOAD_ORDERS_REQUEST:
      return { ...state, isLoading: true, errors: {} };
    case orderConstants.LOAD_ORDERS_SUCCESS:
      return { ...state, data: action.payload, isLoading: false, errors: {} };
    case orderConstants.LOAD_ORDERS_FAILURE:
      return { ...state, isLoading: true, errors: action.payload.errors };
    case orderConstants.ORDERS_UNLOADED:
      return initialState;
    default:
      return state;
  }
}
