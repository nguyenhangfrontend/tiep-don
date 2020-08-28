import styled from 'styled-components';

const combineType = (type, theme) => {
  switch (type) {
    case 'primary':
      return { bg: theme.greenDark, color: theme.white, keyColor: theme.gray2 };
    case 'light-blue':
      return {
        bg: theme.whitePrimary,
        color: theme.blue,
        keyColor: theme.shortKey,
      };
    case 'dark-blue':
      return { bg: theme.gray, color: theme.blue, keyColor: theme.shortKey };
    case 'light-pink':
      return {
        bg: theme.whitePrimary,
        color: theme.pink,
        keyColor: theme.shortKey,
      };
    case 'light-orange':
      return {
        bg: theme.whitePrimary,
        color: theme.orange,
        keyColor: theme.shortKey,
      };
    case 'light-green':
      return {
        bg: theme.whitePrimary,
        color: theme.greenDark,
        keyColor: theme.shortKey,
      };
    case 'dark-green':
      return { bg: theme.gray, color: theme.green, keyColor: theme.shortKey };
    case 'light-dark':
      return {
        bg: theme.whiteSecondary,
        color: theme.black,
        keyColor: theme.shortKey,
      };
    case 'gray-dark':
      return {
        bg: theme.grayMain,
        color: theme.black,
        keyColor: theme.shortKey,
      };
    case 'blue-light':
      return {
        bg: theme.blue2,
        color: theme.whitePrimary,
        keyColor: theme.gray2,
      };
    case 'bluedark-light':
      return {
        bg: theme.blue3,
        color: theme.whitePrimary,
        keyColor: theme.gray2,
      };
    case 'dark-light':
      return {
        bg: theme.gray,
        color: theme.whitePrimary,
        keyColor: theme.gray2,
      };
    case 'transparent':
      return {
        bg: theme.transparent,
        color: theme.greenDark,
        keyColor: theme.greenDark,
      };
    default:
      return { bg: theme.greenDark, color: theme.white, keyColor: theme.gray2 };
  }
};

const combineSize = size => {
  switch (size) {
    case 'large':
      return '14px 27px';
    case 'small':
      return '6px 12px';
    default:
      return '8px 20px';
  }
};

const Main = styled('button')`
  width: ${({ width }) => width};
  & .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;

    & .btn-icon {
      margin-right: 6px;
      width: 20px;
      display: block;
    }

    & .btn-short-key {
      display: block;
      margin-left: 6px;
      color: ${props => combineType(props.btnType, props.theme).keyColor};
    }
  }

  border-radius: 4px;
  border: none;
  padding: ${props => combineSize(props.size)};
  line-height: 1;
  background: ${props => combineType(props.btnType, props.theme).bg};
  color: ${props => combineType(props.btnType, props.theme).color};

  &:focus {
    border: 1px solid ${({ theme }) => theme.greenMedium1};
  }
`;

export { Main };
