import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import { Main } from './styled';
import Button from 'components/Button';
import ViewIcon from 'resources/svg/view.svg';
import EditIcon from 'resources/svg/edit-white.svg';
import ArrowCollapseIcon from 'resources/svg/arrow-collapse.svg';
import ArrowExpandIcon from 'resources/svg/arrow-expand.svg';
import Avatar from 'components/Avatar';
import { getResource } from 'containers/book-service/utils';
import CheckBox from 'components/CheckBox';

const PatientInfoView = ({
	patient, ethnicityIds, jobIds,
	hospitals, editPatient, expand, handleCollapse
}) => (
	<Main>
		<button onClick={handleCollapse} className={'icon-btn info-expend-btn'}>
			{expand ? <ArrowCollapseIcon /> : <ArrowExpandIcon />}
		</button>
		<div className={'row'}>
			<div className={'col-6 info-box-top left-box'}>
				<div className={'row'}>
					<div className={'col-7'}>
						<p className={'info-name'}>{patient.patientName}</p>
						<p>
							{patient.birthdayStr}
							{' - '}
							{patient.gender === 1 ? 'Nam' : 'Nữ'}
							{' - '}
							{getResource(ethnicityIds, patient.ethnicityId)}
						</p>
						<p>{'Ngày đăng ký: '}{moment(patient.timeGoIn).format('HH:mm DD/MM/YYYY')}</p>
					</div>

					<div className={'col-5'}>
						<p>{'Mã NB: '}{patient.patientValue}</p>
						<p>{'Mã hồ sơ: '}{patient.patientDocument}</p>
						<p>{'SĐT: '}{patient.phone}</p>
					</div>
				</div>
			</div>

			<div className={'col-6 info-box-top'}>
				<div className={'row'}>
					<div className={'col-6 col-custom'}>
						<p>
							{'Đối tượng: '}
							{patient.patientType === 2 ? (patient.extra ? 'BHYT đúng tuyến ' : 'BHYT  trái tuyến') : 'Không BHYT'}
						</p>
						<p>
							{'Số thẻ: '}
							<span className={'green-line'}>
								{patient.insuranceNumber ? `${patient.insuranceNumber}, ${patient.insurancePercent}%` : ''}
							</span>
						</p>
						<p>
							{'Thời gian: '}
							{patient.insuranceFromDate ? moment(patient.insuranceFromDate).format('DD/MM/YYYY') : ''}{' '}
							{patient.insuranceToDate ? '-' : ''}{' '}
							{patient.insuranceToDate ? moment(patient.insuranceToDate).format('DD/MM/YYYY') : ''}
						</p>
					</div>
					<div className={'col-2'}>
						<Avatar height={72} size={'large'} url={ (patient.avatar && patient.avatar.absoluteUrl()) || '/images/avatar-default.png'} />
					</div>
					<div className={'col-4'}>
						<div>
							<Button onClick={editPatient(1)} className={'info-action-btn'} icon={<EditIcon />} type={'blue-light'}>
								{'Cập nhật TT'}
							</Button>
							<Button onClick={editPatient(2)} className={'info-action-btn'} icon={<ViewIcon />} type={'blue-light'}>
								{'Chuyển đối tượng'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>

		{expand && (
			<div className={'row'}>
				<div className={'col-6 left-box'}>
					<div className={'row'}>
						<div className={'col-7'}>
							<div className={'box-border info-box-bottom'}>
								<p>{'Địa chỉ: '}{patient.address}</p>
								<p>{'NN: '}{getResource(jobIds, patient.jobId)}</p>
								<div className={'info-group-check-box info-left-group'}>
									<CheckBox checked={patient.priority} size={18} className={'check-box-item'} type={'gray'} disabled>
										{'Ưu tiên'}
									</CheckBox>
									<CheckBox checked={patient.appointment} size={18} className={'check-box-item'} type={'gray'} disabled>
										{'Người bệnh hẹn khám'}
									</CheckBox>
								</div>
							</div>
						</div>

						<div className={'col-5'}>
							<div className={'box-border info-box-bottom'}>
								<p>{'Tên người bảo lãnh: '}{patient.guardianName}</p>
								<p>{'CMT/HC: '}{patient.idNo}</p>
								<p>{'CMT/HC người bảo lãnh: '}{patient.guardianIdNo}</p>
								<p>{'SĐT người bảo lãnh: '}{patient.guardianPhone}</p>
							</div>
						</div>
					</div>
				</div>

				<div className={'info-box-bottom col-6'}>
					<p>
						{'T/g đủ 5 năm liên tục: '}
						{patient.continuity5YearDate && moment(patient.continuity5YearDate).format('DD/MM/YYYY')}
					</p>
					<p>{'Nơi giới thiệu: '}{getResource(hospitals, patient.patientFromHospitalId)}</p>
					<p>{'Nơi ĐK: '}{getResource(hospitals, patient.regAtHospitalId)}</p>
					<p>{'ĐC/ BHYT: '}{patient.insuranceAddress}</p>
					<div className={'info-group-check-box'}>
						<CheckBox checked={patient.notCopayment} size={18} className={'check-box-item'} type={'gray'} disabled>
							{'Miễn đồng chi trả'}
						</CheckBox>
						<CheckBox checked={patient.continuity5Year} size={18} className={'check-box-item'} type={'gray'} disabled>
							{'BHYT 5 năm liên tục và đồng chi trả < 6 tháng lương'}
						</CheckBox>
					</div>
				</div>
			</div>
		)}
	</Main>
);

PatientInfoView.defaultProps = {
	patient: {},
	ethnicityIds: [],
	jobIds: [],
	sequenceNo: '',
};

PatientInfoView.propTypes = {
	patient: T.shape({}),
	sequenceNo: T.string,
	ethnicityIds: T.arrayOf(T.shape({})),
	jobIds: T.arrayOf(T.shape({})),
};

export default PatientInfoView;
