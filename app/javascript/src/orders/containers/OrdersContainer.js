import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { OrdersSearchBarContainer, OrdersListContainer } from 'src/orders/containers';

export class OrdersContainer extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <OrdersSearchBarContainer />
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <OrdersListContainer />
        </Grid.Column>
      </Grid>
    );
  }
}
