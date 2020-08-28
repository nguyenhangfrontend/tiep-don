import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  ButtonSub,
  SpanSub,
  RowSubMenu,
  WrapperBtnSub,
  WrapperNameSub,
} from '../../containers/medical-record/styles';
import moment from 'moment';
import { LIST_KEY } from '../../containers/medical-record/constants';
import {
  getForm,
  addDataShowSubMenu,
} from '../../containers/medical-record/actions';
import {
  selectDataShowMenuLv4,
  selectMedicalCodeList,
} from '../../containers/medical-record/selectors';

class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getPdfServiceForm = this.getPdfServiceForm.bind(this);
  }

  getPdfServiceForm(keyItem, serviceId) {
    this.props.getForm({ keyItem, serviceId });
    this.props.addDataShowSubMenu({ idSubmenuActive: serviceId });
  }

  renderNameSubMenuItem(keyItem, service, timeIn) {
    if (!keyItem || !service) return;
    const { date } = service;
    const actDate = moment(date).format('DD-MM-YYYY') || service.actDate;
    if (keyItem === LIST_KEY.MedicineSupply) {
      return `Ngày (${actDate})`;
    }
    if (keyItem === LIST_KEY.TreetmentSheet) {
      const { selectDataShowMenuLv4, selectMedicalCodeList } = this.props;
      const { idMedicalCode } = selectDataShowMenuLv4 || {};
      const data  = selectMedicalCodeList || [];
      const timeGoIn = data.filter(item => item.id === idMedicalCode)[0]
        .timeGoIn;
      let time = moment(timeGoIn)
        .toDate()
        .getDate();
      const { actDate } = service || {};
      let timeAct = new Date(actDate).getDate();
      let numberTreatment = parseInt(timeAct - time + 1);
      if (service.additional) {
        numberTreatment = `${numberTreatment}.1`;
      }
      return `Tờ điều trị số ${numberTreatment}`;
    }
    return `${service.name} (${actDate})`;
  }

  render() {
    const { keyItem, service, selectDataShowMenuLv4, id } = this.props;
    const serviceId = service.id;
    const { idSubmenuActive } = selectDataShowMenuLv4;
    const isHighLight = serviceId === idSubmenuActive;
    return (
      <RowSubMenu
        level="3"
        className="menu-item"
        // xu ly khi click vao 1 item trong submenu
        id={id}
        onClick={() => this.getPdfServiceForm(keyItem, serviceId)}
      >
        <WrapperBtnSub>
          <ButtonSub
            className="fa fa-minus"
            aria-hidden="true"
            isHighLight={isHighLight}
          ></ButtonSub>
        </WrapperBtnSub>
        <WrapperNameSub>
          <SpanSub isHighLight={isHighLight}>
            {this.renderNameSubMenuItem(keyItem, service)}
          </SpanSub>
        </WrapperNameSub>
      </RowSubMenu>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectDataShowMenuLv4: selectDataShowMenuLv4(),
  selectMedicalCodeList: selectMedicalCodeList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getForm: param => dispatch(getForm(param)),
    addDataShowSubMenu: param => dispatch(addDataShowSubMenu(param)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
