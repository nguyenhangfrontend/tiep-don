import React, { PureComponent } from 'react';
import T from 'prop-types';
import Header from '../Header';
import Body from '../Body';
import { Main } from './styled';

class TableMain extends PureComponent {
	constructor(props) {
		super(props);

		const defaultColProps = props.columns.map(item => ({
			width: item.width,
			key: item.key,
		}));

		this.state = {
			columnProps: defaultColProps,
		};
	}

	resizeable = (currentCol, nextCol) => {
		const { columnProps } = this.state;

		const newProps = columnProps.map(col => {
			if (col.key === currentCol.key) {
				return currentCol;
			}

			if (col.key === nextCol.key) {
				return nextCol;
			}

			return col;
		});

		this.setState({ columnProps: newProps });
	};

	render() {
		const {
			columns, rows, indexFocus, selected, name, handleChangeSelected,
			CustomRow, actions, onDoubleClickRow, className, allSelected,
		} = this.props;

		return (
			<Main className={className}>
				<Header
					{...this.state}
					selectAll={actions.selectAll}
					allSelected={allSelected}
					columns={columns}
					resizeable={this.resizeable}
				/>

				<Body
					{...this.state}
					name={name}
					columns={columns}
					rows={rows}
					indexFocus={indexFocus}
					selected={selected}
					handleChangeSelected={handleChangeSelected}
					CustomRow={CustomRow}
					actions={actions}
					onDoubleClickRow={onDoubleClickRow}
				/>
			</Main>
		)
	}
}

TableMain.defaultProps = {
	className: '',
};

TableMain.propTypes = {
	...Body.propTypes,
	...Header.propTypes,
	className: T.string,
};

export default TableMain;
