export const orderConstants = {
  ORDER_UNLOADED: 'ORDER_UNLOADED',
  ORDERS_UNLOADED: 'ORDERS_UNLOADED',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SAVE_REQUEST: 'SAVE_REQUEST',
  SAVE_SUCCESS: 'SAVE_SUCCESS',
  SAVE_FAILURE: 'SAVE_FAILURE',
  LOAD_ORDER_REQUEST: 'LOAD_ORDER_REQUEST',
  LOAD_ORDER_SUCCESS: 'LOAD_ORDER_SUCCESS',
  LOAD_ORDER_FAILURE: 'LOAD_ORDER_FAILURE',
  LOAD_ORDERS_REQUEST: 'LOAD_ORDERS_REQUEST',
  LOAD_ORDERS_SUCCESS: 'LOAD_ORDERS_SUCCESS',
  LOAD_ORDERS_FAILURE: 'LOAD_ORDERS_FAILURE',

  carClassOptions: [
    { text: 'Эконом', value: 'economy' },
    { text: 'Бизнес', value: 'business' },
    { text: 'Премиум', value: 'premium' },
  ],
  paymentMethodOptions: [
    { text: 'Наличными водителю', value: 'cash_to_driver' },
    { text: 'Другое', value: 'another' },
  ],
};
