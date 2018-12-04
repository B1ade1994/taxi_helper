import './layout.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import { logout, login } from 'src/auth/actions';
import { RegisterContainer, LoginContainer, VerifyContainer } from 'src/auth';
import { PrivateRoute } from './components/PrivateRoute';
import Test from './components/Test';
import Home from './components/Home';
import InfoAgreement from './components/InfoAgreement';

class Layout extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      this.props.login();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <NavLink className="item" exact to="/test">Тест</NavLink>

        <div className="right menu">
          <NavLink className="right item" onClick={this.props.logout} exact to="/">Выйти</NavLink>
        </div>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <NavLink className="item" exact to="/">Новости</NavLink>

        <div className="right menu">
          <NavLink className="right item" to="/login">Войти</NavLink>
          <NavLink className="right item" to="/register">Регистрация</NavLink>
        </div>
      </React.Fragment>
    );

    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="ui inverted menu attached">
            <div className="ui container">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
          <div className="wrapper">
            <div className="ui container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/info/agreement" component={InfoAgreement} />
                <Route path="/login" component={LoginContainer} />
                <Route path="/register" component={RegisterContainer} />
                <PrivateRoute exact path="/verify" component={VerifyContainer} auth={this.props.auth} />
                <PrivateRoute path="/test" component={Test} auth={this.props.auth} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
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
    logout: () => dispatch(logout()),
    login: () => dispatch(login()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
