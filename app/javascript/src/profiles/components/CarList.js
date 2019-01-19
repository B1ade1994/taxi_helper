import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Car } from 'src/profiles/components';
import { Card } from 'semantic-ui-react';

export class CarList extends Component {
  renderCars = () => {
    const { cars } = this.props;

    return cars.map(car => <Car key={car.id} car={car} />);
  }

  render() {
    return (
      <Card.Group centered="true">
        {this.renderCars()}
      </Card.Group>
    );
  }
}

CarList.propTypes = {
  cars: PropTypes.array.isRequired,
};
