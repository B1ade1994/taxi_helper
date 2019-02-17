import { orderConstants } from 'src/constants';

const initialState = {
  id: null,
  clientPhoneNumber: '',
  clientName: '',
  addressStart: '',
  addressEnd: '',
  flightNumber: '',
  taxiArrivalDt: '',
  taxiArrivalTm: '',
  carClass: 'economy',
  passengerCount: '',
  paymentMethod: 'cash_to_driver',
  comment: '',
  totalCost: '',
  dispatcherCommission: '',
  status: '',
  isLoading: false,
  errors: {},
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case orderConstants.SAVE_REQUEST: case orderConstants.LOAD_ORDER_REQUEST:
      return { ...state, isLoading: true, errors: {} };
    case orderConstants.SAVE_SUCCESS: case orderConstants.LOAD_ORDER_SUCCESS:
      return { ...state, ...action.payload, isLoading: false, errors: {} };
    case orderConstants.SAVE_FAILURE: case orderConstants.LOAD_ORDER_FAILURE:
      return { ...state, isLoading: false, errors: action.payload.errors };
    case orderConstants.UPDATE_FIELD:
      return { ...state, [action.name]: action.value };
    case orderConstants.ORDER_UNLOADED:
      return initialState;
    default:
      return state;
  }
}
