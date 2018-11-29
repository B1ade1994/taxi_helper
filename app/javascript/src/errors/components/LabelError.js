import React from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const LabelError = (props) => {
  const { errors } = props;

  return (
    <Label basic color="red" pointing className="prompt">
      {_.join(errors, ', ')}
    </Label>
  );
};

LabelError.propTypes = {
  errors: PropTypes.array.isRequired,
};
