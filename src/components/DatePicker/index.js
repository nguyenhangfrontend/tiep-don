import React from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { DatePickerStyle } from './styled';

class DatePickerCustom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: false,
    };
  }

  handChange = date => {
    const { onChange } = this.props;
    this.setState({
      showChildren: true,
    });
    onChange(date);
  };

  onClick = () => {
    this._calendar.setOpen(true);
    this.setState({
      showChildren: true,
    });
  };
  onCloseDatepiker = () => {
    this.setState({
      showChildren: false,
    });
  };
  MyContainer = ({ className, children }) => {
    const { showChildren } = this.state;
    if (!showChildren) {
      return null;
    }
    return (
      <CalendarContainer className={className}>{children}</CalendarContainer>
    );
  };

  render() {
    const { value, placeholder, label, require, theme } = this.props;

    return (
      <DatePickerStyle theme={theme}>
        <span className={`label-input ${require ? 'color-red' : ''}`}>
          {label}
        </span>
        <div className="input-content">
          <DatePicker
            dateFormat={'dd/MM/yyyy'}
            ref={c => (this._calendar = c)}
            selected={value}
            placeholderText={placeholder}
            onKeyDown={this.onKeyDown}
            calendarContainer={this.MyContainer}
            onChange={this.handChange}
            onBlur={this.onBlur}
            onCalendarClose={this.onCloseDatepiker}
            disabled={this.props.disabled}
            className="active-element insurance-element form-control"
          />
          <button onClick={this.onClick} className="icon-input">
              <i className="fa fa-calendar" aria-hidden="true"></i>
          </button>
        </div>
      </DatePickerStyle>
    );
  }
}

export default DatePickerCustom;
