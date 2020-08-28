import React, { PureComponent } from 'react';
import { isEmpty, isEqual, get, isObject, map } from 'lodash';
import printProvider from 'data-access/print-provider';
import Loading from 'components/Loading';
import { connect } from 'react-redux';
import KeyEventWrapper from 'components/KeyEventWrapper';
import {
  medicalBills,
  getAllMedicalRecords,
  getAllServices,
  getForm,
  clearCached,
  clearLinkForm,
  addDataShowSubMenu,
} from '../actions';
import { getpdfHospitalized } from 'containers/print/actions';
import {
  selectMedicalTreatmentSheets,
  selectAllMedicalRecords,
  selectAllSurgicalService,
  selectDataMenuPdf,
  selectAllSpecExamService,
  selectMedicalCodeList,
  selectMedicalBills,
  getLinkForm,
  isLoading,
  getServices,
  selectDataShowMenuLv4,
  selectItemMedicalInfo,
} from '../selectors';
import { selectPdfHospitalized } from 'containers/print/selectors';
import {
  Tabs,
  ChildTab,
  RecordsButton,
  Service,
  ButtonForm,
  Span,
} from '../styles';
import { createStructuredSelector } from 'reselect';
import PrintPDF from 'containers/print';
import menu, { menuItems, LIST_KEY, LIST_KEY_DEPENDENT } from '../constants';
import { NavLink } from 'react-router-dom';
import {
  getMedicalCodeList,
  getInfoUserHaveMedicalRecord,
  clearInfoPatient,
} from './../actions';

class MedicalRecordDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patientValue: '',
      checkedInPatient: true,
      menuObjects: {},
    };

    this.printRef = React.createRef();
    this.onClickShowAll = this.onClickShowAll.bind(this);
    this.handleClickOnRecordCode = this.handleClickOnRecordCode.bind(this);
    this.isDefaultScreen = true;
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.medicalCodeList, newProps.medicalCodeList)) {
      const { id } = get(newProps, 'match.params', '');
      const { medicalCodeList } = newProps;

      if (!isEmpty(medicalCodeList)) {
        const defaultMedicalCode = medicalCodeList.filter(
          item => item.patientDocument === id,
        )[0];
        this.setState({
          checkedInPatient: defaultMedicalCode.inpatient,
        });
        const position = defaultMedicalCode.inpatient;
        this.handleMedicalCodeList(medicalCodeList, position);
        this.handleClickOnRecordCode(defaultMedicalCode);
      }
    }
    if (
      !isEqual(this.props.selectItemMedicalInfo, newProps.selectItemMedicalInfo)
    ) {
      this.showDetailPatientHistory(newProps.selectItemMedicalInfo);
    }
    if (!isEqual(this.props.pdfHospitalized, newProps.pdfHospitalized)) {
      this.printInsuranceCardHolder(newProps.pdfHospitalized.data);
    }
    const { selectAllMedicalRecords, linkForm } = newProps;
    if (!isEqual(this.props.selectAllMedicalRecords, newProps.selectAllMedicalRecords)) {
      this.printInsuranceCardHolder(selectAllMedicalRecords);
    }
    

    // print file service on submenu
    if (isObject(linkForm) && !isEmpty(linkForm)) {
      Object.keys(linkForm).forEach(key =>
        linkForm[key] ? this.printInsuranceCardHolder(linkForm[key]) : null,
      );
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      patientValue: id,
    });
    this.props.getInfoUser(id);
  }

  // lấy file pdf chung
  getPdfRecord(keyItem) {
    if (keyItem === 'tbba') {
      this.medicalRecord();
    }
  }

  // in phieu dich vu: phau thuat, kham chi dinh
  getPdfServiceForm = (keyItem, serviceId) =>{
    this.props.getForm({ keyItem, serviceId });
  }
    

  //in tờ bìa bệnh án
  medicalRecord() {
    const idMedicalCode = this.state.idMedicalCode;
    if (!idMedicalCode) return;
    this.setState(
      {
        loading: true,
      },
      () => {
        printProvider
          .medicalRecord(idMedicalCode)
          .then(s => {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.printInsuranceCardHolder(s.data);
              },
            );
          })
          .catch(e => {});
      },
    );
  }

  // lay file pdf tong hop khi click vao button: Ho so tong hop
  onClickShowAll() {
    const { idMedicalCode } = this.state;
    const { addDataShowSubMenu } = this.props
    if (!idMedicalCode) return;
    this.isDefaultScreen = false;
    
    this.setState({
      namePdf: "Hồ sơ tổng hợp",
      
    })
    addDataShowSubMenu({
      keySubMenuLv2: true,
    });
    this.props.getAllMedicalRecords(idMedicalCode);
  }

  // render button show all medical records and its handle event
  renderButtonShowAllMedicalRecords = () => {
    const { idMedicalCode, checkedInPatient } = this.state;
    if (!idMedicalCode || !checkedInPatient) return;
    return (
      <RecordsButton onClick={this.onClickShowAll}>
        Hồ sơ tổng hợp
      </RecordsButton>
    );
  };

  getPdfHospitalized = id => this.props.getPdfHospitalized(id);

  // show pdf
  printInsuranceCardHolder(pdf) {
   
    printProvider
      .showPdf(pdf)
      .then(s => {
        let patientDocument = this.state.patientDocument;
        this.printRef.current.showPdf(s, pdf, patientDocument, null);
        this.printRef.current.getFirstPdf(pdf);
        this.printRef.current.saveUnsignedFile(s);
      })
      .catch(e => {});
  }

  // active menu parent( xu ly click khi click vao menu cha nhu Tong ket benh an, Ma ho so)
  _handleClick = menuItem => {
    
    const { clearLinkForm, addDataShowSubMenu } = this.props;
    clearLinkForm();
    const { key } = menuItem;
    if (key === 'tkba' || key === 'mhs') {
      
      addDataShowSubMenu({
        keySubMenuLv2: key,
        haveSubMenu: false,
        keyItem: '',
        idSubmenuActive: '',
      });
    } else {
      const { key, openSubmenu } = menuItem;
     
      addDataShowSubMenu({
        keySubMenuLv2: key,
        haveSubMenu: openSubmenu,
        keyItem: '',
        idSubmenuActive: '',
      });
    }
    const { idMedicalCode, checkedInPatient } = this.state;
    if (key === 'tbba') {
      this.isDefaultScreen = false;
    } else {
      
      this.isDefaultScreen = true;
      if (key !== 'pnv' && idMedicalCode) {
        const position = checkedInPatient ? 'inPatient' : 'outPatient';
        const subMenus = menu.filter(item => item.key === key)[0].subMenu[
          position
        ];
        const menuServices = subMenus
          .filter(item => item.haveSubMenu)
          .map(item => item.key);
        const { selectAllSurgicalService } = this.props;
        if (key === 'tkba' && isEmpty(selectAllSurgicalService)) {
          this.props.getAllServices({
            patientHistoryId: idMedicalCode,
            idRow: LIST_KEY_DEPENDENT[key].keyDependent,
            type: position,
            keyTotalMenu: LIST_KEY_DEPENDENT[key].menuParent,
          });
        }
        if (menuServices.length > 0) {
          menuServices.forEach(idRow =>
            this.props.getAllServices({
              patientHistoryId: idMedicalCode,
              type: position,
              idRow,
              keyTotalMenu: key,
            }),
          );
        }
      } else {
        
        const { idMedicalCode, medicalCodeList } = this.state;
        if (medicalCodeList.length === 1 && idMedicalCode) {
          this.getMedicalBill(idMedicalCode);
        }
      }
    }

    this.setState({
      namePdf: menuItem.namePdf,
      doctorSign: menuItem.doctorSign,
    });
  };

  // Xử lý khi click vao menu level 2 nhu To dieu tri, phieu phau thuat và active menu sub
  _handleClickSubMenu = menuItemSub => {
    const { namePdf } = menuItemSub || {};
 
    
    this.setState({
      namePdf: namePdf,
      patientSign: menuItemSub.patientSign,
      doctorSign: menuItemSub.doctorSign,
      formValue: menuItemSub.formValue
    });
    const {
      clearLinkForm,
      addDataShowSubMenu,
      selectDataShowMenuLv4,
    } = this.props;
    const {
      keyItem: submenuIsActive,
      keySubMenuLv2,
      // haveSubMenu,
    } = selectDataShowMenuLv4;
    this.isDefaultScreen = false;

    clearLinkForm();
    if (!menuItemSub) return;
    const { key, haveSubMenu } = menuItemSub;
    addDataShowSubMenu({
      keyItem: key === submenuIsActive ? null : key,
      keySubMenuLv2,
      haveSubMenu,
      idSubmenuActive: '',
    });
    if (haveSubMenu) {
      
      this.printRef.current.showPdf(
        null,
        null,
        this.state.patientDocument,
        null,
      );
    } else {
      
      if (key === submenuIsActive) return;
      const { checkedInPatient, idMedicalCode } = this.state;
      let serviceId;
      if (key === LIST_KEY.ConsultationReport) {
        serviceId = {
          patientHistoryId: idMedicalCode,
          inpatient: checkedInPatient,
        };
      } else {
        serviceId = idMedicalCode;
      }
      this.getPdfServiceForm(key, serviceId);
    }
  };

  // xu li click vao mot ma ho so benh an
  handleClickOnRecordCode(item) {
    
    let timeGoIn = new Date(item.timeGoIn).format('dd/MM/YYYY');
    this.isDefaultScreen = true;
    let timeGoOut = item.timeGoOut
      ? new Date(item.timeGoOut).format('dd/MM/YYYY')
      : '';
    this.setState({
      selectedMedicalCode: item,
      timeGoIn: timeGoIn,
      timeGoOut: timeGoOut,
      idMedicalCode: item.id,
      patientMedicalCode: item.patientDocument,
      openListRecordSub: false,
      patientDocument: item.patientDocument,
    });
    if (item.inpatient) this.getMedicalBill(item.id);
    this.props.addDataShowSubMenu({
      idMedicalCode: item.id,
      keySubMenuLv2: '',
    });
  }

  // danh sách mã bệnh án
  handleMedicalCodeList = (
    data = this.props.medicalCodeList,
    position = this.state.checkedInPatient,
  ) => {
    let menuObjectsFillter = menuItems.reduce(
      (listMenu, item) => {
        listMenu.inPatient.push(item);
        if (!item.outPatient) {
          listMenu.outPatient.push(item);
        }
        return listMenu;
      },
      { inPatient: [], outPatient: [] },
    );
    if (!isEmpty(data)) {
      let medicalCodeList = data.filter(item => {
        if (position) {
          return item.inpatient;
        } else {
          return !item.inpatient;
        }
      });
      let selectedMedicalCode = null,
        timeGoIn = null,
        timeGoOut = null;
      if (medicalCodeList.length === 1) {
        selectedMedicalCode = medicalCodeList[0];
        this.props.addDataShowSubMenu({
          idMedicalCode: selectedMedicalCode.id,
        });
        timeGoIn = new Date(selectedMedicalCode.timeGoIn).format('dd/MM/YYYY');
        timeGoOut = selectedMedicalCode.timeGoOut
          ? new Date(selectedMedicalCode.timeGoOut).format('dd/MM/YYYY')
          : null;
      }

      this.setState({
        medicalCodeList: medicalCodeList,
        selectedMedicalCode: selectedMedicalCode,
        timeGoIn: timeGoIn,
        timeGoOut: timeGoOut,
        idMedicalCode: selectedMedicalCode ? selectedMedicalCode.id : null,
        patientMedicalCode: selectedMedicalCode
          ? selectedMedicalCode.patientDocument
          : null,
        openListRecordSub: false,
        patientDocument: selectedMedicalCode
          ? selectedMedicalCode.patientDocument
          : null,
        menuObjects: menuObjectsFillter,
      });
    }
  };

  // loại vào viện (nội trú hay ngoại trú)
  changeInPatient = () => {
    const { addDataShowSubMenu } = this.props;
    addDataShowSubMenu({ keySubMenuLv2: '', keyItem: '' });
    this.setState(
      {
        checkedInPatient: !this.state.checkedInPatient,
      },
      () => {
        this.handleMedicalCodeList();
        this.props.clearCached();
      },
    );
    this.isDefaultScreen = true;
  };

  getMedicalBill = patientHistoryId => {
    this.props.getMedicalBills({ patientHistoryId });
  };

  // lấy thông tin bệnh nhân
  showDetailPatientHistory(patient) {
    if (!patient) return;
    let birthday =
      patient && patient.birthday
        ? new Date(patient.birthday).format('dd/MM/yyyy')
        : '';
    let gender = patient && patient.gender === 1 ? 'Nam' : 'Nữ';

    this.setState({
      patientName:
        patient && patient.patientName
          ? patient.patientName.toLocaleUpperCase()
          : '',
      patientValue: patient && patient.patientValue ? patient.patientValue : '',
      gender: gender,
      avatar: patient && patient.avatar ? patient.avatar : '',
      regDate: patient && patient.timeGoIn ? patient.timeGoIn : '',
      patientDocument:
        patient && patient.patientDocument ? patient.patientDocument : null,
      birthdayStr:
        patient && patient.birthdayStr ? patient.birthdayStr : patient.birthday,
      address: patient && patient.address ? patient.address : '',
      phone: patient && patient.phone ? patient.phone : 0,
      idNo: patient && patient.idNo ? patient.idNo : '',
      guardianName: patient && patient.guardianName ? patient.guardianName : '',
      guardianPhone:
        patient && patient.guardianPhone ? patient.guardianPhone : '',
      guardianIdNo: patient && patient.guardianIdNo ? patient.guardianIdNo : '',

      detailAddress:
        patient && patient.detailAddress ? patient.detailAddress : '',

      patientType: patient && patient.patientType ? patient.patientType : '',
      insuranceNumber: patient && patient.insuranceNumber,
      insurancePercent: patient && patient.insurancePercent,
      insuranceFromDate:
        patient && patient.insuranceFromDate
          ? new Date(patient.insuranceFromDate)
          : '',
      insuranceToDate:
        patient && patient.insuranceToDate
          ? new Date(patient.insuranceToDate)
          : '',

      continuity5YearDate:
        patient && patient.continuity5YearDate
          ? new Date(patient.continuity5YearDate)
          : '',
      insuranceAddress:
        patient && patient.insuranceAddress ? patient.insuranceAddress : '',
      previousDiagnostic:
        patient && patient.previousDiagnostic ? patient.previousDiagnostic : '',
      birthdayDisplay:
        patient && patient.birthdayStr ? patient.birthdayStr : birthday,
      idPatient:
        patient && patient.id
          ? patient.id
          : this.state.idPatient
          ? this.state.idPatient
          : null,

      emptyAddress: patient && patient.address,
    });
  }

  showPaientSearch() {
    this.props.addDataShowSubMenu({
      keySubMenuLv2: '',
      haveSubMenu: false,
      keyItem: '',
      idSubmenuActive: '',
    });
    this.props.clearCached();
    this.props.clearInfoPatient();
  }

  renderSubMenuListInpatientPDF = () => {
    const { medicalBills } = this.props;
    return (
      <ul className=" mostly-customized-scrollbar">
        {!isEmpty(medicalBills)
          ? medicalBills.data.map((item, index) => {
              let namepnv =
                item.serviceName +
                ' ' +
                new Date(item.actDate).format('dd/MM/yyyy');
              return (
                <li
                  key={index}
                  className={`menu-item menu-level1 ${
                    this.state.activePNV === item
                      ? 'active-menu-inpatientPDF'
                      : ''
                  }`}
                  onClick={() => {
                    this.isDefaultScreen = false;
                    this.getPdfHospitalized(item.id);
                    this.setState({
                      doctorSign: true,
                      formValue: 'BM002',
                      activePNV: item
                    });
                  }}
                >
                  <button className="menu-icon active-menu"></button>
                  <div className="medical-code-item">
                    <p className="medical-code--name">Phiếu nhập viện</p>
                    <p title={namepnv} className="medical-code--date">
                      ({namepnv} )
                    </p>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    );
  };

  // Hien thi Menu cap 2 nhu: To dieu tri, Phieu phau thuat
  renderSubMenuLevel2 = item => {
    const { title, subMenu, key } = item;
    const { idMedicalCode } = this.state;
    const { selectDataShowMenuLv4 } = this.props;
    const { keySubMenuLv2 } = selectDataShowMenuLv4 || {};
    if (!keySubMenuLv2 || key !== keySubMenuLv2 || !idMedicalCode) return;
    return (
      <div className="submenu-record menu-list equal-height--item" key={key}>
        <p className="title-record-sub">{title}</p>
        <ul className=" mostly-customized-scrollbar">
          <li className="menu-item menu-level1">
            <button className="menu-icon active-menu"></button>
            <div className="medical-code-item">
              <p className="medical-code--name">
                Mã HS: {this.state.patientDocument}
              </p>
              <p className="medical-code--date">
                ({this.state.timeGoIn}{' '}
                {this.state.timeGoOut ? '- ' + this.state.timeGoOut : ''})
              </p>
            </div>
            <ul>
              {subMenu.map((menuItemSub, index) => {
                const { haveSubMenu } = menuItemSub || {};
                const { selectDataShowMenuLv4 } = this.props;
                const { keyItem } = selectDataShowMenuLv4 || {};
                const isHighLight = keyItem === menuItemSub.key;
                return (
                  <li
                    key={index}
                    level="2"
                    className={`menu-item menu-level2 ${
                      isHighLight && menuItemSub.toggleClass
                        ? 'active-menu2'
                        : ''
                    }`}
                  >
                    <Service
                      href="#"
                      onClick={() => {
                        this._handleClickSubMenu(menuItemSub);
                      }}
                    >
                      <ButtonForm
                        className={`${
                          isHighLight && haveSubMenu
                            ? 'fa fa-caret-down'
                            : 'fa fa-caret-right'
                        }`}
                        aria-hidden="true"
                        isHighLight={isHighLight}
                      ></ButtonForm>
                      <Span isHighLight={isHighLight}>{menuItemSub.name}</Span>
                    </Service>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  // render Menu outside. example: Tờ bìa BA, Mã hồ sơ
  renderMenuInPatient = menuObjects => {
    const { selectDataShowMenuLv4 } = this.props;
    const { checkedInPatient } = this.state;
    const { keySubMenuLv2 } = selectDataShowMenuLv4 || {};
    const position = checkedInPatient ? 'inPatient' : 'outPatient';
    if (isEmpty(menuObjects[position])) return;
    return menuObjects[position].map((menuItem, index) => {
      return (
        <li
          key={index}
          className={`menu-record-item ${
            keySubMenuLv2 === menuItem.key ? 'active-menu' : ''
          }`}
          onClick={() => {
            const keyItem = get(menuItem, 'key', '');
            this._handleClick(menuItem);
            this.getPdfRecord(keyItem);
          }}
        >
          <span className="icon-record-menu">
            <img src="/images/icon-record1.png" alt="" />
          </span>
          <p className="menu-name">{menuItem.name}</p>
        </li>
      );
    });
  };

  renderUserInfor = () => (
    <div className="info-patient">
      <div className="info-text">
        <p className="info-item">
          <span className="label-info-patient">Mã NB: </span>
          <span className="info-content">{this.state.patientValue}</span>
        </p>
        <p className="info-item">
          <span className="label-info-patient">Họ và tên: </span>
          <span className="info-content">{this.state.patientName}</span>
        </p>
        <p className="info-item">
          <span className="label-info-patient">Giới tính: </span>
          <span className="info-content">{this.state.gender}</span>
        </p>
        <p className="info-item">
          <span className="label-info-patient">Ngày sinh: </span>
          <span className="info-content">{this.state.birthdayStr}</span>
        </p>
        <p className="info-item">
          <span className="label-info-patient">Số BH: </span>
          <span className="info-content">
            {this.state.insuranceNumber}
            <span className="color-green">
              {this.state.insurancePercent
                ? ` (${this.state.insurancePercent}%)`
                : null}
            </span>{' '}
          </span>
        </p>
      </div>
      <span className="avatar">
        <img src="/images/avatar-default.png" alt="" />
      </span>

      <button className="more-info">
        <img src="/images/arrow.png" alt="" />
      </button>
    </div>
  );

  renderListCodeRecord = () => {
    const { openListRecordSub, medicalCodeList } = this.state;
    if (!openListRecordSub || !medicalCodeList) return;
    return (
      <div className="wrapper-medical-code">
        <div
          className="overlay-popup"
          onClick={() =>
            this.setState({
              openListRecordSub: false,
            })
          }
        ></div>
        <ul className="medial-code-list">
          {medicalCodeList.length > 0 &&
            medicalCodeList.map((item, index) => {
              let timeGoIn = new Date(item.timeGoIn).format('dd/MM/YYYY');
              let timeGoOut = item.timeGoOut
                ? new Date(item.timeGoOut).format('dd/MM/YYYY')
                : '';
              return (
                <li
                  key={index}
                  className="medical-code-item"
                  onClick={() => this.handleClickOnRecordCode(item)}
                >
                  <p className="medical-code--name">
                    Mã bệnh án: {item.patientDocument}
                  </p>
                  <p className="medical-code--date">
                    ({timeGoIn} {timeGoOut ? '- ' + timeGoOut : ''})
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  renderMedicalType = () => (
    <Tabs>
      <ChildTab
        checked={!this.state.checkedInPatient}
        onClick={this.changeInPatient}
      >
        Ngoại trú
      </ChildTab>
      <ChildTab
        checked={this.state.checkedInPatient}
        onClick={this.changeInPatient}
      >
        Nội trú
      </ChildTab>
    </Tabs>
  );

  handleNextBackPdf = isBack => () => {
    const {
      dataMenuPdf,
      linkForm,
      isLoading,
      selectDataShowMenuLv4,
      addDataShowSubMenu,
    } = this.props;
    const { checkedInPatient, loading } = this.state;
    const { keySubMenuLv2, keyItem, idSubmenuActive } = selectDataShowMenuLv4;

    const cloneMenu = menu.slice();
    const currentMenu = cloneMenu.find(item => item.key === keySubMenuLv2);
    const currentTab = checkedInPatient ? 'inPatient' : 'outPatient';
    const currentItemPdf = dataMenuPdf[currentTab][keySubMenuLv2];
    if (loading || isLoading || isEmpty(currentMenu) || isEmpty(currentItemPdf))
      return;
    let valueOfItem = [];
    let nameOfItem = '';
    let leaveCurrentLevel3;
    let currentSubIndex = NaN; // make sure run only has index
    const currentPdf = Object.keys(linkForm)[0] || keyItem;
    const currentIndex =
      currentItemPdf &&
      currentItemPdf.findIndex(item => {
        if (isObject(item)) {
          return Object.keys(item)[0] === currentPdf;
        }
        return item === currentPdf;
      });
    // start common data
    const { subMenu } = currentMenu;
    const nextOrBackKeyItem =
      currentItemPdf[isBack ? currentIndex - 1 : currentIndex + 1];
    const currentItem = currentItemPdf[currentIndex];
    // finish common data
    if (isObject(currentItem)) {
      // handle switch in lv3
      nameOfItem = Object.keys(currentItem)[0];
      valueOfItem = currentItem[nameOfItem];
      currentSubIndex = valueOfItem.findIndex(
        item => +item.id === idSubmenuActive,
      );
      leaveCurrentLevel3 = isBack
        ? currentSubIndex === 0
        : currentSubIndex === valueOfItem.length - 1;
      // finish switch in lv3
      if (isObject(nextOrBackKeyItem) && leaveCurrentLevel3) {
        // case leave lv3 from item has submenu to item has submenu
        nameOfItem = Object.keys(nextOrBackKeyItem)[0];
        valueOfItem = nextOrBackKeyItem[nameOfItem];
        if (isBack) {
          currentSubIndex = valueOfItem.length;
        } else {
          currentSubIndex = -1;
        }
      }
      // return false
    }

    if (!isObject(currentItem) && isObject(nextOrBackKeyItem)) {
      this.isDefaultScreen = false;
      // case leave from lv2 with item does not has submenu to item has submenu
      nameOfItem = Object.keys(nextOrBackKeyItem)[0];
      valueOfItem = nextOrBackKeyItem[nameOfItem];
      if (isBack) {
        currentSubIndex = valueOfItem.length;
      } else {
        currentSubIndex = -1;
      }
    }

    if (
      (isBack && currentSubIndex > 0) ||
      (!isBack && currentSubIndex < valueOfItem.length - 1)
    ) {
      // hanlde in level 3
      const nextOrBackService =
        valueOfItem[isBack ? currentSubIndex - 1 : currentSubIndex + 1];
      const dataStore = {
        idSubmenuActive: nextOrBackService.id,
      };
      if (
        (Object.keys(linkForm)[0] || !keyItem) && // go from menu lv1 || lv2 and do not has current file pdf
        (currentSubIndex === valueOfItem.length || currentSubIndex === -1)
      ) {
        // first come level 3 from level 3 or level 2
        const nextOrBackItem = subMenu[currentTab].find(
          item =>
            item.key ===
            (isObject(nextOrBackKeyItem)
              ? Object.keys(nextOrBackKeyItem)[0]
              : nextOrBackKeyItem),
        );
        dataStore.haveSubMenu = nextOrBackItem.haveSubMenu;
        dataStore.keyItem = nextOrBackItem.key;
      }
      addDataShowSubMenu(dataStore);
      this.getPdfServiceForm(nameOfItem, nextOrBackService.id);
      return;
    }

    if (
      (isBack && currentIndex > 0) ||
      (!isBack && currentIndex < currentItemPdf.length - 1)
    ) {
      // hanlde in level 2
      // next item is string
      const nextOrBackItem = subMenu[currentTab].find(
        item => item.key === nextOrBackKeyItem,
      );
      this._handleClickSubMenu(nextOrBackItem);
      this.getPdfRecord(nextOrBackItem.key);
      addDataShowSubMenu({
        keyItem: nextOrBackItem.key,
        idSubmenuActive: '',
      });
    }
  };

  renderReferenceToPrintPDF = () => {
    const { dataMenuPdf, selectDataShowMenuLv4 } = this.props;
    const { keyItem } = selectDataShowMenuLv4 || {};
    const hiddenButtonNextBack =
      keyItem || Object.values(dataMenuPdf).every(item => isEmpty(item));
    return (
      <div className="col-md-9 custom-col9">
        <div className="main-inner item-equal--height">
        <Loading visible={this.state.loading || this.props.isLoading} >
          <PrintPDF
            printRef={this.printRef}
            formValue={this.state.formValue}
            handleNextPdf={hiddenButtonNextBack && this.handleNextBackPdf()}
            handleBackPdf={hiddenButtonNextBack && this.handleNextBackPdf(true)}
            doctorSign={this.state.doctorSign}
            patientSign={this.state.patientSign}
            namePdf={this.state.namePdf}
            recordId={this.state.idPatient}
            isDefaultScreen={this.isDefaultScreen}
            isAllRecord={this.state.isAllRecord}
          />
          </Loading>
        </div>
      </div>
    );
  };

  renderCodeRecord = () => (
    <div
      className="medical-code-item code-value"
      onClick={() =>
        this.setState({
          openListRecordSub: true,
        })
      }
    >
      {this.state.selectedMedicalCode ? (
        <div>
          <p className="medical-code--name">
            Mã bệnh án: {this.state.selectedMedicalCode.patientDocument}
          </p>
          <p className="medical-code--date">
            ({this.state.timeGoIn}{' '}
            {this.state.timeGoOut ? '- ' + this.state.timeGoOut : ''})
          </p>
        </div>
      ) : (
        <p>Chọn mã bệnh án</p>
      )}

      <button className="icon-common">
        <i className="fa fa-caret-down" aria-hidden="true"></i>
      </button>
    </div>
  );

  render() {
    const { menuObjects, checkedInPatient } = this.state;
    const { selectDataShowMenuLv4 } = this.props;
    const { keySubMenuLv2 } = selectDataShowMenuLv4 || {};
    return (
      <KeyEventWrapper
        listEvents={[
          { keyCode: 37, keyAction: this.handleNextBackPdf(true) }, // back
          { keyCode: 39, keyAction: this.handleNextBackPdf() }, // next
        ]}
      >
        <div className="medical-record">
          <div className="container-fluid">
            <div className="row display-flex">
              <div className="col-md-3 custom-col3">
                <div className="sidebar item-equal--height">
                  <h4 className="title-info p0 text-uppercase ">
                    <NavLink exact to="/admin/ho-so-benh-an">
                      <span
                        onClick={() => this.showPaientSearch()}
                        className="back"
                      >
                        <img src="/images/arrow-right.png" alt="" />{' '}
                      </span>
                    </NavLink>
                    Thông tin NB{' '}
                    <span className="icon-common pull-right">
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </h4>
                  <div className="content-sidebar">
                    {this.renderUserInfor()}
                    <div>
                      {this.renderMedicalType()}
                      {this.renderButtonShowAllMedicalRecords()}
                      <div className="medical-code-inner">
                        {this.renderCodeRecord()}
                        {this.renderListCodeRecord()}
                      </div>
                      <div className="medical-record-main display-flex">
                        <ul className="menu-record equal-height--item">
                          {this.renderMenuInPatient(menuObjects)}
                        </ul>
                        {map(menu, item => {
                          const { title, key, subMenu } = item;
                          const { inPatient, outPatient } = subMenu;
                          const listNameSubMenu = checkedInPatient
                            ? inPatient
                            : outPatient;
                          return this.renderSubMenuLevel2({
                            title,
                            key,
                            subMenu: listNameSubMenu,
                          });
                        })}
                        {keySubMenuLv2 === 'pnv' && (
                          <div className="submenu-record menu-list equal-height--item">
                            <p className="title-record-sub">Phiếu nhập viện</p>

                            {this.renderSubMenuListInpatientPDF()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              {this.renderReferenceToPrintPDF()}
            </div>
          </div>
        </div>
      </KeyEventWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  medicalTreatmentSheets: selectMedicalTreatmentSheets(),
  medicalCodeList: selectMedicalCodeList(),
  medicalBills: selectMedicalBills(),
  pdfHospitalized: selectPdfHospitalized(),
  selectAllMedicalRecords: selectAllMedicalRecords(),
  surgicalServices: selectAllSurgicalService(),
  selectAllSpecExamService: selectAllSpecExamService(),
  linkForm: getLinkForm(),
  isLoading: isLoading(),
  dataMenuPdf: selectDataMenuPdf(),
  getServices: getServices(),
  selectDataShowMenuLv4: selectDataShowMenuLv4(),
  selectItemMedicalInfo: selectItemMedicalInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getMedicalBills: data => dispatch(medicalBills(data)),
    getPdfHospitalized: data => dispatch(getpdfHospitalized(data)),
    getAllMedicalRecords: patientId =>
      dispatch(getAllMedicalRecords(patientId)),
    getAllServices: (patientId, type, idRow ) =>
      dispatch(getAllServices(patientId, idRow)),
    getForm: param => dispatch(getForm(param)),
    clearCached: () => dispatch(clearCached()),
    clearLinkForm: () => dispatch(clearLinkForm()),
    clearInfoPatient: () => dispatch(clearInfoPatient()),
    addDataShowSubMenu: data => dispatch(addDataShowSubMenu(data)),
    getMedicalCodeList: data => dispatch(getMedicalCodeList(data)),
    getInfoUser: data => dispatch(getInfoUserHaveMedicalRecord(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MedicalRecordDetail);
