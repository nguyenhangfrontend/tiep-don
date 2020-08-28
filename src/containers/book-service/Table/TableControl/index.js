import React, { PureComponent } from 'react';
import T from 'prop-types';
import { uniq, xor } from 'lodash';
import TableFixedLeft from '../TableFixedLeft';
import { Main } from './styled';
import { checkSelectedAllChild } from './utils';

const name = 'services-booked';

class ControlTable extends PureComponent {
	constructor(props) {
		super(props);
		this.node = null;
		this.tableRef = React.createRef();
		this.state = {
			selected: [],
			isFocus: false,
			indexFocus: -1,
			allSelected: false,
		};
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleArrowKey);
		document.addEventListener('mousedown', this.clickOutSide);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleArrowKey);
		document.removeEventListener('mousedown', this.clickOutSide);
	}

	handleArrowKey = e => {
		const { focus, indexFocus } = this.state;
		const { rows } = this.props;

		if (focus) {
			const row = rows.find((item, index) => index === indexFocus) || {};
			const size = rows.length - 1;

			switch (e.keyCode) {
				case 38:
					e.preventDefault();
					this.handleChangeIndexFocus(indexFocus - 1 < 0 ? 0 : indexFocus - 1, e, row.key);
					break;
				case 40:
					e.preventDefault();
					this.handleChangeIndexFocus(indexFocus + 1 > size ? size : indexFocus + 1, e, row.key);
					break;
				case 32:
					e.preventDefault();
					this.handleChangeSelected(indexFocus, row.key, row.child)();
					break;
				default:
					return;
			}
		}
	};

	setNode = node => {
		this.node = node;
	};

	focusMe = () => {
		const { focus, indexFocus } = this.state;
		if (!focus) {
			this.setState({
				focus: true,
				indexFocus: indexFocus !== -1 ? indexFocus : 0,
			});
		}
	};

	handleChangeIndexFocus = (indexFocus, e, key) => {
		const target = document.getElementById(`${name}_${indexFocus}`);
		if (this.tableRef.current && target) {
			this.tableRef.current.remoteScroll(target.offsetTop);
		}

		if (e && e.shiftKey) {
			this.handleChangeSelected(indexFocus, key);
		}

		this.setState({ indexFocus });
	};

	clickOutSide = (e) => {
		if (this.node && !this.node.contains(e.target)) {
			this.setState({ focus: false, indexFocus: -1 });
		}
	};

	selectAll = (checked) => {
		const { rows } = this.props;
		let keys = [];
		if (checked) {
			rows.forEach(item => { keys.push(item.key) });
			this.setState({ selected: keys, allSelected: true });
		} else {
			this.setState({ selected: keys, allSelected: false });
		}
	};

	handleChangeSelected = (index, key, child) => () => {
		const { selected } = this.state;
		const { rows } = this.props;

		if (Array.isArray(child)) {
			// add list
			const row = rows.find(item => item.key === key);
			if (selected.includes(key)) {
				if (checkSelectedAllChild(selected, rows, key)) {
					this.setState({ selected: xor([...child, key], selected) })
				} else {
					this.setState({ selected: xor([...child, key], selected) })
				}
			} else {
				if (checkSelectedAllChild(selected, rows, key)) {
					this.setState({ selected: uniq([...selected, ...child, key]) });
				} else {
					this.setState({ selected: uniq([...selected, ...child, key]) });
				}
			}
		} else {
			// add one
			const row = rows.find(item => item.key === key);

			if (selected.includes(key)) {
				if (checkSelectedAllChild(selected, rows, key)) {
					this.setState({ selected: xor([key], selected, [row.parent]) })
				} else {
					this.setState({ selected: xor([key], selected) });
				}
			} else {
				if (checkSelectedAllChild(selected, rows, key)) {
					this.setState({ selected: [...selected, key] });
				} else {
					this.setState({ selected: [...selected, key, row.parent] });
				}
			}
		}

		this.handleChangeIndexFocus(index);
	};

	render() {
		const { focus, selected } = this.state;
		const { columns, rows, CustomRow, CustomFixedRow, showEditing, removeService } = this.props;

		return (
			<Main ref={this.setNode}>
				<div className={focus ? 'focus' : ''} onClick={this.focusMe}>
					<TableFixedLeft
						{...this.state}
						ref={this.tableRef}
						name={name}
						columns={columns}
						rows={rows}
						handleChangeSelected={this.handleChangeSelected}
						selectAll={this.selectAll}
						CustomRow={CustomRow}
						CustomFixedRow={CustomFixedRow}
						onDoubleClickRow={showEditing}
						removeService={removeService}
					/>
				</div>
				<div className={'table-footer'}>
					{`Đã chọn ${
						rows.filter(item => !item.sequenceGroupNo)
							.map(item => selected.find(key => item.key === key))
							.filter(item => !!item)
							.length
					}/${
						rows.filter(item => !item.sequenceGroupNo).length
					}`}
				</div>
			</Main>
		);
	}
}

ControlTable.propTypes = {
	columns: T.arrayOf(T.shape({})),
	rows: T.arrayOf(T.shape({})),
};

export default ControlTable;
