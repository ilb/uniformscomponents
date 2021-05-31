import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';
import DatePicker from 'react-datepicker';
import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';

const dateParse = (value) => value && parseISO(value);
const dateFormat = (value) => value && formatISO(value, { representation: 'date' });
const dateValue = (value, fmt) => value && format(dateParse(value), fmt);
const Date = ({
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
  max,
  min,
  name,
  onChange,
  placeholder,
  required,
  showInlineError,
  value,
  wrapClassName,
  ...props
}) => {
  //console.log(props);
  const displayType = props.displayType;
  const dateDisplayFormat = 'dd.MM.yyyy';
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
        {displayType === 'text' ? (
          dateValue(value, dateDisplayFormat)
        ) : (
          <DatePicker
            disabled={disabled}
            id={id}
            maxDate={dateParse(max)}
            minDate={dateParse(min)}
            name={name}
            placeholderText={placeholder}
            ref={inputRef}
            selected={dateParse(value)}
            locale={ru}
            dateFormat={dateDisplayFormat}
            isClearable
            autoComplete="off"
            onChange={(value) => onChange(dateFormat(value))}
          />
        )}

        {(icon || iconLeft) && <i className={`${icon || iconLeft} icon`} {...iconProps} />}
      </div>

      {!!(error && showInlineError) && (
        <div className="ui red basic pointing label">{errorMessage}</div>
      )}
    </div>
  );
};

export default connectField(Date);
