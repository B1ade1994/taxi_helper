import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { orderConstants } from 'src/constants';

export class OrdersSearchBar extends Component {
  onSubmitBtnClickHandler = (e) => {
    e.preventDefault();

    const { getOrders } = this.props;
    const { addressStartCont, addressEndCont, taxiArrivalDtQteq, taxiArrivalDtLteq, taxiArrivalTmQteq, taxiArrivalTmLteq, carClassEq, totalCostGteq, totalCostLteq } = this.props;
    const searchParams = { addressStartCont, addressEndCont, taxiArrivalDtQteq, taxiArrivalDtLteq, taxiArrivalTmQteq, taxiArrivalTmLteq, carClassEq, totalCostGteq, totalCostLteq };

    getOrders(searchParams);
  }

  render() {
    const { onChange } = this.props;
    const { addressStartCont, addressEndCont, taxiArrivalDtQteq, taxiArrivalDtLteq, taxiArrivalTmQteq, taxiArrivalTmLteq, carClassEq, totalCostGteq, totalCostLteq } = this.props;

    return (
      <Form onSubmit={this.onSubmitBtnClickHandler}>
        <Form.Group widths="equal">
          <Form.Input
            label="Откуда"
            name="addressStartCont"
            value={addressStartCont}
            onChange={onChange}
            placeholder="Симферополь"
            width={2}
          />
          <Form.Input
            label="Куда"
            name="addressEndCont"
            value={addressEndCont}
            onChange={onChange}
            placeholder="Севастополь"
            width={2}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Дата от"
            name="taxiArrivalDtQteq"
            type="date"
            value={taxiArrivalDtQteq}
            onChange={onChange}
            width={2}
          />
          <Form.Input
            label="Дата по"
            name="taxiArrivalDtLteq"
            type="date"
            value={taxiArrivalDtLteq}
            onChange={onChange}
            width={2}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Время от"
            name="taxiArrivalTmQteq"
            type="time"
            value={taxiArrivalTmQteq}
            onChange={onChange}
            width={2}
          />
          <Form.Input
            label="Время по"
            name="taxiArrivalTmLteq"
            type="time"
            value={taxiArrivalTmLteq}
            onChange={onChange}
            width={2}
          />
        </Form.Group>
        <Form.Select
          label="Класс авто"
          name="carClassEq"
          value={carClassEq}
          onChange={onChange}
          options={orderConstants.carClassOptions}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Стоимость от"
            name="totalCostGteq"
            type="number"
            value={totalCostGteq}
            onChange={onChange}
            min={0}
            width={2}
          />
          <Form.Input
            label="Стоимость по"
            name="totalCostLteq"
            type="number"
            value={totalCostLteq}
            onChange={onChange}
            min={0}
            width={2}
          />
        </Form.Group>

        <Button type="submit" className="black" fluid>Поиск</Button>
      </Form>
    );
  }
}

OrdersSearchBar.propTypes = {
  addressStartCont: PropTypes.string.isRequired,
  addressEndCont: PropTypes.string.isRequired,
  taxiArrivalDtQteq: PropTypes.string.isRequired,
  taxiArrivalDtLteq: PropTypes.string.isRequired,
  taxiArrivalTmQteq: PropTypes.string.isRequired,
  taxiArrivalTmLteq: PropTypes.string.isRequired,
  carClassEq: PropTypes.string.isRequired,
  totalCostGteq: PropTypes.string.isRequired,
  totalCostLteq: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
};
