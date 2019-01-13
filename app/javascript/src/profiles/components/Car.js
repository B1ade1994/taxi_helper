import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

export class Car extends Component {
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
    const { car } = this.props;
    const { brand, model, color, number, photo, errors } = car;

    return (
      <Form.Group>
        <Form.Input
          label="Марка"
          name="brand"
          value={brand}
          onChange={this.handleCarChange}
          placeholder="Марка"
        />
        <Form.Input
          label="Модель"
          name="model"
          value={model}
          onChange={this.handleCarChange}
          placeholder="Модель"
        />
        <Form.Input
          label="Цвет"
          name="color"
          value={color}
          onChange={this.handleCarChange}
          placeholder="Цвет"
        />
        <Form.Input
          label="Гос. номер"
          name="number"
          value={number}
          onChange={this.handleCarChange}
          placeholder="Гос. номер"
        />
        <Form.Field>
          <label htmlFor="trash_btn" style={{ opacity: 0 }}>Удалить</label>
          <Button icon="trash" basic onClick={this.handleRemoveCarClick} />
        </Form.Field>
      </Form.Group>
    );
  }
}

Car.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    // photo: PropTypes.string.isRequired,
    _destroy: PropTypes.bool,
    errors: PropTypes.object,
  }).isRequired,
  onCarChange: PropTypes.func.isRequired,
  onRemoveCar: PropTypes.func.isRequired,
};
