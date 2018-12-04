import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, Message, Segment, Header, Grid } from 'semantic-ui-react';
import { LabelError } from 'src/errors';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class Verify extends Component {
  onVerifyBtnClickHandler = (e) => {
    e.preventDefault();
    const { code, verify } = this.props;

    verify(code);
  }

  handleUpdateVerifyTokenClick = (e) => {
    e.preventDefault();
    const { updateVerifyToken, timerChange } = this.props;

    timerChange();
    updateVerifyToken();
  }

  validate = () => {
    const { code } = this.props;

    if (code.trim()) {
      return true;
    }
    return false;
  }

  render() {
    const { code, timer, handleChange, isLoading, errors } = this.props;

    return (
      <Grid className="center aligned middle aligned">
        <div className="auth-form column">
          <Header as="h2" className="black center aligned">
            Подтвердите номер телефона
          </Header>
          <Form className="large">
            <Segment className="stacked">
              <Form.Field error={!!errors.invalid_verify_token}>
                <label htmlFor="code">Введите SMS-код</label>
                <Input
                  name="code"
                  value={code}
                  onChange={handleChange}
                  fluid
                />
                {_.has(errors, 'invalid_verify_token') && (<LabelError errors={errors.invalid_verify_token} />)}
              </Form.Field>

              <Button onClick={this.onVerifyBtnClickHandler} disabled={!this.validate() || isLoading} className={`black large fluid ${isLoading ? 'loading' : ''}`}>Вход</Button>
            </Segment>
          </Form>

          <Message>
          Сообщение не пришло? <Link onClick={this.handleUpdateVerifyTokenClick} to="#update_verify_token" className={timer !== 0 ? 'disabled' : ''}>Получить SMS-код повторно </Link>
            {timer !== 0 && (<p>Подождите {timer} секунд</p>)}
          </Message>
        </div>
      </Grid>
    );
  }
}

Verify.propTypes = {
  code: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  verify: PropTypes.func.isRequired,
  updateVerifyToken: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  timerChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
};
