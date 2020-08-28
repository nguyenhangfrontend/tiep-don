import React from 'react';
import View from './View';

class PatientInfo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			expand: false,
		};
	}

	handleCollapse = () => {
		const { expand } = this.state;
		this.setState({ expand: !expand })
	};

	render() {
		const { patient, ethnicityIds, jobIds, hospitals, editPatient } = this.props;

		return (
			<View
				{...this.state}
				handleCollapse={this.handleCollapse}
				editPatient={editPatient}
				patient={patient}
				ethnicityIds={ethnicityIds}
				jobIds={jobIds}
				hospitals={hospitals}
			/>
		);
	}
}

PatientInfo.propTypes = {
	...View.propTypes,
};

export default PatientInfo;
