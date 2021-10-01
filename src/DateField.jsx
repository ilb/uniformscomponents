import React from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps } from 'uniforms';
import DatePicker from 'react-datepicker';
import parseISO from 'date-fns/parseISO';
import formatISO from 'date-fns/formatISO';
import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';
import MaskedTextInput from 'react-input-mask';

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
  onAfterChange,
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
            customInput={<MaskedTextInput mask="99.99.9999" />}
            disabled={disabled}
            id={id}
            className={'adaptiveDate'}
            maxDate={dateParse(max)}
            minDate={dateParse(min)}
            name={name}
            placeholderText={placeholder}
            ref={inputRef}
            selected={dateParse(value)}
            locale={ru}
            dateFormat={dateDisplayFormat}
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
            onChange={(value) => {
              value === null ? onChange() : onChange(dateFormat(value));
              value && onAfterChange && onAfterChange(dateFormat(value));
            }}
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
