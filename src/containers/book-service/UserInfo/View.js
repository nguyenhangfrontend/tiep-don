import React from 'react';
import T from 'prop-types';
import { Main } from './styled';

const UserInfoView = ({ patient, type }) => {
	const gender = patient.gender === 1 ? "Nam" : "Nữ";
	const avatar = patient.avatar ? patient.avatar.absoluteUrl() : '/images/image.png';
	return (
		<Main type={type}>
			<div className="user-base-info">
				<h4>{patient && patient.patientName}</h4>
				<p>
					{`${patient.birthdayStr} - ${gender}`}
					{patient.patientType === 2 ? (
						<>
							{' - Có BH'}
							<span className="color-red">{` (${patient.insurancePercent}%)`}</span>
						</>
					) : ''}
				</p>
				<p>Mã NB: {patient && patient.patientValue}, Mã hồ sơ: {patient && patient.patientDocument}</p>
			</div>

			<div>
				<img src={avatar} className="user-avatar" alt="avatar" />
			</div>
		</Main>
	)
};

UserInfoView.defaultProps = {
	patient: {},
	type: 'dark'
};

UserInfoView.propTypes = {
	patient: T.shape({}),
	type: T.oneOf(['dark', 'light'])
};

export default UserInfoView;
