import React, { PureComponent } from 'react';
import T from 'prop-types';
import moment from 'moment';
import { checkFormat, objectConverter, dateDefault } from './utils';
import { Main } from './styled';

class DOBInput extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			error: '',
			momentDate: '',
			date: '',
			onFocus: false,
		};
	}

	keyUpBirthday = (e) => {
		
		
		if ((e.key && e.key === 'Tab') || (e.key && e.key === 'Enter')) {
			this.parseDate();
		}
	};

	

	parseDate = async () => {
		const { onChange, value } = this.props;

		if (!value.strData) {
			const text = value ? value.str : '';

			const formatStr = checkFormat(text) || '';
			let momentDate;

			if (formatStr.length > 3) {
				momentDate = moment(text, formatStr).isValid() ?
					objectConverter(moment(text, formatStr), 'DD/MM/YYYY') : dateDefault;
			} else {
				const year = parseFloat(moment().format('YYYY')) - parseFloat(text);
				momentDate = moment(year, 'YYYY').isValid() ? objectConverter(moment(year, 'YYYY'), 'YYYY') : dateDefault;
			}

			if (momentDate) {
				onChange(momentDate);
			}
		}
	};

	handleChangeBirthDay = e => {
		const { onChange } = this.props;
		const value = e.target.value;

		onChange({ str: value });
	};

	render() {
		const { value,  disabled} = this.props;

		return (
			<Main className="input-content">
				<div className={'input-date-c'}>
					<input
						type="text"
						onChange={this.handleChangeBirthDay}
						onBlur={this.parseDate}
						onKeyUp={this.keyUpBirthday}
						onKeyDown={this.handKeyDown}
						value={value ? value.str : ''}
						placeholder="Ngày sinh"
						className={`active-element service-input form-control`}
						disabled={disabled}
					/>
				</div>
			</Main>
		);
	}
}

export default DOBInput;
