import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import _ from 'lodash';

export class CarForm extends Component {
  handleRemoveCarClick = (e) => {
    e.preventDefault();
    const { car, onRemoveCar } = this.props;

    onRemoveCar(car);
  }

  handleCarChange = (e) => {
    const { car, onCarChange } = this.props;
    onCarChange(e, car);
  }

  render() {
    const { car, errors } = this.props;
    const { brand, model, color, number, photo } = car;

    return (
      <Form.Group>
        <Form.Input
          label="Марка"
          name="brand"
          value={brand}
          onChange={this.handleCarChange}
          placeholder="Марка"
          error={_.has(errors, 'brand')}
        />
        <Form.Input
          label="Модель"
          name="model"
          value={model}
          onChange={this.handleCarChange}
          placeholder="Модель"
          error={_.has(errors, 'model')}
        />
        <Form.Input
          label="Цвет"
          name="color"
          value={color}
          onChange={this.handleCarChange}
          placeholder="Цвет"
          error={_.has(errors, 'color')}
        />
        <Form.Input
          label="Гос. номер"
          name="number"
          value={number}
          onChange={this.handleCarChange}
          placeholder="Гос. номер"
          error={_.has(errors, 'number')}
        />
        <Form.Field>
          <label htmlFor="trash_btn" style={{ opacity: 0 }}>Удалить</label>
          <Button icon="trash" basic onClick={this.handleRemoveCarClick} />
        </Form.Field>
      </Form.Group>
    );
  }
}

CarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    // photo: PropTypes.string.isRequired,
    _destroy: PropTypes.bool,
  }).isRequired,
  onCarChange: PropTypes.func.isRequired,
  onRemoveCar: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
