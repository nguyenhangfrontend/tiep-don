import React from 'react';
import T from 'prop-types';
import { Switch } from './styled';

class AppSwitch extends React.PureComponent {
	onClick = () => {
		const { onChange, active } = this.props;
		onChange(!active);
	};

	render() {
		const { active, onText, offText, className } = this.props;
		return (
			<Switch active={active} onClick={this.onClick} className={className}>
				<div className={`c-switch-content ${active ? 'c-on-content' : 'c-off-content'}`}>
					{active ? onText : offText}
				</div>
				<div className={`c-switch-control ${active ? 'c-on-control' : 'c-off-control'}`} />
			</Switch>
		);
	}
}

AppSwitch.defaultProps = {
	active: false,
	onText: '',
	offText: '',
};

AppSwitch.propTypes = {
	active: T.bool,
	onText: T.string,
	offText: T.string,
};

export default AppSwitch;
