import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import EventLayerWrapper from 'components/EventLayerWrapper';
import HospitalDB from 'utils/IndexedDB/Hospital';
import { Main } from './styled';
import { errors } from './constants';
import moment from 'moment';
import { fetchPatientSuccess, setIgnoreCheckInsurance } from 'containers/reception/actions';
import { createStructuredSelector } from 'reselect';
import {
	selectIsCreate
} from 'containers/reception/selectors';

const InsuranceModal = ({ data, modalActions, modalData, fetchPatientSuccess, isCreateAction, setIgnoreCheckInsurance }) => {
	const [hospitalsIds, setHospitalIds] = useState([]);
	const [error, setError] = useState({});
	const [noInfoInsurance, setNoInfoInsurance] = useState(true);

	useEffect(() => {
		HospitalDB.getAll(getHospitalFromDB);
		getMessageErrorPortal();
	}, []);

	const getMessageErrorPortal = () => {
		const error = errors.find(item => item.code === data['maKetQua']);
		setError(error);
		if(error && error.code === '070'){
			setIgnoreCheckInsurance(false)
		}
		if (!data.maThe && !data.ngaySinh && !data.gioiTinh) {
			setNoInfoInsurance(false)
		}
	};

	const getHospitalFromDB = data => {
		const listHospital = data.sort((a, b) => {
			return new Date(a.value) - new Date(b.value);
		});
		const hospitalsIds = listHospital.map(item => {
			return {
				...item,
				displayText: `${item.value} - ${item.name}`,
			};
		});
		setHospitalIds(hospitalsIds);
	};

	
	const filldataInsurance = () => {
		const maDKBD = hospitalsIds.find(item => item.value === data.maDKBD) || {};
		const params = {
			insuranceNumber: data.maThe,
			patientName: data.hoTen,
			gender: data.gioiTinh === 'Nữ' ? 2: 1,
			birthday: moment(data.ngaySinh, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			insuranceAddress: data.diaChi,
			regAtHospitalId: maDKBD.id,
			patientType: 2,
			insuranceFromDate: moment(data.gtTheTu, 'DD/MM/YYYY') ,
			insuranceErrorCode: data.maKetQua,
			insuranceToDate: moment(data.gtTheDen, 'DD/MM/YYYY') ,
			continuity5YearDate:  moment(data.ngayDu5Nam, 'DD/MM/YYYY') ,
		}
		fetchPatientSuccess(params)
	}

	const {
		checkIgnoreInsurancePortal,
		regAtHospitalId,
		birthday,
		patientName,
		gender,
		continuity5YearDate,
		insuranceFromDate,
		insuranceToDate,
	} = modalData();


	const maDKBD = hospitalsIds.find(item => item.value === data.maDKBD) || {};
	const maCSKCB = data.dsLichSuKCB2018 ? hospitalsIds.find(item => item.value === data.dsLichSuKCB2018[0].maCSKCB) : '';
	const regAtHospital = hospitalsIds.find(item => item.id === regAtHospitalId) || {};

	const footer = callback => (
		<div className="text-right">
			{isCreateAction === true ? (
				<div>
					<div className="mokup-button">
						{!checkIgnoreInsurancePortal ? null : (
							<Button
								onClick={callback}
								className="mokup-button-item mokup-button-no"
								shortKey={'ESCAPE'}
								keyCode={27}
								type={'bluedark-light'}
								size={'medium'}
							>
								<img alt="" className="mokup-icon" src="/images/check.png" />
								Hủy
							</Button>
						)}

						<Button
							//
							className="mokup-button-item mokup-button-yes"
							shortKey={'ENTER'}
							keyCode={13}
							type={'primary'}
							onClick={() => {
								callback();
								modalActions.save(true)
							}}
						>
							<img alt="" className="mokup-icon" src="/images/check.png" />
							Lưu
						</Button>
					</div>
				</div>
			) : noInfoInsurance ? (
				<div className="mokup-button">
					<Button
						onClick={callback}
						className="mokup-button-item mokup-button-no"
						shortKey={'ESCAPE'}
						keyCode={27}
						type={'bluedark-light'}
					>
						<img alt="" className="mokup-icon" src="/images/close.png" />
						Không chấp nhận
					</Button>

					<Button
						className="mokup-button-item mokup-button-yes"
						onClick={() => {
							callback();
							filldataInsurance();
						}}
						shortKey={'ENTER'}
						keyCode={13}
						type={'primary'}
					>
						<img alt="" className="mokup-icon" src="/images/check.png" />
						Chấp nhận
					</Button>
				</div>
			) : (
				<div className="mokup-button">
					<Button
						onClick={callback}
						className="mokup-button-item mokup-button-no"
						shortKey={'ESCAPE'}
						keyCode={27}
						type={'bluedark-light'}
					>
						<img alt="" className="mokup-icon" src="/images/close.png" />
						Không chấp nhận
					</Button>
					<Button
						onClick={callback}
						className="mokup-button-item mokup-button-yes"
						shortKey={'ENTER'}
						keyCode={13}
						type={'primary'}
					>
						<img alt="" className="mokup-icon" src="/images/check.png" />
						Chấp nhận
					</Button>
				</div>
			)}
		</div>
	);

	const gender1 = gender && (parseInt(gender) === 1 ? 'Nam' : 'Nữ');
	return (
		<EventLayerWrapper layerEvent={{ key: 'insuranceModal', events: [] }}>
			<Main className="poup">
				<div className="emr-small">
					<Modal className="mokup" show footer={footer} width={'60%'} isDark>
						<div>
							<div className="mokup-item">
								<h1 className="mokup-title">
									Check cổng bảo hiểm {modalData.patientDocument && ` - ${modalData.patientDocument}`}
								</h1>
								<h1
									className={error && !error.error ? 'mokup-confirm color-red' : 'mokup-confirm'}
								>
                <span className="mokup-check">
                  {data.maKetQua}: { error && error.message}
                </span>
								</h1>
								<div className="mokup-info">
									<div className="mokup-info-user">
										{data.ten && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Họ và tên:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.ten}{' '}
													{!data.checkInsuranceBarcode
														? patientName &&
														patientName.toLocaleUpperCase() !==
														data.ten.toLocaleUpperCase() && (
															<span className="error-info--insurance color-red">
                                (Sai: {patientName})
                              </span>
														)
														: null}{' '}
												</p>
											</div>
										)}
										{data.ngaySinh && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Ngày sinh:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.ngaySinh}{' '}
													{birthday && birthday !== data.ngaySinh && (
														<span className="error-info--insurance color-red">
                            (Sai: {birthday})
                          </span>
													)}
												</p>
											</div>
										)}

										{data.gioiTinh && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Giới tính:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.gioiTinh}{' '}
													{gender && gender1 !== data.gioiTinh && (
														<span className="error-info--insurance color-red">
                            (Sai: {gender1})
                          </span>
													)}
												</p>
											</div>
										)}

										{data.diaChi && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Địa chỉ:</p>
												<p className="mokup-info-item-inner">{data.diaChi}</p>
											</div>
										)}

										{data.maDKBD && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Nơi ĐK:</p>
												<p className="mokup-info-item-inner">
													{maDKBD ? <span>{maDKBD.displayText}</span> : ''}
													{regAtHospital.value !== maDKBD.value && (
														<span className="error-info--insurance color-red">
														(Sai: {regAtHospital.displayText})
													</span>
													)
													
													}
												</p>
											</div>
										)}

										{data.ngayDu5Nam && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Ngày đủ 5 năm:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.ngayDu5Nam && data.ngayDu5Nam}{' '}
													{data.ngayDu5Nam &&
													continuity5YearDate &&
													data.ngayDu5Nam !==
													continuity5YearDate.format('dd/MM/yyyy') && (
														<span className="error-info--insurance color-red">
                              (Sai: {continuity5YearDate.format('dd/MM/yyyy')})
                            </span>
													)}
												</p>
											</div>
										)}
										{data.gtTheTu && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Từ ngày:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.gtTheTu && data.gtTheTu}{' '}
													{insuranceFromDate &&
													insuranceFromDate.format('dd/MM/yyyy') !==
													data.gtTheTu && (
														<span className="error-info--insurance color-red">
                              (Sai: {insuranceFromDate.format('dd/MM/yyyy')})
                            </span>
													)}
												</p>
											</div>
										)}
										{/* {data.gtTheDen && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Đến ngày:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.gtTheDen && data.gtTheDen}{' '}
													{insuranceToDate &&
													insuranceToDate.format('dd/MM/yyyy') !==
													data.gtTheDen && (
														<span className="error-info--insurance color-red">
                              (Sai: {insuranceToDate.format('dd/MM/yyyy')})
                            </span>
													)}
												</p>
											</div>
										)} */}
										{data.gtTheDen && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Từ ngày:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.gtTheDen && data.gtTheDen}{' '}
													{insuranceToDate &&
													insuranceToDate.format('dd/MM/yyyy') !==
													data.gtTheDen && (
														<span className="error-info--insurance color-red">
                              (Sai: {insuranceToDate.format('dd/MM/yyyy')})
                            </span>
													)}
												</p>
											</div>
										)}
										{data.maTheMoi && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Mã thẻ mới:</p>
												<p className="mokup-info-item-inner">
													{' '}
													{data.maTheMoi ? (
														<span>
                            {data.maTheMoi} ({data.gtTheTuMoi} -{' '}
															{data.gtTheDenMoi})
                          </span>
													) : (
														''
													)}
												</p>
											</div>
										)}

										{data.maDKBDMoi && (
											<div className="mokup-info-item">
												<p className="mokup-info-item-title"> Mã ĐK mới:</p>
												<p className="mokup-info-item-inner"> {data.maDKBDMoi}</p>
											</div>
										)}
									</div>

									{data.dsLichSuKCB2018 && data.dsLichSuKCB2018[0].maCSKCB !== maDKBD &&
									parseInt(data.dsLichSuKCB2018[0].tinhTrang) === 2 && (
										<div className="mokup-hospital-before">
											<h5 className="mokup-hospital-before-title">
												Bệnh viện trước
											</h5>
											<div className="mokup-hospital-before-info">
												<div className="row">
													<div className="col-lg-7 col-md-7 col-sm-7">
														<div className="mokup-info-item">
															<p className="mokup-info-item-title">
																{' '}
																Bệnh viện:
															</p>
															<p className="mokup-info-item-inner">
																{maCSKCB.displayText}
															</p>
														</div>
														<div className="mokup-info-item">
															<p className="mokup-info-item-title">
																{' '}
																Chẩn đoán:
															</p>
															<p className="mokup-info-item-inner">
																{' '}
																{data.dsLichSuKCB2018[0].maCSKCB.tenBenh}
															</p>
														</div>
													</div>
													<div className="col-lg-5 col-md-5 col-sm-5">
														<div className="mokup-info-item">
															<p className="mokup-info-item-title">
																{' '}
																Lý do vào:
															</p>
															<p className="mokup-info-item-inner">
																{' '}
																Thông tuyến
															</p>
														</div>
														<div className="mokup-info-item">
															<p className="mokup-info-item-title">
																{' '}
																Ngày đăng ký:
															</p>
															<p className="mokup-info-item-inner">
																{' '}
																{data.ngayVao}
															</p>
														</div>
														<div className="mokup-info-item">
															<p className="mokup-info-item-title">
																{' '}
																Thời gian ra viện:
															</p>
															<p className="mokup-info-item-inner">
																{data.ngayRa}
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									)}

									{error && error.errorServer ? (
										<p className="error-serverPortal">
											Vui lòng truy cập{' '}
											<a
												rel="noopener noreferrer"
												target="_blank"
												href="https://gdbhyt.baohiemxahoi.gov.vn/"
											>
												https://gdbhyt.baohiemxahoi.gov.vn/
											</a>{' '}
											để kiểm tra
										</p>
									) : null}
								</div>
							</div>
						</div>
					</Modal>
				</div>
			</Main>
		</EventLayerWrapper>
	);
};

InsuranceModal.defaultProps = {
	data: {},
};

InsuranceModal.propTypes = {
	errors: T.object,
	data: T.object,
};
const mapState = createStructuredSelector({
  isCreateAction: selectIsCreate(),
}); 
const mapDispatch = dispatch => ({
  fetchPatientSuccess: data => dispatch(fetchPatientSuccess(data)),
  setIgnoreCheckInsurance: data => dispatch(setIgnoreCheckInsurance(data)),
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  InsuranceModal,
);
