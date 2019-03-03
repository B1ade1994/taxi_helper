import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrdersSearchBar } from 'src/orders/components';
import { getOrders, updateOrdersSearchBarField } from 'src/orders/actions';

class OrdersSearchBarContainer extends Component {
  render() {
    const { getOrders, updateOrdersSearchBarField } = this.props;
    const { addressStartCont, addressEndCont, taxiArrivalDtQteq, taxiArrivalDtLteq, taxiArrivalTmQteq, taxiArrivalTmLteq, carClassEq, totalCostGteq, totalCostLteq } = this.props.ordersSearchBar;

    return (
      <OrdersSearchBar
        addressStartCont={addressStartCont}
        addressEndCont={addressEndCont}
        taxiArrivalDtQteq={taxiArrivalDtQteq}
        taxiArrivalDtLteq={taxiArrivalDtLteq}
        taxiArrivalTmQteq={taxiArrivalTmQteq}
        taxiArrivalTmLteq={taxiArrivalTmLteq}
        carClassEq={carClassEq}
        totalCostGteq={totalCostGteq}
        totalCostLteq={totalCostLteq}
        onChange={updateOrdersSearchBarField}
        getOrders={getOrders}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ordersSearchBar: store.ordersSearchBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: query => dispatch(getOrders(query)),
    updateOrdersSearchBarField: (e, data) => dispatch(updateOrdersSearchBarField(e, data)),
  };
};

const connectedOrdersSearchBar = connect(mapStateToProps, mapDispatchToProps)(OrdersSearchBarContainer);
export { connectedOrdersSearchBar as OrdersSearchBarContainer };
