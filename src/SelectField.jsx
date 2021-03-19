import React from 'react';
import { Form } from 'semantic-ui-react';
import { connectField } from 'uniforms';

const Select = ({
  label,
  placeholder,
  withEmptyOption,
  options,
  multiple,
  onChange,
  value,
  field
}) => {
  const multipleSelect = multiple || field.type === 'array';
  let selectValue = value;
  let selectOptions = options || [];

  if (multipleSelect && !value) {
    selectValue = [];
  }
  // handle case when when only one take only one value from url
  if (multipleSelect && typeof value === 'string') {
    selectValue = [value];
  }
  if (withEmptyOption) {
    selectOptions = [
      {
        value: null,
        content: <div style={{ opacity: 0.5 }}>{label}</div>,
        active: false
      },
      ...options
    ];
  }

  const onSelectionChange = (e, field) => {
    onChange(field.value);
  };
  return (
    <Form.Select
      selectOnBlur={false}
      placeholder={placeholder}
      options={selectOptions}
      selection
      value={selectValue}
      multiple={multipleSelect}
      label={label}
      onChange={onSelectionChange}
    />
  );
};

const SelectField = connectField(Select);
export default SelectField;
