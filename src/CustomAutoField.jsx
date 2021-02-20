import React from 'react';

import { connectField } from 'uniforms';
import { AutoField } from 'uniforms-semantic';

import DateField from './DateField';

const determineComponentFromProps = (props) => {
  const { field } = props;
  switch (field.format) {
    case 'date':
      return DateField;
  }
  return null;
};

const CustomAuto = (props) => {
  const Component = determineComponentFromProps(props) || AutoField;
  return <Component {...props} name="" />;
};

export default connectField(CustomAuto, {
  ensureValue: false,
  initialValue: false
});
