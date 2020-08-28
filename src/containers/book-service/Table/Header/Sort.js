import React from 'react';
import SortIcon from 'resources/images/group-service/sort.png';
import { SortContain } from './styled';

class Sort extends React.PureComponent {
	render() {
		return (
			<SortContain>
				<button className={'icon-btn'}>
					<img src={SortIcon} alt="icon"/>
				</button>
			</SortContain>
		);
	}
}

export default Sort;
