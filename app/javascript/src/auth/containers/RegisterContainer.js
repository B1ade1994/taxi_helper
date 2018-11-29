import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from 'src/auth/actions';
import { Register } from 'src/auth/components';

class RegisterContainer extends Component {
  state = {
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
    agree: false,
  }

  handleChange = (e) => {
    const { name } = e.currentTarget;
    let { value } = e.currentTarget;

    if (name === 'phoneNumber') {
      value = value.replace(/\D/g, '');
    }

    this.setState({ [name]: value });
  }

  handleCheckboxChange = (e, data) => {
    this.setState({ agree: data.checked });
  }

  render() {
    const { phoneNumber, password, passwordConfirmation, agree } = this.state;
    const { register, auth } = this.props;

    if (auth.isAuthenticated) {
      return <Redirect to="/test" />;
    }

    return (
      <Register
        phoneNumber={phoneNumber}
        password={password}
        passwordConfirmation={passwordConfirmation}
        agree={agree}
        handleChange={this.handleChange}
        handleCheckboxChange={this.handleCheckboxChange}
        register={register}
        isLoading={auth.isLoading}
        errors={auth.errors}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    auth: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (phoneNumber, password, passwordConfirmation) => dispatch(register(phoneNumber, password, passwordConfirmation)),
  };
};

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
export { connectedRegister as RegisterContainer };
