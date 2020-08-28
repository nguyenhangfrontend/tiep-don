import React, { PureComponent } from 'react';
import { Main } from './styled';
import TableMain from '../TableMain';

class TableFixed extends PureComponent {
	constructor(props) {
		super(props);
		this.currenScroll = 0;
		this.leftNode = null;
		this.mainNode = null;
	}

	setLeftNode = node => {
		this.leftNode = node;
	};

	setMainNode = node => {
		this.mainNode = node;
	};

	handleScroll = (e) => {
		if (this.currenScroll !== e.target.scrollTop) {
			this.currenScroll = e.target.scrollTop;
			this.mainNode.scrollTop = e.target.scrollTop;
			this.leftNode.scrollTop = e.target.scrollTop;
		}
	};

	remoteScroll = (offsetTop) => {
		const scrollHeight = this.mainNode.scrollHeight;
		const scrollTop = this.mainNode.scrollTop;
		const height = this.mainNode.clientHeight;

		if ((offsetTop - scrollTop) > height - 80 && scrollTop < (scrollHeight - height)) {
			this.mainNode.scrollTop = scrollTop + 80;
		} else if (offsetTop - scrollTop - 80 < 0 && scrollTop > 0) {
			this.mainNode.scrollTop = scrollTop - 80;
		}
	};

	render() {
		const { indexFocus, columns, rows, selected, name, onDoubleClickRow, removeService,
			handleChangeSelected, CustomRow, CustomFixedRow, selectAll, allSelected } = this.props;

		return (
			<Main>
				<div ref={this.setLeftNode} className={'t-fix-left'} onScroll={this.handleScroll}>
					<TableMain
						columns={columns.filter(item => item.fixed === 'left')}
						indexFocus={indexFocus}
						rows={rows}
						name={name}
						selected={selected}
						allSelected={allSelected}
						CustomRow={CustomFixedRow}
						actions={{ handleChangeSelected, selectAll, edit: onDoubleClickRow, removeService }}
						handleChangeSelected={handleChangeSelected}
					/>
				</div>

				<div ref={this.setMainNode} className={'t-main'} onScroll={this.handleScroll}>
					<TableMain
						className={'tb-content'}
						indexFocus={indexFocus}
						columns={columns}
						rows={rows}
						name={name}
						selected={selected}
						handleChangeSelected={handleChangeSelected}
						CustomRow={CustomRow}
						actions={{ handleChangeSelected, selectAll, edit: onDoubleClickRow, removeService }}
						onDoubleClickRow={onDoubleClickRow}
					/>
				</div>
			</Main>
		)
	}
}

export default TableFixed;
