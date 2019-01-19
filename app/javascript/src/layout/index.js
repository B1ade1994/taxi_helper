import './layout.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { onAppLoad, login, logout } from 'src/auth/actions';
import { RegisterContainer, LoginContainer, VerifyContainer } from 'src/auth';
import { ProfileContainer, ProfileFormContainer } from 'src/profiles';
import { PrivateRoute } from './components/PrivateRoute';

import Home from './components/Home';
import InfoAgreement from './components/InfoAgreement';

class Layout extends Component {
  componentWillMount() {
    const { login, onAppLoad } = this.props;
    const token = window.localStorage.getItem('jwt');
    if (token) {
      login();
    } else {
      onAppLoad();
    }
  }

  render() {
    const { isAuthenticated, appLoaded } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <NavLink className="item" to="/profile">Профиль</NavLink>

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

    if (appLoaded) {
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
                <div className="ui grid">
                  <div className="column">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/info/agreement" component={InfoAgreement} />
                      <Route path="/login" component={LoginContainer} />
                      <Route path="/register" component={RegisterContainer} />
                      <PrivateRoute exact path="/verify" component={VerifyContainer} auth={this.props.auth} />
                      <PrivateRoute exact path="/profile" component={ProfileContainer} auth={this.props.auth} />
                      <PrivateRoute exact path="/profile/edit" component={ProfileFormContainer} auth={this.props.auth} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      );
    }

    return (
      <Loader active />
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
    onAppLoad: () => dispatch(onAppLoad()),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
