import React from 'react';

import { connectField } from 'uniforms';
import { AutoField } from 'uniforms-semantic';

import DateField from './DateField';
import SelectField from './SelectField';
import PhoneField from './PhoneField';
import NumField from './NumField';
import TextField from './TextField';
import ContactListField from './CustomListField';

const determineComponentFromProps = (props) => {
  const { field } = props;

  if (props.field.uniforms?.type === 'phone') {
    return PhoneField;
  }

  if (props.options) {
    return SelectField;
  }

  switch (props.fieldType) {
    case Number:
      return NumField;
    case String:
      //FIX ME
      if (props.maxLength) {
        return TextField;
      }
  }

  switch (field.format) {
    case 'date':
      return DateField;
  }

  switch (props.fieldType) {
    case Number:
      return NumField;
    case String:
      return TextField;
    case Array: {
      if (props.field?.uniforms?.format === 'contacts') {
        return ContactListField;
      }
    }
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
