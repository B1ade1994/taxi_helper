import { combineReducers } from 'redux';
import { authReducer } from 'src/auth/reducers';
import { profileReducer } from 'src/profiles/reducers';
import { orderReducer, ordersReducer } from 'src/orders/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  order: orderReducer,
  orders: ordersReducer,
});
