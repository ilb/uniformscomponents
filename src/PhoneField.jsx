import React, { useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { Form, Input } from 'semantic-ui-react';
import { connectField } from 'uniforms';

const Phone = ({
  label,
  value,
  onChange,
  onFocus,
  name,
  field,
  disabled,
  error,
  showInlineError,
  required,
  onAfterChange,
  ...props
}) => {
  const format = field.uniforms.format || `+7 (###) ###-##-##`;

  const inputRef = useRef();
  const displayType = props.displayType || 'input';
  const handleOnValueChange = (value) => {
    onChange(value);
    onAfterChange && onAfterChange(value);
  };

  if (field.uniforms.useFormattedValue && value && displayType === 'input') {
    const valueMaxLength = format.split('#').length - 1;
    const numberString = value.replace(/\D/g, '');
    if (numberString.length > valueMaxLength) {
      value = numberString.substring(numberString.length - valueMaxLength);
    }
  }

  useEffect(() => {
    const value = inputRef?.current?.value;

    if (value) {
      handleOnValueChange(value);
    }
  }, []);

  const inputElement = (
    <Input
      ref={inputRef}
      error={error}
      input={
        <NumberFormat
          id={name}
          onFocus={onFocus}
          ref={inputRef}
          disabled={disabled}
          min={field.minimum || -Infinity}
          max={field.maximum || Infinity}
          type={field.uniforms?.type || 'text'}
          value={value}
          onValueChange={(values) => {
            handleOnValueChange(
              (field.uniforms.useFormattedValue ? values.formattedValue : values.value) || null
            );
          }}
          decimalScale={0}
          thousandSeparator={null}
          allowEmptyFormatting={true}
          mask={'_'}
          format={format}
        />
      }
    />
  );

  return (
    <>
      <Form.Field required={required} error={!!error} disabled={disabled}>
        {label && <label>{label}</label>}
        {displayType === 'input' && inputElement}
        {displayType === 'text' && value}
        {!!(error && showInlineError) && (
          <div className="ui red basic pointing label" style={{ textAlign: 'center' }}>
            {error.message}
          </div>
        )}
      </Form.Field>
    </>
  );
};

const PhoneField = connectField(Phone);
export default PhoneField;
