import React, { useState, useEffect } from 'react';
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
  showMonthYear,
  ...props
}) => {
  //console.log(props);
  const displayType = props.displayType;
  const dateDisplayFormat = showMonthYear ? 'MM.yyyy' : 'dd.MM.yyyy';

  //optimization for SeaMonkey
  const [seaMonkey, setSeaMonkey] = useState(false);
  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf('seamonkey') > -1) {
      setSeaMonkey(true);
    }
  }, []);
  const onChangeForSeaMonkey = (e) => {
    const el = e.target;
    let cursorPos = el.value && el.value.replace(/[^0-9]/g, '').length;

    if (el.value && el.value.length == 10) {
      if (cursorPos >= 2 && cursorPos <= 3) {
        cursorPos = seaMonkey?.key == 'Backspace' && cursorPos == 2 ? cursorPos : ++cursorPos;
      } else if (cursorPos >= 4) {
        if (seaMonkey?.key == 'Backspace' && cursorPos == 4) {
          cursorPos++;
        } else cursorPos += 2;
      }
    }
    if (el.value && el.value.length == 7) {
      if (cursorPos >= 2 && cursorPos <= 6) {
        cursorPos = seaMonkey?.key == 'Backspace' && cursorPos == 2 ? cursorPos : ++cursorPos;
      }
    }
    setSeaMonkey({ ...seaMonkey, cursorPos });
    window.requestAnimationFrame(() => {
      el.selectionStart = cursorPos;
      el.selectionEnd = cursorPos;
    });
  };
  const beforeMaskedValueChange = (newState) => {
    const { value } = newState;
    return {
      value,
      selection: { start: seaMonkey?.cursorPos, end: seaMonkey?.cursorPos }
    };
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
        {displayType === 'text' ? (
          dateValue(value, dateDisplayFormat)
        ) : (
          <DatePicker
            customInput={
              <MaskedTextInput
                mask={showMonthYear ? '99.9999' : '99.99.9999'}
                beforeMaskedValueChange={
                  seaMonkey ? (newState) => beforeMaskedValueChange(newState) : false
                }
              />
            }
            disabled={disabled}
            id={name}
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
            showMonthYearPicker={showMonthYear ? true : false}
            showFullMonthYearPicker={showMonthYear ? true : false}
            dropdownMode="select"
            autoComplete="off"
            preventOpenOnFocus
            onChange={(value) => {
              value === null ? onChange() : onChange(dateFormat(value));
              value && onAfterChange && onAfterChange(dateFormat(value));
            }}
            onChangeRaw={(e) => seaMonkey && onChangeForSeaMonkey(e)}
            onKeyDown={(e) => seaMonkey && setSeaMonkey({ ...seaMonkey, key: e?.key })}
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
