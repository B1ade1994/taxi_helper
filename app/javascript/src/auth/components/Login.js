import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, Message, Segment, Header, Grid, Image } from 'semantic-ui-react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

export class Login extends Component {
  onBtnClickHandler = (e) => {
    e.preventDefault();
    const { phoneNumber, password, login } = this.props;

    login(phoneNumber, password);
  }

  validate = () => {
    const { phoneNumber, password } = this.props;

    if (phoneNumber.length === 11 && password.trim()) {
      return true;
    }
    return false;
  }

  render() {
    const { phoneNumber, password, handleChange, isLoading, errors } = this.props;

    return (
      <Grid className="center aligned middle aligned">
        <div className="auth-form column">
          <Header as="h2" className="black center aligned">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcb3g1oAW0UIEvpT8jROvSjxg-kmPrj0C0INId3SksaTvmKrj" />
            Вход
          </Header>
          <Form className="large">
            <Segment className="stacked">
              {errors.error === 'Неверный номер телефона или пароль.' && (
                <Message negative>
                  Пользователь с таким номером телефона или паролем не найден
                </Message>
              )}
              <Form.Field>
                <label htmlFor="phoneNumber">Номер телефона</label>
                <div className="ui input">
                  <InputMask
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    mask="+7 (999) 999-99-99"
                    placeholder="Номер телефона"
                  />
                </div>
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Пароль</label>
                <Input
                  name="password"
                  value={password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Введите пароль"
                />
              </Form.Field>

              <Button onClick={this.onBtnClickHandler} disabled={!this.validate() || isLoading} className={`black large fluid ${isLoading ? 'loading' : ''}`}>Войти</Button>
            </Segment>
          </Form>

          <Message>
            Ещё нет аккаунта? <Link to="/register">Зарегистируйтесь</Link>
          </Message>
        </div>
      </Grid>
    );
  }
}

Login.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};
