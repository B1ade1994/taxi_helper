import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { CarListForm } from 'src/profiles/components';
import _ from 'lodash';
import PropTypes from 'prop-types';

export class ProfileForm extends Component {
  onSubmitBtnClickHandler = (e) => {
    e.preventDefault();

    const { role, personalAccount, name, photo, cars } = this.props;
    const { saveProfile } = this.props;

    saveProfile({ role, personalAccount, name, photo, cars_attributes: cars });
  }

  render() {
    const { role, personalAccount, name, photo, cars, onChange, onCarChange, onAddCar, onRemoveCar, isLoading, errors, canBackBtn } = this.props;

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
            error={_.has(errors, 'personal_account')}
          />
        </Form.Group>

        <Form.Input
          label="Ваше имя"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Имя"
          error={_.has(errors, 'name')}
        />

        {role === 'driver' && (
          <CarListForm
            cars={cars}
            onCarChange={onCarChange}
            onAddCar={onAddCar}
            onRemoveCar={onRemoveCar}
            errors={errors}
          />
        )}

        {canBackBtn && (
          <Link to="/profile">
            <Button secondary>Назад</Button>
          </Link>
        )}
        <Button type="submit" className="black">Сохранить</Button>
      </Form>
    );
  }
}

ProfileForm.propTypes = {
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
  canBackBtn: PropTypes.bool.isRequired,
};
