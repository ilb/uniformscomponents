import React, { useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { Form, Input } from 'semantic-ui-react';
import { connectField } from 'uniforms';

const Phone = ({
  label,
  value,
  onChange,
  onFocus,
  field,
  disabled,
  error,
  showInlineError,
  required,
  onAfterChange,
  ...props
}) => {
  const inputRef = useRef();
  const displayType = props.displayType || 'input';
  const handleOnValueChange = (value) => {
    onChange(value);
    onAfterChange && onAfterChange(value);
  };

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
          onFocus={onFocus}
          ref={inputRef}
          disabled={disabled}
          min={field.minimum || -Infinity}
          max={field.maximum || Infinity}
          type={field.uniforms?.type || 'text'}
          value={value}
          onValueChange={(values) => {
            handleOnValueChange(values.value || null);
          }}
          decimalScale={0}
          thousandSeparator={null}
          allowEmptyFormatting={true}
          mask={'_'}
          format={field.uniforms.format || `+7 (###) ###-##-##`}
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
