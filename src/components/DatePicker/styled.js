import styled from 'styled-components';

const DatePickerStyle = styled('div')`
  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker {
    width: 260px;
    height: 205px;
    background: #f9f6f6;
    border: 1px solid #ddd;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 30px;
    font-size: 14px;
    height: 29px;
    line-height: 29px;
  }
  .icon-input{
    color: ${props => props.theme === 'dark'? '#000': '#fff'}
  }
  .react-datepicker-popper {
    z-index: 999;
  }
  .react-datepicker__day-name, .react-datepicker__day,.react-datepicker__time-name{
    width: 36px;
    font-size: 14px;
    height: 29px;
    line-height: 29px;
    color: #000;
    float: left;
    text-align: center;
   }
   

.react-datepicker__navigation {
    background: none;
    line-height: 1.7rem;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: 10px;
    width: 0;
    padding: 0;
    border: 0.45rem solid transparent;
    z-index: 1;
    height: 10px;
    width: 10px;
    text-indent: -999em;
    overflow: hidden;
}
.react-datepicker__navigation--previous {
    left: 10px;
    border-right-color: #ccc;
}
.react-datepicker__navigation--next {
    right: 10px;
    border-left-color: #ccc;
}
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--in-selecting-range:hover,
  .react-datepicker__day--in-range:hover,
  .react-datepicker__month-text--selected:hover,
  .react-datepicker__month-text--in-selecting-range:hover,
  .react-datepicker__month-text--in-range:hover,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range {
    background-color: #1a2b33;
    color: #fff;
  }
  
`;

export { DatePickerStyle };
