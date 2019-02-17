import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { orderConstants } from 'src/constants';

export const OrderItem = ({ order }) => {
  const { addressStart, addressEnd, taxiArrivalDt, taxiArrivalTm, totalCost, dispatcherCommission } = order;
  const carClass = orderConstants.carClassOptions.find(obj => obj.value === order.carClass).text;

  return (
    <Item>
      <Item.Image size="small" src="http://fb.ru/misc/i/thumb/a/2/1/6/9/1/9/8/2169198.jpg" />

      <Item.Content>
        <Item.Header>{addressStart} - {addressEnd}</Item.Header>
        <Item.Meta>{taxiArrivalDt} {taxiArrivalTm}</Item.Meta>
        <Item.Meta>{totalCost} / {dispatcherCommission}</Item.Meta>
        <Item.Meta>{carClass}</Item.Meta>
      </Item.Content>
    </Item>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    taxiArrivalDt: PropTypes.string.isRequired,
    taxiArrivalTm: PropTypes.string.isRequired,
    addressStart: PropTypes.string.isRequired,
    addressEnd: PropTypes.string.isRequired,
    carClass: PropTypes.string.isRequired,
    totalCost: PropTypes.number.isRequired,
    dispatcherCommission: PropTypes.number.isRequired,
  }).isRequired,
};
