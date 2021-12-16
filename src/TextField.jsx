import classnames from 'classnames';
import React, { useState } from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import MaskedTextInput from 'react-input-mask';

function Text({
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
  onChange,
  placeholder,
  readOnly,
  required,
  showInlineError,
  type,
  value,
  wrapClassName,
  maxLength,
  onAfterChange,
  capitalize,
  mask,
  replace,
  normalizeSpace,
  viewPassword,
  ...props
}) {
  const inputProps = { maxLength };
  const displayType = props.displayType || 'input';

  const [typeState, setTypeState] = useState(type);
  const toggleViewPassword = (typeState) => {
    if (typeState == 'password') {
      setTypeState('text');
    } else {
      setTypeState('password');
    }
  };

  return (
    <div
      className={classnames(className, { disabled, error, required }, 'field')}
      {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <div
        className={classnames(
          'ui',
          wrapClassName,
          { left: iconLeft, icon: icon || iconLeft },
          'input'
        )}>
        {displayType === 'input' && (
          <MaskedTextInput
            mask={mask}
            autoComplete={autoComplete}
            disabled={disabled}
            id={id}
            name={name}
            onInput={(event) => {
              if (capitalize) {
                let target = event.target;
                let p = target.selectionStart;
                target.value = target.value.toUpperCase();
                target.setSelectionRange(p, p);
              }
            }}
            onChange={(event) => {
              let value = event.target.value;
              if (replace) {
                value = value.replace(replace, '');
              }
              if (normalizeSpace) {
                value = value.replace(/\s+/g, ' ').replace(/^\s+/g, '');
              }
              onChange(value);
              onAfterChange && onAfterChange(value);
            }}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={inputRef}
            type={typeState ? typeState : type}
            value={value ?? ''}
            {...inputProps}
          />
        )}
        {viewPassword && (
          <i
            className={typeState == 'password' ? 'hide icon' : 'unhide icon'}
            style={{ position: 'absolute', top: '25%', right: '7px', cursor: 'pointer' }}
            onClick={() => toggleViewPassword(typeState)}></i>
        )}
        {displayType === 'text' && value}

        {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
      </div>

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
}

Text.defaultProps = { type: 'text' };

export default connectField(Text, { kind: 'leaf' });
