import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CarForm } from 'src/profiles/components';
import _ from 'lodash';

export class CarListForm extends Component {
  renderCars = () => {
    const { cars, onCarChange, onRemoveCar, errors } = this.props;

    return cars.map((car, index) => {
      if (_.has(car, '_destroy')) {
        return null;
      }

      const carErrors = {
        brand: errors[`cars[${index}].brand`],
        color: errors[`cars[${index}].color`],
        model: errors[`cars[${index}].model`],
        number: errors[`cars[${index}].number`],
      };
      Object.keys(carErrors).forEach(key => (carErrors[key] === undefined ? delete carErrors[key] : ''));

      return <CarForm key={index} car={car} onRemoveCar={onRemoveCar} onCarChange={onCarChange} errors={carErrors} />;
    });
  }

  render() {
    const { onAddCar } = this.props;
    return (
      <React.Fragment>
        {this.renderCars()}
        <Button type="button" onClick={onAddCar} className="black">Добавить машину</Button>
        <br />
        <br />
      </React.Fragment>
    );
  }
}

CarListForm.propTypes = {
  cars: PropTypes.array.isRequired,
  onCarChange: PropTypes.func.isRequired,
  onAddCar: PropTypes.func.isRequired,
  onRemoveCar: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
