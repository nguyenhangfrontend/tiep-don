import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

class Popover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: props.defaultShow,
		};
	}

	onShow = () => {
		const { onShow } = this.props;
		return onShow ? onShow() : this.setState({ show: true });
	};

	onHide = () => {
		const { onHide } = this.props;
		return onHide ? onHide() : this.setState({ show: false });
	};

	render() {
		const { show, controlRemote, children, content, onShow, onHide, ...other } = this.props;
		const showStt = controlRemote ? show : this.state.show;
		return (
			<Main {...other}>
				<div className={'popover-main'}>
					<div onClick={this.onShow}>
						{children}
					</div>
				</div>
				{showStt && (
					<>
						<div className={'popover-mark'} onClick={this.onHide} />
						<div className={'pop-over-content'}>{content}</div>
					</>
				)}
			</Main>
		);
	}
}

Popover.defaultProps = {
	show: false,
	position: 'bottom-left'
};

Popover.propTypes = {
	defaultShow: T.bool,
	controlRemote: T.bool,
	onHide: T.func,
	onShow: T.func,
	position: T.oneOf(['bottom-left', 'bottom-right', 'bottom'])
};

export default Popover;
