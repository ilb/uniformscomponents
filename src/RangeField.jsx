import classnames from 'classnames';
import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import { connectField, filterDOMProps } from 'uniforms';

function Range({
  autoComplete,
  className,
  disabled,
  error,
  errorMessage,
  icon,
  iconLeft,
  iconProps,
  id,
  inputRef,
  label,
  name,
  field,
  onChange,
  placeholder,
  readOnly,
  required,
  showInlineError,
  type,
  value,
  wrapClassName,
  maxLength,
  ...props
}) {
  const inputProps = { maxLength };
  const displayType = props.displayType || 'input';
  const settings = {
    min: field.minimum,
    max: field.maximum,
    step: field.multipleOf || 1,
    onChange: (value) => {
      onChange(value);
    }
  };
  return (
    <div
      className={classnames(className, { disabled, error, required }, 'field')}
      {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}
      <Slider value={value} color="black" settings={settings} />

      <div
        className={classnames(
          'ui',
          wrapClassName,
          { left: iconLeft, icon: icon || iconLeft },
          'input'
        )}>
        {displayType == 'input' && (
          <input
            autoComplete={autoComplete}
            disabled={disabled}
            id={id}
            name={name}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            type={type}
            value={value ?? ''}
            {...inputProps}
          />
        )}
        {displayType == 'text' && value}

        {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
      </div>

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

Range.defaultProps = { type: 'text' };

export default connectField(Range, { kind: 'leaf' });
