import './layout.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom';
import { Menu, Dropdown, Container, Loader } from 'semantic-ui-react';

import { onAppLoad, login, logout } from 'src/auth/actions';
import { RegisterContainer, LoginContainer, VerifyContainer } from 'src/auth';
import { ProfileContainer, ProfileFormContainer } from 'src/profiles';
import { OrdersContainer, OrderContainer, OrderFormContainer } from 'src/orders';
import { PrivateRoute, Home, InfoAgreement, Help } from './components';

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
    const { auth } = this.props;
    const { isAuthenticated, appLoaded, name } = auth;

    const authLinks = (
      <React.Fragment>
        <Menu.Item as={Link} name="TaxiHelper" to="/orders" />
        {auth.isVerified && (
          <Menu.Menu>
            <Dropdown item text="Заказы" pointing>
              <Dropdown.Menu>
                {auth.role === 'driver' && (<Dropdown.Item as={NavLink} to="/orders" exact>Заказы</Dropdown.Item>)}
                {auth.role === 'dispatcher' && (<Dropdown.Item as={NavLink} to="/orders" exact>Мои заказы</Dropdown.Item>)}
                {auth.role === 'dispatcher' && (<Dropdown.Item as={NavLink} to="/orders/new" exact>Создать заказ</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}

        {auth.isVerified && (
          <Menu.Menu position="right">
            <Dropdown item text={name} pointing>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/profile" exact>Мой профиль</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={NavLink} to="/profile/edit" exact>Редактировать</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/help" exact>Помощь</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={NavLink} onClick={this.props.logout} to="/" exact>Выйти</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <NavLink className="item" exact to="/">Новости</NavLink>

        <Menu.Menu position="right">
          <NavLink className="right item" to="/login">Войти</NavLink>
          <NavLink className="right item" to="/register">Регистрация</NavLink>
        </Menu.Menu>
      </React.Fragment>
    );

    if (appLoaded) {
      return (
        <BrowserRouter>
          <React.Fragment>
            <Menu inverted attached>
              <Container>
                {isAuthenticated ? authLinks : guestLinks}
              </Container>
            </Menu>
            <div className="wrapper">
              <Container>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/info/agreement" component={InfoAgreement} />
                  <Route path="/login" component={LoginContainer} />
                  <Route path="/register" component={RegisterContainer} />
                  <PrivateRoute exact path="/help" component={Help} auth={auth} />
                  <PrivateRoute exact path="/verify" component={VerifyContainer} auth={auth} />

                  <PrivateRoute exact path="/profile" component={ProfileContainer} auth={auth} />
                  <PrivateRoute exact path="/profile/edit" component={ProfileFormContainer} auth={auth} />

                  <PrivateRoute exact path="/orders" component={OrdersContainer} auth={auth} />
                  <PrivateRoute exact path="/orders/new" component={OrderFormContainer} auth={auth} />
                  <PrivateRoute exact path="/orders/:id" component={OrderContainer} auth={auth} />
                  <PrivateRoute exact path="/orders/:id/edit" component={OrderFormContainer} auth={auth} />
                </Switch>
              </Container>
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
