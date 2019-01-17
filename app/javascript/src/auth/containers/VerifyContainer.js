import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify, updateVerifyToken } from 'src/auth/actions';
import { Verify } from 'src/auth/components';

class VerifyContainer extends Component {
  state = {
    code: '',
    timer: 120,
  }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        if (this.state.timer > 0) {
          this.setState(prevState => ({
            timer: prevState.timer - 1,
          }));
        } else {
          this.setState({ timer: 0 });
        }
      },
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  }

  timerChange = () => {
    this.setState({ timer: 120 });
  }

  render() {
    const { code, timer } = this.state;
    const { auth, verify, updateVerifyToken } = this.props;

    if (auth.isVerified) {
      return <Redirect to="/profile/edit" />;
    }

    return (
      <Verify
        code={code}
        timer={timer}
        verify={verify}
        updateVerifyToken={updateVerifyToken}
        handleChange={this.handleChange}
        timerChange={this.timerChange}
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
    verify: code => dispatch(verify(code)),
    updateVerifyToken: () => dispatch(updateVerifyToken()),
  };
};

const connectedVerify = connect(mapStateToProps, mapDispatchToProps)(VerifyContainer);
export { connectedVerify as VerifyContainer };
