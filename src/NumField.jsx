import React from 'react';
import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { connectField } from 'uniforms';
import NumberFormat from 'react-number-format';

const CustomInput = ({
  label,
  additionalLabel,
  value,
  onChange,
  field,
  disabled,
  error,
  showInlineError,
  required,
  actionText,
  onActionClick,
  onAfterChange,
  onBlur
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const inputRef = useRef();
  const handleOnValueChange = (value) => {
    setInputValue(value);
    onChange(value);
    onAfterChange && onAfterChange(value);
  };

  const inputAdditionalLabel = additionalLabel || field.uniforms?.additionalLabel;

  const handleOnActionClick = () => {
    onActionClick && onActionClick(inputRef.current.value);
  };

  useEffect(() => {
    const value = inputRef?.current.value;

    if (value) {
      onChange(inputRef?.current.value);
    }
  }, []);
  const numberFormatProps = field.uniforms || {};
  // const numberFormatProps = {
  //   decimalScale: field.uniforms?.decimalScale || 2
  // };

  const inputElement = (
    <NumberFormat
      disabled={disabled}
      onBlur={onBlur}
      min={field.minimum || -Infinity}
      max={field.maximum || Infinity}
      ref={inputRef}
      type={field.uniforms?.type || 'text'}
      value={value ?? ''}
      onValueChange={(values) => {
        let value = field.type === 'string' ? values.value : values.floatValue;

        handleOnValueChange(value);
      }}
      {...numberFormatProps}
    />
  );

  return (
    <>
      <Form.Field required={required} error={!!error}>
        {label && <label>{label}</label>}
        {actionText ? (
          <div className={classnames('ui action input', { disabled, error })}>
            {inputElement}
            <Button type="button" primary onClick={handleOnActionClick}>
              {actionText}
            </Button>
          </div>
        ) : (
          <div
            className={classnames(
              'ui',
              {
                disabled,
                error
              },
              inputAdditionalLabel ? 'right labeled input' : 'input'
            )}>
            {inputElement}
            {inputAdditionalLabel && <Label>{inputAdditionalLabel}</Label>}
          </div>
        )}
        {!!(error && showInlineError) && (
          <div className="ui red fluid basic pointing label" style={{ textAlign: 'center' }}>
            {error.message}
          </div>
        )}
      </Form.Field>
    </>
  );
};

const InputField = connectField(CustomInput);
export default InputField;
