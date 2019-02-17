import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderForm } from 'src/orders/components';
import { createOrder, updateOrder, getOrder, updateOrderField, unloadOrder } from 'src/orders/actions';

class OrderFormContainer extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getOrder(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.unloadOrder();
  }

  render() {
    const { order, createOrder, updateOrder, updateOrderField } = this.props;
    const { isLoading, errors } = this.props.order;

    return (
      <OrderForm
        order={order}
        onChange={updateOrderField}
        createOrder={createOrder}
        updateOrder={updateOrder}
        isLoading={isLoading}
        errors={errors}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    order: store.order,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createOrder: order => dispatch(createOrder(order, ownProps)),
    updateOrder: order => dispatch(updateOrder(order, ownProps)),
    getOrder: orderId => dispatch(getOrder(orderId)),
    updateOrderField: (e, data) => dispatch(updateOrderField(e, data)),
    unloadOrder: () => dispatch(unloadOrder()),
  };
};

const connectedOrderForm = connect(mapStateToProps, mapDispatchToProps)(OrderFormContainer);
export { connectedOrderForm as OrderFormContainer };
