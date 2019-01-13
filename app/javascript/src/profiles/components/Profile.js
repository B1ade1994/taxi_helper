import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CarList } from 'src/profiles/components';

export class Profile extends Component {
  onSubmitBtnClickHandler = (e) => {
    e.preventDefault();

    const { saveProfile, role, personalAccount, name, photo, cars } = this.props;

    saveProfile({ role, personalAccount, name, photo, cars_attributes: cars });
  }

  render() {
    const { role, personalAccount, name, photo, cars, onChange, onCarChange, onAddCar, onRemoveCar, isLoading, errors } = this.props;

    return (
      <Form loading={isLoading} onSubmit={this.onSubmitBtnClickHandler}>
        <Form.Group>
          <Form.Select
            label="Выберите свою роль"
            name="role"
            value={role}
            onChange={onChange}
            placeholder="Выберите свою роль"
            options={
              [
                { text: 'Водитель', value: 'driver' },
                { text: 'Диспетчер', value: 'dispatcher' },
              ]
            }
          />
          <Form.Input
            label="Лицевой счет"
            name="personalAccount"
            value={personalAccount}
            onChange={onChange}
            placeholder="Лицевой счет"
            width={14}
          />
        </Form.Group>

        <Form.Input
          label="Ваше имя"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Имя"
        />

        {role === 'driver' && (
          <CarList
            cars={cars}
            onCarChange={onCarChange}
            onAddCar={onAddCar}
            onRemoveCar={onRemoveCar}
          />
        )}

        <Button type="submit" className="black">Сохранить</Button>
      </Form>
    );
  }
}

Profile.propTypes = {
  role: PropTypes.string.isRequired,
  personalAccount: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  cars: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCarChange: PropTypes.func.isRequired,
  onAddCar: PropTypes.func.isRequired,
  onRemoveCar: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
