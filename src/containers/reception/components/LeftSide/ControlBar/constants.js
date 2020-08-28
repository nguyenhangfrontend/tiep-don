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
	control: styles => ({
		...styles,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		minHeight: 'unset',
		height: 36,
		border: 'none',
		borderRadius: 4,
	}),
	singleValue: styles => ({
		...styles,
		color: '#00A9FF',
		fontWeight: 'bold',
		fontSize: 16,
	}),
	option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#000',
  }),
	indicatorsContainer: styles => ({
		...styles,
		display: 'flex',
	}),
	indicatorSeparator: styles => ({
		...styles,
		display: 'none',
	}),
};