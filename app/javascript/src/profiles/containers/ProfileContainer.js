import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Profile } from 'src/profiles/components';
import { saveProfile } from 'src/profiles/actions';

class ProfileContainer extends Component {
  // state = {
  //   profile: this.props.profile,
  // }

  componentWillMount() {
    this.setState({ profile: this.props.profile });
  }

  handleChange = (e, { name, value }) => {
    const { profile } = this.state;
    profile[name] = value;

    this.setState({ profile });
  }

  handleCarChange = (e, car) => {
    const { name, value } = e.currentTarget;

    const { profile } = this.state;
    car[name] = value;

    this.setState({ profile });
  }

  handleAddCar = () => {
    const { profile } = this.state;
    const car = {
      id: null,
      brand: '',
      model: '',
      color: '',
      number: '',
      photo: '',
      // _destroy: false,
      errors: {},
    };

    profile.cars.push(car);
    this.setState({ profile });
  }

  handleRemoveCar = (car) => {
    const { profile } = this.state;
    car._destroy = true;

    this.setState({ profile });
  }

  render() {
    const { role, personalAccount, name, photo, cars } = this.state.profile;
    const { isLoading, errors } = this.props.profile;
    const { saveProfile } = this.props;

    return (
      <Profile
        role={role}
        personalAccount={personalAccount || ''}
        name={name || ''}
        photo={photo || ''}
        cars={cars}
        onChange={this.handleChange}
        onCarChange={this.handleCarChange}
        onAddCar={this.handleAddCar}
        onRemoveCar={this.handleRemoveCar}
        saveProfile={saveProfile}
        isLoading={isLoading}
        errors={errors}
      />
    );
  }
}

const mapStateToProps = (store) => {
  return {
    profile: store.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProfile: profile => dispatch(saveProfile(profile)),
  };
};

const connectedProfile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export { connectedProfile as ProfileContainer };
