import React from 'react';
import PropTypes from 'prop-types';

export default function Forecast(props) {
  const { data } = props;

  return <React.Fragment>{JSON.stringify(data)}</React.Fragment>;
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
