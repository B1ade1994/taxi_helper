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
    { text: 'Универсал', value: 'wagon' },
    { text: 'Комфорт', value: 'comfort' },
    { text: 'Бизнес', value: 'business' },
    { text: 'Минивэн', value: 'minivan' },
    { text: 'Микроавтобус', value: 'minibus' },
    { text: 'Автобус', value: 'bus' },
  ],
  paymentMethodOptions: [
    { text: 'Наличными водителю', value: 'to_driver' },
    { text: 'Перевод на карту (рнкб, QIWI и др.)', value: 'to_card' },
  ],
};
