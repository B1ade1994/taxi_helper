import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Orders } from 'src/orders/components';
import { getOrders, unloadOrders } from 'src/orders/actions';

class OrdersContainer extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  componentWillUnmount() {
    this.props.unloadOrders();
  }

  render() {
    const { data, isLoading, errors } = this.props.orders;

    return (
      <Orders
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

const connectedOrders = connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
export { connectedOrders as OrdersContainer };
