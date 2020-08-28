import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

class Card extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { className, title, header, footer, children, type, scrollHeight, bodyRender } = this.props;
		return (
			<Main type={type} className={className} scrollHeight={scrollHeight}>
				{(title && !header) && (
					<div className={'card-head c-card-title'}>
						{title}
					</div>
				)}

				{header && (
					<div className={'card-head'}>
						{header}
					</div>
				)}

				{bodyRender ? bodyRender : (
					<div className={`card-body ${scrollHeight ? 'scroll-bar' : ''}`}>
						{children}
					</div>
				)}

				{footer && (
					<div className={'card-foot'}>
						{footer}
					</div>
				)}
			</Main>
		);
	}
}

Card.defaultProps = {
	className: ''
};

Card.propTypes = {
	header: T.node,
	footer: T.node,
	className: T.string,
};

export default Card;
