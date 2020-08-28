import React, { PureComponent } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import printProvider from "data-access/print-provider";
import receiveProvider from "data-access/receive-provider";
import TableControl from 'containers/book-service/Table/TableControl';
import EditServices from 'containers/book-service/EditServices';
import ConfirmModal from 'components/Modal/ConfirmCommon';
import PrintPDF from 'containers/print';
import { createStructuredSelector } from 'reselect';
import { removePatientServices, updateOnPlanService, openEditService, clearEditData } from '../actions';
import { showModal } from 'components/Modal/RootModal/actions';
import { CustomRow, CustomFixedRow } from './components';
import { columns } from './constants';
import { selectGroupLv1, selectServices } from 'containers/book-service/selectors';
import { structServices, keysToServices } from './utils';
import { findOneService } from 'containers/book-service/utils';
import { Main } from './styled';

class Services extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			filePrint: {},
		};
		this.iframeId = 'print-iframe';
		this.iframe = null;
		this.printerRef = React.createRef();
		this.tableRef = React.createRef();
	}

	showEditing = (rowKey, editMore, type) => () => {
		const { updateOnPlanService, services, openEditService, showEditModal, groupLv1, clearEditData } = this.props;

		if (!editMore) {
			const data = structServices(services, groupLv1);
			let option = {
				group: {},
				patientServiceGroup: [],
				numericalOrder: {}
			};

			// type = 'service', edit one row
			if (type === 'service') {
				const servicesEdit = data.rowData.find(service => service.key === rowKey);
				option = {
					group: { type: servicesEdit.serviceType },
					services: [servicesEdit],
					sequences: data.sequences.filter(sequence => sequence.sequenceGroupNo === servicesEdit.parent)
				};

				openEditService(option);
				showEditModal({ type, callBackWithCustomClose: clearEditData });
			}
			// type = 'sequence' edit services of sequence
			if (type === 'sequence') {
				const servicesEdit = data.rowData.filter(item => item.parent === rowKey);
				const sequence = data.sequences.find(item => item.sequenceGroupNo === rowKey);
				option = {
					group: { type: sequence.parent },
					services: servicesEdit,
					sequences: [sequence]
				};

				openEditService(option);
				showEditModal({ type, callBackWithCustomClose: clearEditData });
			}

			// another type edit group services
			if (type !== 'service' && type !== 'sequence') {
				const servicesEdit = data.rowData.filter(item => item.serviceType === rowKey);
				const sequences = data.sequences.filter(item => item.parent === rowKey);
				option = {
					group: { type: rowKey },
					services: servicesEdit,
					sequences: sequences
				};

				openEditService(option);
				showEditModal({ type: rowKey, callBackWithCustomClose: clearEditData });
			}
		} else {
			const { selected } = this.tableRef.current.state;

			updateOnPlanService(keysToServices(selected, services));
		}
	};

	removeService = (rowKey, removeMore) => () => {
		const { patient, services, removePatientServices } = this.props;
		const { selected } = this.tableRef.current.state;
		removePatientServices(
			keysToServices(removeMore ? selected : [rowKey], services)
				.map(item => ({ id: item.id, patientHistoryId: patient.id }))
		)
	};

	requestRemoveService = (rowKey, removeMore) => () => {
		const { showConfirmModal } = this.props;
		showConfirmModal({
			okAction: this.removeService(rowKey, removeMore),
			title: 'Xoá dịch vụ đã kê',
			message: 'Bạn có muốn xoá dịch vụ này ?',
		});
	};

	printInsuranceCardHolder = (pdf) => {
		const { patient } = this.props;
		printProvider
			.showPdf(pdf)
			.then(s => {
				let patientDocument = patient.patientDocument;
				if (this.printerRef.current) {
					this.printerRef.current.showPdf(s, pdf, patientDocument, null);
					this.printerRef.current.getFirstPdf(pdf);
					this.printerRef.current.saveUnsignedFile(s);
				}
			})
			.catch(e => {});
	};

	printSpecifyForm = (group, ids, temp = {}) => {
		const { patient } = this.props;
		receiveProvider
			.specify_form(patient.id, group, ids)
			.then(s => {
				if (s.code === 0) {
					this.setState({
						filePrint: {
							namePdf: temp.namePdf,
							formId: temp.formId,
							isPatientSign: temp.isPatientSign,
							isDoctorSign: temp.isDoctorSign,
							recordId: temp.recordId,
						}
					});

					let file = s.data[0];

					this.printInsuranceCardHolder(file);
				}
			});
	};

	printReceptionForm = idServices => {
		const { services, patient } = this.props;

		idServices = services.filter(item => item.servicesType === 10).map(item => item.id).join(',');

		receiveProvider
			.reception_form(patient.id, idServices)
			.then(s => {
				if (s.code === 0) {
					let file = ('/api/emr/v1/files/' + s.data).getServiceUrl();
					fetch(file)
						.then(s => s.blob())
						.then(async blob => {
							let objectURL = URL.createObjectURL(blob);
							if (this.iframe) {
								this.iframe.onload = () => {
									window.frames[this.iframeId].print();
								};
								this.iframe.src = objectURL;
							}
						});
				}
			})
			.catch(e => {
				this.setState({
					loading: false,
				});
			});
	};

	printAllService = () => {
		const { services, patient } = this.props;
		const ids = services.map(item => item.id).join(',');

		let temp = {
			namePdf: 'In phiếu chỉ định',
			formId: 1000002,
			isPatientSign: true,
			isDoctorSign: true,
			recordId: patient.id,
		};

		this.printSpecifyForm(null, ids, temp);
	};

	render() {
		const { services, groupLv1, technicalServices } = this.props;

		const { filePrint } = this.state;
		const data = structServices(
			services.map(item => {
				const service = findOneService(technicalServices, item.serviceId);
				return {
					...item,
					uomId: service.uomId,
					servicePurposes: service.servicePurposes || [],
				};
			}),
			groupLv1
		);

		return (
			<Main isEmpty={services.length < 1}>
				{services.length < 1 && (
					<span className={'empty-message'}>{'Chưa có dịch vụ nào'}</span>
				)}
				<TableControl
					ref={this.tableRef}
					columns={columns}
					rows={data.rowData}
					CustomRow={CustomRow}
					CustomFixedRow={CustomFixedRow}
					showEditing={this.showEditing}
					removeService={this.requestRemoveService}
				/>

				<PrintPDF
					isPopup
					{...filePrint}
					printRef={this.printerRef}
					className="print-pdf"
				/>

				<iframe
					width={0}
					height={0}
					style={{ border: 'none', display: 'none' }}
					ref={ref => (this.iframe = ref)}
					name={this.iframeId}
				/>
			</Main>
		)
	}
}

Services.defaultProps = {
	services: [],
};

Services.propTypes = {
	services: T.arrayOf(T.shape({})),
};

const mapState = createStructuredSelector({
	groupLv1: selectGroupLv1(),
	technicalServices: selectServices(),
});

const mapDispatch = (dispatch) => ({
	removePatientServices: data => dispatch(removePatientServices(data)),
	updateOnPlanService: data => dispatch(updateOnPlanService(data)),
	openEditService: data => dispatch(openEditService(data)),
	clearEditData: data => dispatch(clearEditData(data)),
	showEditModal: (modalProps) => {
		const modalType = EditServices;
		dispatch(showModal({ modalType, modalProps }));
	},
	showConfirmModal: (modalProps) => {
		const modalType = ConfirmModal;
		dispatch(showModal({ modalType, modalProps }));
	}
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(Services);
