import styled from 'styled-components';
import theme  from 'vars/theme'

const combineBg = (type) => {
  switch (type) {
    case 'dark':
      return { bg: theme.backgroundPrimary2};
    case 'white':
      return {
        bg: theme.whitePrimary,
      };
    default:
      return { bg: theme.backgroundPrimary2};
  }
};
export const themeSelect = (theme) => ({
	...theme,
	borderRadius: 0,
	colors: {
		...theme.colors,
		primary25: '#e8f3f0',
		primary: '#1a2b33',
	},
});

export const colourStyles = {
  
	control: (styles, {isDisabled, type}) => ({
		...styles,
		backgroundColor: isDisabled ?'rgba(255, 255, 255, 0.05)' : combineBg(type).bg,
		
		minHeight: 'unset',
		height: 32,
		borderColor: 'transparent',
		borderRadius: 4,
		overflow: 'initial',
	}),
	input: styles => ({
		...styles,
		color: '#fff'
	}),
	singleValue: styles => ({
		...styles,
		color: '#fff',
		fontSize: 14,
		position: 'relative',
		transform: 'none',
		
	}),
	option: (provided, state) => ({
    ...provided,
		color: state.isSelected ? '#fff' : '#000',
  }),
	indicatorsContainer: styles => ({
		...styles,
		display: 'flex !important',
		height: 32,
	}),
	indicatorSeparator: styles => ({
		...styles,
		display: 'none',
	}),
	placeholder: styles => ({
		...styles,
		position: 'relative',
		transform: 'none',
	}),
	
	dropdownIndicator: styles => ({
		...styles,
		position: 'relative'
	})
};