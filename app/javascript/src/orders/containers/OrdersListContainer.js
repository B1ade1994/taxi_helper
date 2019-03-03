import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrdersList } from 'src/orders/components';
import { getOrders, unloadOrders } from 'src/orders/actions';

class OrdersListContainer extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  componentWillUnmount() {
    this.props.unloadOrders();
  }

  render() {
    const { data, isLoading, errors } = this.props.orders;

    return (
      <OrdersList
        orders={data}
        isLoading={isLoading}
        errors={errors}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    orders: store.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(getOrders()),
    unloadOrders: () => dispatch(unloadOrders()),
  };
};

const connectedOrdersList = connect(mapStateToProps, mapDispatchToProps)(OrdersListContainer);
export { connectedOrdersList as OrdersListContainer };
