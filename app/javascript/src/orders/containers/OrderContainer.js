import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Order } from 'src/orders/components';
import { getOrder, unloadOrder } from 'src/orders/actions';
import { Loader } from 'semantic-ui-react';

class OrderContainer extends Component {
  componentWillMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.unloadOrder();
  }

  render() {
    const { order } = this.props;
    const { isLoading } = order;

    if (!order.id) {
      return <Loader active={isLoading} />;
    }

    return (
      <Order order={order} />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    order: store.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: orderId => dispatch(getOrder(orderId)),
    unloadOrder: () => dispatch(unloadOrder()),
  };
};

const connectedOrder = connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
export { connectedOrder as OrderContainer };
