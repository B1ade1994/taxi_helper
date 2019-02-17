import React from 'react';
import { Link } from 'react-router-dom';
import { Item, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { orderConstants } from 'src/constants';

export const Order = ({ order }) => {
  const { id, clientPhoneNumber, clientName, addressStart, addressEnd, flightNumber, taxiArrivalDt, taxiArrivalTm, passengerCount, comment, totalCost, dispatcherCommission, status } = order;
  const carClass = orderConstants.carClassOptions.find(obj => obj.value === order.carClass).text;
  const paymentMethod = orderConstants.paymentMethodOptions.find(obj => obj.value === order.paymentMethod).text;

  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Meta>Телефон клиента</Item.Meta>
          <Header as="h1">{clientPhoneNumber}</Header>

          <Item.Meta>Имя клиента</Item.Meta>
          <Header as="h1">{clientName}</Header>

          <Item.Meta>Адрес отправки</Item.Meta>
          <Header as="h1">{addressStart}</Header>

          <Item.Meta>Адрес прибытия</Item.Meta>
          <Header as="h1">{addressEnd}</Header>

          <Item.Meta>Номер рейса</Item.Meta>
          <Header as="h1">{flightNumber}</Header>

          <Item.Meta>Дата подачи</Item.Meta>
          <Header as="h1">{taxiArrivalDt}</Header>

          <Item.Meta>Время подачи</Item.Meta>
          <Header as="h1">{taxiArrivalTm}</Header>

          <Item.Meta>Адрес прибытия</Item.Meta>
          <Header as="h1">{addressEnd}</Header>

          <Item.Meta>Класс авто</Item.Meta>
          <Header as="h1">{carClass}</Header>

          <Item.Meta>Количество пассажиров</Item.Meta>
          <Header as="h1">{passengerCount}</Header>

          <Item.Meta>Способ оплаты</Item.Meta>
          <Header as="h1">{paymentMethod}</Header>

          <Item.Meta>Комментарий к заказу</Item.Meta>
          <Header as="h1">{comment}</Header>

          <Item.Meta>Общая стоимость</Item.Meta>
          <Header as="h1">{totalCost}</Header>

          <Item.Meta>Комиссия диспетчера</Item.Meta>
          <Header as="h1">{dispatcherCommission}</Header>
        </Item.Content>
      </Item>

      <br />
      <Link to="/orders">
        <Button secondary>Назад</Button>
      </Link>
      <Link to={`/orders/${id}/edit`}>
        <Button secondary>Редактировать</Button>
      </Link>
    </Item.Group>
  );
};

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    clientPhoneNumber: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    flightNumber: PropTypes.string.isRequired,
    passengerCount: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    taxiArrivalDt: PropTypes.string.isRequired,
    taxiArrivalTm: PropTypes.string.isRequired,
    addressStart: PropTypes.string.isRequired,
    addressEnd: PropTypes.string.isRequired,
    carClass: PropTypes.string.isRequired,
    totalCost: PropTypes.number.isRequired,
    dispatcherCommission: PropTypes.number.isRequired,
  }).isRequired,
};
