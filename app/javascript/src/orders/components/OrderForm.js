import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, TextArea, Button } from 'semantic-ui-react';
import InputMask from 'react-input-mask';
import { orderConstants } from 'src/constants';

export class OrderForm extends Component {
  onSubmitBtnClickHandler = (e) => {
    e.preventDefault();

    const { id, clientPhoneNumber, clientName, addressStart, addressEnd, flightNumber, taxiArrivalDt, taxiArrivalTm, carClass, passengerCount, paymentMethod, comment, totalCost, dispatcherCommission } = this.props.order;
    const { createOrder, updateOrder } = this.props;
    const orderParams = { id, clientPhoneNumber, clientName, addressStart, addressEnd, flightNumber, taxiArrivalDt, taxiArrivalTm, carClass, passengerCount, paymentMethod, comment, totalCost, dispatcherCommission };

    if (id) {
      updateOrder(orderParams);
    } else {
      createOrder(orderParams);
    }
  }

  render() {
    const { clientPhoneNumber, clientName, addressStart, addressEnd, flightNumber, taxiArrivalDt, taxiArrivalTm, carClass, passengerCount, paymentMethod, comment, totalCost, dispatcherCommission } = this.props.order;
    let taxiArrivalDtFormat = '';

    if (taxiArrivalDt) {
      taxiArrivalDtFormat = new Date(taxiArrivalDt);
      const year = taxiArrivalDtFormat.getFullYear();
      const month = `0${taxiArrivalDtFormat.getMonth() + 1}`.slice(-2);
      const day = `0${taxiArrivalDtFormat.getDate()}`.slice(-2);

      taxiArrivalDtFormat = `${year}-${month}-${day}`;
    }

    const { onChange, isLoading, errors } = this.props;

    return (
      <Form loading={isLoading} onSubmit={this.onSubmitBtnClickHandler}>
        <Form.Group>
          <Form.Field width={3} error={errors.client_phone_number}>
            <label htmlFor="clientPhoneNumber">Телефон клиента</label>
            <div className="ui input">
              <InputMask
                name="clientPhoneNumber"
                value={clientPhoneNumber}
                onChange={onChange}
                required
                mask="+7 (999) 999-99-99"
                placeholder="Телефон клиента"
              />
            </div>
          </Form.Field>
          <Form.Input
            label="Имя клиента"
            name="clientName"
            value={clientName}
            onChange={onChange}
            placeholder="Имя клиента"
            width={13}
            error={errors.client_name}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Адрес отправки"
            name="addressStart"
            value={addressStart}
            onChange={onChange}
            required
            placeholder="Адрес отправки"
            error={errors.address_start}
          />
          <Form.Input
            label="Адрес прибытия"
            name="addressEnd"
            value={addressEnd}
            onChange={onChange}
            required
            placeholder="Адрес прибытия"
            error={errors.address_end}
          />
        </Form.Group>
        <Form.Input
          label="Номер рейса"
          name="flightNumber"
          value={flightNumber}
          onChange={onChange}
          placeholder="Номер рейса"
          error={errors.flight_number}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Дата подачи"
            name="taxiArrivalDt"
            type="date"
            value={taxiArrivalDtFormat}
            onChange={onChange}
            required
            placeholder="01.01.2018"
            error={errors.taxi_arrival_dt}
          />
          <Form.Input
            label="Время подачи"
            name="taxiArrivalTm"
            type="time"
            value={taxiArrivalTm}
            onChange={onChange}
            required
            placeholder="18:00"
            error={errors.taxi_arrival_tm}
          />
        </Form.Group>
        <Form.Select
          label="Класс авто"
          name="carClass"
          value={carClass}
          onChange={onChange}
          options={orderConstants.carClassOptions}
          error={errors.car_class}
        />
        <Form.Input
          label="Количество пассажиров"
          name="passengerCount"
          type="number"
          min={1}
          value={passengerCount}
          required
          onChange={onChange}
          placeholder="Количество пассажиров"
          error={errors.passenger_count}
        />
        <Form.Select
          label="Способ оплаты"
          name="paymentMethod"
          value={paymentMethod}
          onChange={onChange}
          options={orderConstants.paymentMethodOptions}
          error={errors.payment_method}
        />
        <Form.Field
          control={TextArea}
          label="Комментарий к заказу"
          name="comment"
          value={comment}
          onChange={onChange}
          placeholder="Комментарий к заказу"
          error={errors.comment}
        />
        <Form.Input
          label="Общая стоимость"
          name="totalCost"
          type="number"
          min={0}
          value={totalCost}
          required
          onChange={onChange}
          placeholder="Общая стоимость"
          error={errors.total_cost}
        />
        <Form.Input
          label="Комиссия диспетчера"
          name="dispatcherCommission"
          type="number"
          min={0}
          value={dispatcherCommission}
          required
          onChange={onChange}
          placeholder="Комиссия диспетчера"
          error={errors.dispatcher_commission}
        />

        <Link to="/orders">
          <Button secondary>Назад</Button>
        </Link>
        <Button type="submit" className="black">Сохранить</Button>
      </Form>
    );
  }
}

OrderForm.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    clientPhoneNumber: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    addressStart: PropTypes.string.isRequired,
    addressEnd: PropTypes.string.isRequired,
    flightNumber: PropTypes.string.isRequired,
    taxiArrivalDt: PropTypes.string.isRequired,
    taxiArrivalTm: PropTypes.string.isRequired,
    carClass: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    passengerCount: PropTypes.isRequired,
    totalCost: PropTypes.isRequired,
    dispatcherCommission: PropTypes.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
