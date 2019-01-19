import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProfileForm } from 'src/profiles/components';
import { saveProfile } from 'src/profiles/actions';

class ProfileFormContainer extends Component {
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
      brand: '',
      model: '',
      color: '',
      number: '',
      photo: '',
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
    const { saveProfile } = this.props;
    const { isLoading, errors } = this.props.profile;

    // если name пустой, то кнопку назад не показывать
    let canBackBtn;
    if (this.props.profile.name) {
      canBackBtn = true;
    } else {
      canBackBtn = false;
    }

    return (
      <ProfileForm
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
        canBackBtn={canBackBtn}
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

const connectedProfileForm = connect(mapStateToProps, mapDispatchToProps)(ProfileFormContainer);
export { connectedProfileForm as ProfileFormContainer };
