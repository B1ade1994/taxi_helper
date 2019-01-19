import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Grid } from 'semantic-ui-react';

export class Car extends Component {
  render() {
    const { car } = this.props;
    const { brand, model, color, number, photo } = car;

    return (
      <Card>
        <Image size="medium" src="https://i.ytimg.com/vi/cFmFACENiGs/maxresdefault.jpg" />

        <Card.Content>
          <Grid centered="true">
            <Grid.Column width="6">
              <Card.Meta>Марка</Card.Meta>
              <Card.Header>{brand}</Card.Header>

              <Card.Meta>Модель</Card.Meta>
              <Card.Header>{model}</Card.Header>
            </Grid.Column>

            <Grid.Column width="5">
              <Card.Meta>Цвет</Card.Meta>
              <Card.Header>{color}</Card.Header>

              <Card.Meta>Номер</Card.Meta>
              <Card.Header>{number}</Card.Header>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

Car.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    // photo: PropTypes.string.isRequired,
  }).isRequired,
};
