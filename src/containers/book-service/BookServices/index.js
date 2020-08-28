import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { selectDepartments } from 'containers/book-service/selectors';
import { selectUserApp } from 'reducers/selectors';
import { selectPatient } from 'containers/reception/selectors';
import { addService, updateOnPlanService } from 'containers/book-service/actions';
import View from './View';
import { convertService } from './utils';

class PopupBookService extends PureComponent {
	constructor(props) {
		super(props);
		this.groupServiceRef = React.createRef();
		this.selectServiceRef = React.createRef();
		this.listServiceByGroup = [];

		this.state = {
			showError: false,
			errors: [],
			success: 0,
			loading: false,
		};

		this.groupChange = this.groupChange.bind(this);
	}

	show = () => {
		this.setState({ showPopup: true });
	};

	groupChange = (list) => {
		this.listServiceByGroup = list;
	};

	onSearch = (keyword, type) => {
		let list = this.listServiceByGroup;
		if (keyword && keyword.trim()) {
			keyword = keyword
				.trim()
				.toLocaleLowerCase()
				.unsignText();
			if (keyword[0] === '%') {
				keyword = keyword.substr(1);
				list = (list || []).filter(item => {
					return (
						item.active &&
						((type !== 0 && item.serviceGroupLevel1) ||
							(type === 0 && !item.serviceGroupLevel1)) &&
						(item.value
							.toLocaleLowerCase()
							.unsignText()
							.indexOf(keyword) === 0 ||
							item.name
								.toLocaleLowerCase()
								.unsignText()
								.indexOf(keyword) === 0)
					);
				});
			} else {
				list = (list || []).filter(item => {
					return (
						item.active &&
						((type !== 0 && item.serviceGroupLevel1) ||
							(type === 0 && !item.serviceGroupLevel1)) &&
						(item.value
							.toLocaleLowerCase()
							.unsignText()
							.indexOf(keyword) !== -1 ||
							item.name
								.toLocaleLowerCase()
								.unsignText()
								.indexOf(keyword) !== -1)
					);
				});
			}
		} else {
			list = (list || []).filter(item => {
				return (
					item.active &&
					((type !== 0 && item.serviceGroupLevel1) ||
						(type === 0 && !item.serviceGroupLevel1))
				);
			});
		}
		return list;
	};

	onSubmit = (services, callBack, callBack2) => {
		if (isEmpty(services)){
			toast.error('Vui lòng chọn dịch vụ trước!')
		} else {
			const { userApp, patient, departments, addService } = this.props;
			const department = departments.find(item => item.id === userApp.department.value) || {};
			const data = services.map(item => convertService(item, userApp, patient, department));

			addService({ services: data, callBack2 });
		}
	};

	onTypeChange = type => {
		this.selectServiceRef.current.selectType(type);
		this.groupServiceRef.current.selectType(type);
	};

	onFocusSearch = () => {
		const { textSearch } = this.selectServiceRef.current;
			textSearch.focus();
	};

	quit = () => {
		const { updateOnPlanService } = this.props;
		this.setState({ showPopup: false });
		updateOnPlanService([]);
	};

	render() {
		const { showPopup } = this.state;

		if (!showPopup) return null;

		return (
			<View
				{...this.state}
				groupServiceRef={this.groupServiceRef}
				selectServiceRef={this.selectServiceRef}
				quit={this.quit}
				groupChange={this.groupChange}
				onTypeChange={this.onTypeChange}
				onSearch={this.onSearch}
				onSubmit={this.onSubmit}
			/>
		);
	}
}

const mapState = createStructuredSelector({
	departments: selectDepartments(),
	userApp: selectUserApp(),
	patient: selectPatient(),
});

const mapDispatch = dispatch => ({
	addService: data => dispatch(addService(data)),
	updateOnPlanService: data => dispatch(updateOnPlanService(data)),
	dispatch,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
	PopupBookService,
);
