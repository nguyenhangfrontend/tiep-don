import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LIST_KEY } from '../../containers/medical-record/constants';
import SubMenu from './SubMenu';
import {
  selectDataShowMenuLv4,
  selectAllMedicalRecords,
  selectAllSurgicalService,
  selectAllSpecExamService,
  selectMedicalTreatmentSheets,
} from '../../containers/medical-record/selectors';
import { getForm } from '../../containers/medical-record/actions';
import { Wrapper } from './styles';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }
  componentDidMount() {
    document.addEventListener('keyup', this.keyDownSelectItem);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {

    document.removeEventListener('keyup', this.keyDownSelectItem);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  keyDownSelectItem = e => {
    e.preventDefault();

    let itemTop = 0
    const { idSubmenuActive } = this.props.selectDataShowMenuLv4;
    if (e.keyCode === 39) {

      
      if(idSubmenuActive){
        itemTop = document.getElementById(`itemScroll${idSubmenuActive}`).offsetTop + 42
      }
     
       const clientHeight = this.scrollWrapper && this.scrollWrapper.clientHeight
       if(parseInt(itemTop) > parseInt(clientHeight)){
        this.scrollWrapper.scrollTop = itemTop
        
       }
      
    }

    if (e.keyCode === 37) {
      if(idSubmenuActive){
        itemTop = document.getElementById(`itemScroll${idSubmenuActive}`).offsetTop - 42
      }
     
       const clientHeight = this.scrollWrapper && this.scrollWrapper.clientHeight
       if(parseInt(itemTop) < parseInt(clientHeight)){
        this.scrollWrapper.scrollTop = itemTop
        
       }
       
    }
  };

 
  renderServicesOnSubMenu(keyItem, services) {
    if (!services) return null;
    return (
      <Wrapper className="sub2-menu mostly-customized-scrollbar" ref={ref => (this.scrollWrapper = ref)}>
        {!isEmpty(services)
          ? services.map(service => {
              const { id } = service;
              return <SubMenu id={`itemScroll${service.id}`} key={id} keyItem={keyItem} service={service} />;
            })
          : ''}
      </Wrapper>
    );
  }

  renderMenuSubItem = (keyItem, keySubMenuLv2, idSubmenuActive) => {
    if (!keyItem || !keySubMenuLv2) return;
    const {
      surgicalServices,
      selectAllSpecExamService,
      medicalTreatmentSheets,
    } = this.props;
    let medicineServices;
    if (!isEmpty(medicalTreatmentSheets)) {
      medicineServices = medicalTreatmentSheets.map(({ id, actDate }) => ({
        id,
        date: actDate,
      }));
    }
    const detailSubItem = {
      mhs: {
        [LIST_KEY.TreetmentSheet]: this.renderServicesOnSubMenu(
          keyItem,
          medicalTreatmentSheets,
        ),
        [LIST_KEY.SurgicalBill]: this.renderServicesOnSubMenu(
          keyItem,
          surgicalServices,
        ),
        [LIST_KEY.SpecExamForm]: this.renderServicesOnSubMenu(
          keyItem,
          selectAllSpecExamService,
        ),
        [LIST_KEY.MedicineSupply]: this.renderServicesOnSubMenu(
          keyItem,
          medicineServices,
        ),
      },
      tkba: {
        [LIST_KEY.SurgicalCertificate]: this.renderServicesOnSubMenu(
          keyItem,
          surgicalServices,
        ),
      },
    };
    return detailSubItem[keySubMenuLv2][keyItem];
  };

  render() {
    const { selectDataShowMenuLv4 } = this.props;
    if (isEmpty(selectDataShowMenuLv4)) return null;
    const { keyItem, keySubMenuLv2, idSubmenuActive } = selectDataShowMenuLv4;
    return <div>{this.renderMenuSubItem(keyItem, keySubMenuLv2, idSubmenuActive)}</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  selectDataShowMenuLv4: selectDataShowMenuLv4(),
  selectAllMedicalRecords: selectAllMedicalRecords(),
  surgicalServices: selectAllSurgicalService(),
  selectAllSpecExamService: selectAllSpecExamService(),
  medicalTreatmentSheets: selectMedicalTreatmentSheets(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getForm: param => dispatch(getForm(param)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
