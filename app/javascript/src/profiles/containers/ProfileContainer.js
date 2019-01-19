import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Profile } from 'src/profiles/components';

class ProfileContainer extends Component {
  render() {
    const { phoneNumber, role, name, photo, cars, rating } = this.props.profile;

    return (
      <Profile
        phoneNumber={phoneNumber}
        role={role}
        name={name}
        photo={photo || 'https://vistanews.ru/uploads/posts/2017-11/1510472839_e62263996b69.jpg'}
        cars={cars}
        rating={rating}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    profile: store.profile,
  };
};

const connectedProfile = connect(mapStateToProps, {})(ProfileContainer);
export { connectedProfile as ProfileContainer };
