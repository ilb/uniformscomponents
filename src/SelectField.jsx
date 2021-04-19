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
  field,
  disabled,
  error,
  showInlineError,
  onAfterChange
}) => {
  const multipleSelect = multiple || field.type === 'array';

  let selectValue = value;
  let selectOptions =
    options.map(({ label, text, value }) => {
      let option = { value };
      option = label && text ? { ...option, label, text } : { ...option, text: label || text };
      return option;
    }) || [];

  if (multipleSelect && !value) {
    selectValue = [];
  }
  // handle case when we have only one value as string
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
    onAfterChange && onAfterChange(field.value);
  };
  return (
    <Form.Select
      error={!!error && (showInlineError ? error.message : true)}
      selectOnBlur={false}
      placeholder={placeholder}
      options={selectOptions}
      selection
      search={(field.uniforms && field.uniforms.search) || false}
      scrolling
      value={selectValue}
      multiple={multipleSelect}
      label={label}
      onChange={onSelectionChange}
      disabled={disabled}
    />
  );
};

const SelectField = connectField(Select);
export default SelectField;
