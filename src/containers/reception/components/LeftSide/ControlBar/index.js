import React from 'react';
import T from 'prop-types';
import Selects, { components } from 'react-select';
import DropDownIcon from 'resources/svg/drop-down.svg';
import { Switch } from 'components/Input';
import CheckBox from 'components/CheckBox';
import { Main, Placeholder } from './styled';
import { colourStyles, themeSelect } from './constants';

const DropdownIndicator = props => {
	return (
		<components.DropdownIndicator {...props} className={'hallo'}>
			<DropDownIcon />
		</components.DropdownIndicator>
	);
};

const ControlBar = ({
  isSelectAllCounter, changeCounter, counter, activeCounter, counters, changeActiveFilter, className, selectAllCounter,
}) => {
	return (
		<Main className={className}>
			<CheckBox checked={isSelectAllCounter} onChange={selectAllCounter}>
				{'Tất cả cửa'}
			</CheckBox>

			<Selects
				components={{ DropdownIndicator }}
				className={'c-select-door'}
				styles={colourStyles}
				theme={themeSelect}
				value={(counter && counter.value) ? counter : null}
				displayEmpty
				style={{ width: '100%', marginTop: 8 }}
				inputProps={{ name: 'selectRole', id: 'selectRole' }}
				isSearchable={false}
				onChange={changeCounter}
				placeholder={<Placeholder>{'Chọn cửa'}</Placeholder>}
				options={counters}
			/>

			<Switch
				onText={'Mở'}
				offText={'Đóng'}
				active={activeCounter}
				onChange={changeActiveFilter}
			/>
		</Main>
	);
};

ControlBar.defaultProps = {
	className: ''
};

ControlBar.propTypes = {
	className: T.string,
};

export default ControlBar;
