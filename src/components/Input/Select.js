import React from 'react';
import T from 'prop-types';
import { SelectStyled } from './styled';
import DownIcon from 'resources/svg/down.svg';
import Input from './Input';

class SelectCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resources: props.resources,
			label: '',
			localValue: props.value,
			itemSelected: props.defaultValue,
			filterActive: false,
		};
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.deactivateFilter);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.deactivateFilter);
	}

	onFilter = (value) => {
		const { resources } = this.props;
		let filterList = [];
		if (value[0] === '%') {
			filterList = resources.filter(item => {
				const str = value.slice(1).toLocaleLowerCase();
				return  (item.slice(0, str.length) === str);
			});
		} else {
			filterList = resources.filter(item => item.label.toLocaleLowerCase().includes(value));
		}

		this.setState({ resources: filterList, label: value });
	};

	onSelect = (e) => {
		const { onSelect, allowOutObj } = this.props;
		const { resources } = this.state;
		const output = e.currentTarget.value;
		const itemSelected = resources.find(item => item.value === parseInt(output)) || {};

		onSelect ? onSelect(allowOutObj ? itemSelected : parseInt(output)) : this.setState({ itemSelected});
		this.setState({ resources: this.props.resources, label: '', filterActive: false })
	};

	activeFilter = () => {
		this.setState({ filterActive: true, resources: this.props.resources });
	};

	deactivateFilter = (event) => {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.setState({ filterActive: false, resources: this.props.resources });
		}
	};

	render() {
		const { resources, label, filterActive, localValue } = this.state;
		const { showSearch, value, onSelect, ...other } = this.props;
		const valueActive = onSelect ? value : localValue;
		const itemSelected = resources.find(item => item.value === valueActive) || {};

		return (
			<SelectStyled title={itemSelected.label} {...other}>
				<div className={'c-select-content'} onClick={this.activeFilter}>
					{showSearch ? (
						<div className={'c-select-filter'}>
								<Input
									className={`c-select-filter-input ${!filterActive ? 'hidden-input' : ''}`}
									value={label}
									onChange={this.onFilter}
									onFocus={this.activeFilter}
								/>
								<div className={`c-select-display ${filterActive ? 'hidden-value' : ''}`}>{itemSelected.label}</div>
						</div>
					) : (
						<div className={'c-select-display'}>{itemSelected.label}</div>
					)}

					<span className={'c-select-icon'}>
						<DownIcon />
					</span>
				</div>

				{filterActive && (
					<div ref={node => this.wrapperRef = node} className={'c-select-options'} onBlur={this.deactivateFilter}>
						{resources.map(item => (
							<button
								key={item.value}
								className={'c-select-item'}
								value={item.value}
								onClick={this.onSelect}
							>
								{item.label}
							</button>
						))}
					</div>
				)}
			</SelectStyled>
		);
	}
}

SelectCustom.defaultProps = {
	defaultValue: {},
	resources: [],
};

SelectCustom.propTypes = {
	defaultValue: T.shape({}),
	showSearch: T.bool,
	resources: T.arrayOf(T.shape({}))
};

export default SelectCustom;
