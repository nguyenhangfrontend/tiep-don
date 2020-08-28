
export const getStatusClass = (index, indexFocus, selected, key) => {
	if ((indexFocus === index) && !selected.includes(key)) {
		return 'focus-row';
	}

	if (selected.includes(key) && (indexFocus !== index)) {
		return 'selected-row';
	}

	if ((indexFocus === index) && selected.includes(key)) {
		return 'selected-row focus-row';
	}

	return '';
};

const resizeCol = () => {

};
