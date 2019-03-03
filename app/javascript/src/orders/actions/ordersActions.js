import { orderConstants } from 'src/constants';
import { api } from 'src/_utils';

// SAVE
function saveStart() {
  // start -> begin
  return { type: orderConstants.SAVE_REQUEST };
}

function saveSuccess(order) {
  return { type: orderConstants.SAVE_SUCCESS, payload: order };
}

function saveFail(errors) {
  return { type: orderConstants.SAVE_FAILURE, payload: errors };
}

// LOAD ORDER
function loadOrderStart() {
  return { type: orderConstants.LOAD_ORDER_REQUEST };
}

function loadOrderSuccess(order) {
  return { type: orderConstants.LOAD_ORDER_SUCCESS, payload: order };
}

function loadOrderFail(errors) {
  return { type: orderConstants.LOAD_ORDER_FAILURE, payload: errors };
}

// LOAD ORDERS
function loadOrdersStart() {
  return { type: orderConstants.LOAD_ORDERS_REQUEST };
}

function loadOrdersSuccess(orders) {
  return { type: orderConstants.LOAD_ORDERS_SUCCESS, payload: orders };
}

function loadOrdersFail(errors) {
  return { type: orderConstants.LOAD_ORDERS_FAILURE, payload: errors };
}

export function createOrder(order, ownProps) {
  return (dispatch) => {
    dispatch(saveStart());

    api.post('/orders', { order })
      .then((response) => {
        dispatch(saveSuccess(response.data));

        ownProps.history.push(`/orders/${response.data.id}`);
      })
      .catch((error) => {
        dispatch(saveFail({ errors: error.response.data.errors }));
      });
  };
}

export function updateOrder(order, ownProps) {
  return (dispatch) => {
    dispatch(saveStart());

    api.put(`/orders/${order.id}`, { order })
      .then(() => {
        dispatch(saveSuccess(order));

        ownProps.history.push(`/orders/${order.id}`);
      })
      .catch((error) => {
        dispatch(saveFail({ errors: error.response.data.errors }));
      });
  };
}

export function getOrder(orderId) {
  return (dispatch) => {
    dispatch(loadOrderStart());

    api.get(`/orders/${orderId}`)
      .then((response) => {
        dispatch(loadOrderSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadOrderFail({ errors: error.response.data.errors }));
      });
  };
}

export function getOrders(query = {}) {
  return (dispatch) => {
    dispatch(loadOrdersStart());

    api.get('/orders', { params: { query } })
      .then((response) => {
        dispatch(loadOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadOrdersFail({ errors: error.response.data.errors }));
      });
  };
}

export function updateOrderField(e, data) {
  return (dispatch) => {
    let { name, value } = e.currentTarget;

    if (name === 'clientPhoneNumber') {
      value = value.replace(/\D/g, '');
    }

    if (name === undefined) {
      ({ name, value } = data);
    }

    dispatch({ type: orderConstants.UPDATE_FIELD, name, value });
  };
}

export function updateOrdersSearchBarField(e, data) {
  return (dispatch) => {
    let { name, value } = e.currentTarget;

    if (name === undefined) {
      ({ name, value } = data);
    }

    dispatch({ type: orderConstants.SEARCH_BAR_UPDATE_FIELD, name, value });
  };
}

export function unloadOrder() {
  return (dispatch) => {
    dispatch({ type: orderConstants.ORDER_UNLOADED });
  };
}

export function unloadOrders() {
  return (dispatch) => {
    dispatch({ type: orderConstants.ORDERS_UNLOADED });
  };
}
