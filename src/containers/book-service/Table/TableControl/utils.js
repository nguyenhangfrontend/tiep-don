export const checkSelectedAllChild = (selected, rows, key) => {
	const obj = rows.find(item => item.key === key);
	const listCheck = selected.includes(key) ? selected : [...selected, key];

	return rows
		.filter(item => obj ? (item.parent === obj.parent) : !item.sequenceGroupNo)
		.map(item => listCheck.includes(item.key))
		.includes(false)
};