import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Checkbox, Form, Message, Segment, Header, Grid, Image } from 'semantic-ui-react';
import InputMask from 'react-input-mask';
import { LabelError } from 'src/errors';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class Register extends Component {
  onBtnClickHandler = (e) => {
    e.preventDefault();
    const { phoneNumber, password, passwordConfirmation, register } = this.props;

    register(phoneNumber, password, passwordConfirmation);
  }

  validate = () => {
    const { phoneNumber, password, passwordConfirmation, agree } = this.props;

    if (phoneNumber.length === 11 && password.trim() && passwordConfirmation.trim() && agree) {
      return true;
    }
    return false;
  }

  render() {
    const { phoneNumber, password, passwordConfirmation, handleChange, handleCheckboxChange, isLoading, errors } = this.props;

    return (
      <Grid className="center aligned middle aligned">
        <div className="auth-form column">
          <Header as="h2" className="black center aligned">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcb3g1oAW0UIEvpT8jROvSjxg-kmPrj0C0INId3SksaTvmKrj" />
            Регистрация
          </Header>
          <Form className="large">
            <Segment className="stacked">
              <Form.Field error={!!errors.phone_number}>
                <label htmlFor="phoneNumber">Номер телефона</label>
                <div className="ui fluid input">
                  <InputMask
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    mask="+7 (999) 999-99-99"
                    placeholder="Номер телефона"
                  />
                </div>
                {_.has(errors, 'phone_number') && (<LabelError errors={errors.phone_number} />)}
              </Form.Field>
              <Form.Field error={!!errors.password}>
                <label htmlFor="password">Пароль</label>
                <Input
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Введите пароль"
                  fluid
                />
                {_.has(errors, 'password') && (<LabelError errors={errors.password} />)}
              </Form.Field>
              <Form.Field error={!!errors.password_confirmation}>
                <label htmlFor="passwordConfirmation">Пароль еще раз</label>
                <Input
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={handleChange}
                  type="password"
                  placeholder="Подтвердите пароль"
                  fluid
                />
                {_.has(errors, 'password_confirmation') && (<LabelError errors={errors.password_confirmation} />)}
              </Form.Field>
              <Form.Field>
                <Checkbox
                  label={<label>Я принимаю условия</label>}
                  onChange={handleCheckboxChange}
                />
                <Link to="/info/agreement"> Пользовательского соглашения</Link>
              </Form.Field>

              <Button onClick={this.onBtnClickHandler} className={`black large fluid ${isLoading ? 'loading' : ''}`}>Зарегистрироваться</Button>
            </Segment>
          </Form>

          <Message>
            Уже зарегистрированы? <Link to="/login">Войдите</Link>
          </Message>
        </div>
      </Grid>
    );
  }
}

Register.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  agree: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};
