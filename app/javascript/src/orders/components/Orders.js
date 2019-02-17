import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader, Item } from 'semantic-ui-react';
import { OrderItem } from 'src/orders/components';

export class Orders extends Component {
  render() {
    const { orders, isLoading, errors } = this.props;

    return (
      <Item.Group>
        <Loader active={isLoading} />

        {orders.map(order => (
          <OrderItem order={order} key={order.id} />
        ))}

      </Item.Group>
    );
  }
}

Orders.propTypes = {
  orders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
