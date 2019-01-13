import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Car } from 'src/profiles/components';
import _ from 'lodash';

export class CarList extends Component {
  renderCars = () => {
    const { cars, onCarChange, onRemoveCar } = this.props;

    return cars.map((car, index) => {
      if (_.has(car, '_destroy')) {
        return null;
      }

      return <Car key={index} car={car} onRemoveCar={onRemoveCar} onCarChange={onCarChange} />;
    });
  }

  render() {
    const { onAddCar } = this.props;
    return (
      <React.Fragment>
        {this.renderCars()}
        <Button type="button" onClick={onAddCar} className="black">Добавить машину</Button>
      </React.Fragment>
    );
  }
}

CarList.propTypes = {
  cars: PropTypes.array.isRequired,
  onCarChange: PropTypes.func.isRequired,
  onAddCar: PropTypes.func.isRequired,
  onRemoveCar: PropTypes.func.isRequired,
};
