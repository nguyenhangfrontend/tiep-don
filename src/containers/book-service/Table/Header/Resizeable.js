import React from 'react';
import T from 'prop-types';
import { ResizeElm } from './styled';

class Resizeable extends React.PureComponent {
	constructor(props) {
		super(props);
		this.node = null;
		this.state = {
			pageX: 0,
			onFocus: false,
			currentWidth: 0,
			nextWidth: 0,
		};
	}

	componentDidMount() {
		this.node.addEventListener('mousedown', this.handleMousedown);
		document.addEventListener('mouseup', this.handleMouseup);
	}

	componentWillUnmount() {
		this.node.removeEventListener('mousedown', this.handleMousedown);
		document.removeEventListener('mouseup', this.handleMouseup);
	}

	setNode = node => {
		this.node = node;
	};

	handleMousedown = (e) => {
		const { currentColProps, nextColProps } = this.props;

		document.addEventListener('mousemove', this.handleMousemove);

		this.setState({
			pageX: e.pageX,
			onFocus: true,
			nextWidth: nextColProps.width,
			currentWidth: currentColProps.width,
		});
	};

	handleMousemove = (e) => {
		const { resizeable, currentColProps, nextColProps } = this.props;
		const { pageX, onFocus, currentWidth, nextWidth } = this.state;

		if (pageX && onFocus) {
			const diffX = e.pageX - pageX;
			resizeable(
				{ ...currentColProps, width: currentWidth + diffX },
				{ ...nextColProps, width: nextWidth ? nextWidth - diffX : null },
			);
		}
	};

	handleMouseup = () => {
		document.removeEventListener('mousemove', this.handleMousemove);

		this.setState({
			pageX: 0,
			onFocus: false,
			currentWidth: 0,
			nextWidth: 0,
		});
	};

	render() {
		const { className } = this.props;
		return (
			<ResizeElm className={className} ref={this.setNode} />
		);
	}
}

Resizeable.defaultProps = {
	className: '',
	currentColProps: {},
	nextColProps: {},
};

Resizeable.propTypes = {
	className: T.string,
	currentColProps: T.shape({}),
	nextColProps: T.shape({}),
};

export default Resizeable;
