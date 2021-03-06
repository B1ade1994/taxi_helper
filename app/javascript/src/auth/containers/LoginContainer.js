import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'src/auth/actions';
import { Login } from 'src/auth/components';

class LoginContainer extends Component {
  state = {
    phoneNumber: '',
    password: '',
  }

  handleChange = (e) => {
    const { name } = e.currentTarget;
    let { value } = e.currentTarget;

    if (name === 'phoneNumber') {
      value = value.replace(/\D/g, '');
    }

    this.setState({ [name]: value });
  }

  render() {
    const { phoneNumber, password } = this.state;
    const { login, auth } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/profile/edit' } };

    if (auth.isAuthenticated) {
      if (auth.isVerified) {
        return <Redirect to={from} />;
      }

      return <Redirect to="/verify" />;
    }

    return (
      <Login
        phoneNumber={phoneNumber}
        password={password}
        login={login}
        handleChange={this.handleChange}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (phoneNumber, password) => dispatch(login(phoneNumber, password, ownProps)),
  };
};

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
export { connectedLogin as LoginContainer };
