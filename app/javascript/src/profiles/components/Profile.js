import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Item, Header, Button } from 'semantic-ui-react';
import { CarList } from 'src/profiles/components';
import PropTypes from 'prop-types';

export class Profile extends Component {
  render() {
    const { phoneNumber, role, name, photo, cars, rating } = this.props;

    return (
      <Item.Group>
        <Item>
          <Item.Image size="medium" src={photo} />

          <Item.Content>
            <Item.Meta>Имя</Item.Meta>
            <Header as="h1">{name}</Header>

            <Item.Meta>Телефон</Item.Meta>
            <Header as="h1">{phoneNumber}</Header>

            <Item.Meta>Рейтинг</Item.Meta>
            <Header as="h1">{rating}</Header>
          </Item.Content>
        </Item>

        {role === 'driver' && (
          <CarList cars={cars} />
        )}

        <br />

        <Link to="/profile/edit">
          <Button secondary>Редактировать</Button>
        </Link>
      </Item.Group>
    );
  }
}

Profile.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  cars: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
};
