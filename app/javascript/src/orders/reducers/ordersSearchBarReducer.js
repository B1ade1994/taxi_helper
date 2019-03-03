import { orderConstants } from 'src/constants';

const initialState = {
  addressStartCont: '',
  addressEndCont: '',
  taxiArrivalDtQteq: '',
  taxiArrivalDtLteq: '',
  taxiArrivalTmQteq: '',
  taxiArrivalTmLteq: '',
  carClassEq: 'any',
  totalCostGteq: '',
  totalCostLteq: '',
};

export function ordersSearchBarReducer(state = initialState, action) {
  switch (action.type) {
    case orderConstants.SEARCH_BAR_UPDATE_FIELD:
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
}
