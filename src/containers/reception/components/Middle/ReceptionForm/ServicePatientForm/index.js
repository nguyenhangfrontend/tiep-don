import { formToBody } from 'containers/reception/components/Middle/ReceptionForm/Container/utils';
import React, { PureComponent } from 'react';
import ZoneDB from 'utils/IndexedDB/Zones';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { initialForm } from './constant';
import WebcamModal from 'containers/reception/components/Middle/webcamModal';
import AddressFilter from 'containers/reception/components/AddressDetail';
import { ModalAction } from 'components/Modal';
import {
  selectJobIds,
  selectEthnicityIds,
  selectCountryIds,
  selectProvinceIds,
  selectDistrictIds,
  selectZoneIds,
  selectPatientValue,
  selectPatient,
  selectEditType,
  selectIsEdit
} from 'containers/reception/selectors';
import {
  getProvinces,
  getDistricts,
  getPatientValue,
  fetchPatient,
  getPatientPhone,
  getPatientIdNo,
  getPatientInsuranceBarcode,
  getPatientMultipeSuggest,
  setValueApointment,
  uploadImage,
  scanId,
  setDataChange,
  fetchPatientSuccess
} from 'containers/reception/actions';

import View from './View';

class ServicePatientForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: initialForm,
      districtIdsFilter: [],
      zoneIds: [],
      duplicateType: '',
    };

    this.formChange = Object.keys(initialForm).reduce((result, key) => {
      return {
        ...result,
        [key]: this.setFormKey(key),
        [`${key}Ref`]: React.createRef(),
      };
    }, {});
  }

  componentDidMount() {
    this.handleGetProvinces();
  }

  setFormKey = key => value => {
    const { form, zoneIds } = this.state;
    const { provinceIds, districtIds, setDataChange } = this.props;
    if (value) {
      setDataChange(true);
    }

    let newForm = { ...form },
      province,
      district,
      zone,
      disabledEthnicity,
      disabledAddress
    switch (key) {
      case 'countryId':
        if(value !== 1000179){
          disabledAddress = true
        }
        this.handleGetProvinces(value);
        newForm[key] = value;
        break;
      case 'provinceId':
        this.handleGetDistrict(value);
        newForm[key] = value;
        province = provinceIds.find(item => item.id === value);
        newForm['districtId'] = '';
        newForm['zoneId'] = '';

        if (province) {
          newForm['address'] = `${province['name']}, Việt Nam`;
        }

        break;
      case 'districtId':
        ZoneDB.getOne(value, this.getZonesFromDB);
       
        district = districtIds.find(item => item.id === value);
        newForm[key] = value;
        newForm['zoneId'] = '';
        if (district) {
          newForm['address'] = `${district['name']}, ${form['address']}`;
        }

        break;
      case 'zoneId':
        zone = zoneIds.find(item => item.id === value);
        newForm[key] = value;
        if (zone) {
          newForm['address'] = `${zone['name']}, ${form['address']}`;
        }
        break;
      case 'appointment':
        const { setValueApointment } = this.props;
        setValueApointment(value);
        newForm[key] = value;

        break;
      case 'gender':
        this.checkInsurancePortal();
        newForm[key] = value;

        break;
      case 'nationalityId':
        if(value !== 1000179){
          disabledEthnicity = true
        }
        
        newForm[key] = value;

        break;
      default:
        newForm[key] = value;
        break;
    }

    this.setState({ form: newForm, disabledEthnicity, disabledAddress }, () => {
      if(key === 'birthday'){
        this.checkInsurancePortal()
      }
      if (key === 'zoneId' || key === 'patientName' || key === 'birthday') {
        this.checkPatientMultipeSuggest();
      }
    });
  };

  initForm = async patient => {
    const { isEdit, editType } = this.props;
    const form = formToBody(initialForm, patient);

    await this.formChange.provinceId(patient.provinceId);
    await this.formChange.districtId(patient.districtId);

    const date = moment(patient.birthday, 'YYYY-MM-DD').isValid()
      ? moment(patient.birthday, 'YYYY-MM-DD')
      : null;
    const keys = Object.keys(initialForm);
    if(keys){
      keys.map(key => ({ keyRef: `${key}Ref`, key }))
      .map(item => ({
        node: this.formChange[item.keyRef]['current'],
        key: item.key,
      }))
      .map(item => (item.node ? item.node['setError']('') : ''));
    }

    this.setState({
      disabled: editType === 2,
      disabledEthnicity: patient.nationalityId ? patient.nationalityId !== 1000179: false,
      disabledAddress: patient.countryId ? patient.countryId !== 1000179: false,
      form: {
        duplicateType: null,
        ...form,
        id: isEdit ? patient.id : null,
        receptionId: patient.id,
        birthday: {
          date: date,
          str: patient.birthdayStr || patient.birthday || '',
          strData: (date && date.format('DD-MM-YYYY'))
        },
      },
    }, () => {
    });
  };

  getZonesFromDB = data => {
    
    const { form } = this.state;
    if (form.zoneId) {
      const zone = (data.zones.find(item => item.id === form.zoneId)) || {};
      this.setState({
        form: { ...form, address: `${zone['name']}, ${form['address']}` },
      });
    }
    this.setState({ zoneIds: (data && data.zones) || [] });
  };

  checkPatientValue = e => {
    this.setState({
      duplicateType: 'patientValue',
    });
    const { getPatientValue, isEdit } = this.props;
    const param = e.target.value;
    if (!isEdit && param) {
      getPatientValue({
        param,
        modalActions: {
          clearCode: this.clearCode,
          showDataDupplicate: this.showDataDupplicate,
        },
      });
    }
  };

  checkPatientPhone = e => {
    const { getPatientPhone, isEdit } = this.props;
    const param = e.target.value;
    if (!isEdit) {
      getPatientPhone({
        param,
        modalActions: {
          clearCode: this.clearCode,
          showDataDupplicate: this.showDataDupplicate,
        },
      });
      this.setState({
        duplicateType: 'patientPhone',
      });
    }
  };

  checkPatientIdNo = e => {
    const { getPatientIdNo, isEdit } = this.props;
    const param = e.target.value;
    if (!isEdit) {
      getPatientIdNo({
        param,
        modalActions: {
          clearCode: this.clearCode,
          showDataDupplicate: this.showDataDupplicate,
        },
      });
      this.setState({
        duplicateType: 'patientIdNo',
      });
    }
  };
  checkBarcodeInsurance = e => {
    const param = { rawData: e.target.value };
    const { getPatientInsuranceBarcode, formInsuranceRef } = this.props;
    const { patientType } = formInsuranceRef.current.state.form;
    if (patientType === 2) {
      getPatientInsuranceBarcode({
        param,
        callback: this.showDataCheckBarcode,
      });
    }
  };

  clearCode = () => {
    const { duplicateType } = this.state;
    if (duplicateType === 'patientValue') {
      this.formChange.patientValue('');
    }
    if (duplicateType === 'patientPhone') {
      this.formChange.phone(0);
    }
    if (duplicateType === 'patientIdNo') {
      this.formChange.IdNo(0);
    }
  };

  showDataDupplicate = patientId => {
    const { fetchPatient } = this.props;
    fetchPatient({
      patientId,
    });
  };

  checkPatientMultipeSuggest = () => {
    const { checkPatientMultipeSuggest, isEdit } = this.props;
    const { patientName, provinceId, districtId, zoneId, } = this.state.form;
    const birthdayFormat = this.state.form.birthday.date && moment(this.state.form.birthday.date).format(
      'YYYY-MM-DD',
    );
    const patientNameFormat = patientName.toLocaleUpperCase();
    if (
      patientName &&
      birthdayFormat &&
      provinceId &&
      districtId &&
      zoneId
    ) {
      const params = {
        patientName: patientNameFormat,
        birthday: birthdayFormat,
        provinceId,
        districtId,
        zoneId,
      };
      if (!isEdit) {
        checkPatientMultipeSuggest({
          params,
          modalActions: {
            clearCode: this.clearCode,
            showDataDupplicate: this.showDataDupplicate,
          },
        });
      }
    }
  };
  handleGetProvinces = value => {
    const { getProvinces } = this.props;
    getProvinces({ countryId: value ? value : this.state.form.countryId });
  };

  showDataCheckBarcode = data => {
    const { formInsuranceRef, isEdit } = this.props;
    const birthdayFormat = moment(data.birthday).format('DD/MM/YYYY');
    const name = data.patientName;
    const dataPatient = { ...data, patientType: 2 };
    this.initForm(dataPatient)
    if(!isEdit){
      formInsuranceRef.current.initForm(dataPatient)
    }
    
    formInsuranceRef.current.checkInsurancePortal(birthdayFormat, name);
  };

  checkInsurancePortal = () => {
    const { formInsuranceRef } = this.props;

    formInsuranceRef.current.checkInsurancePortal();
  };

  

  handleGetDistrict = value => {
    const { districtIds } = this.props;
    if (districtIds) {
      const districtIdsFilter = districtIds.filter(
        item => item.provinceId === value,
      );
      this.setState({
        districtIdsFilter,
      });
    }
  };

  onSubmit = () => {
    const { form } = this.state;
    const keys = Object.keys(initialForm);

    const errors = keys
      .map(key => ({ keyRef: `${key}Ref`, key }))
      .map(item => ({
        node: this.formChange[item.keyRef]['current'],
        key: item.key,
      }))
      .map(item => (item.node ? item.node['validate'](form[item.key]) : ''));

    const error = !!errors.find(item => !!item);

    return {
      form,
      error,
    };
  };

  takePicture = () => {
    const { showWebcamModal } = this.props;
    const { avatar } = this.state.form;
    showWebcamModal({
      avatar,
      type: 'takePicure',
      title: 'Chụp ảnh người bệnh',
      modalActions: this.onTakePicture,
    });
  };
  onTakePicture = fileName => {
    const { uploadImage } = this.props;

    const param = fileName;
    uploadImage({ param, callback: data => this.formChange.avatar(data) });
  };
  scanId = fileName => {
    const { scanId } = this.props;
    const param = fileName;
    scanId({ param, callback: data => this.showDataScanId(data) });
    
  };

  showDataScanId =  (data) => {
    const { zoneIds } = this.state
    const {fetchPatientSuccess, districtIds, provinceIds } = this.props;
    let gender;
    const patientName = data.patientName.toLocaleUpperCase();
    let name = patientName;

    name = name.trim().toLocaleLowerCase();
    const arrname = name.split(' ');
    if (
      arrname.indexOf('văn') > 0 &&
      arrname.indexOf('văn') < arrname.length - 1
    ) {
      gender = 1;
    } else if (
      arrname.indexOf('thị') > 0 &&
      arrname.indexOf('thị') < arrname.length - 1
    ) {
      gender = 2;
    }
    let address;
    // address = data.address
    address = data.address
      .replace(/xã|huyện|tỉnh|Xã|Huyện|Tỉnh|XÃ|HUYỆN|TỈNH/g, '')
      .trim();

    var arr = [];

    arr = address
      .split(',')
      .reverse()
      .map(item =>
        item
          .trim()
          .unsignText()
          .toLocaleLowerCase(),
      );

    const obj = {
      provinceName: arr[0] || '',
      districtName: arr[1] || '',
      zoneName: arr[2] || '',
      detailAddress: arr[3] || '',
    };
    
    const { provinceName, districtName, zoneName, detailAddress } = obj;
    var tinhs = provinceIds;
    var tinh, huyen, xa;
    if(tinhs){
      tinh = tinhs.filter(item => {
        return item.name.unsignText().toLocaleLowerCase() === provinceName;
      });
    }
    
    if (tinh && tinh.length) {
      let huyens =   districtIds.filter(
        item => item.provinceId === tinh[0].id,
      );
      if(huyens){
        huyen = huyens.filter(item => {
          let itemName = item.name.unsignText().toLocaleLowerCase();
          return itemName === districtName;
        });
      }
      
    }

    if (huyen && huyen.length) {
       ZoneDB.getOne(huyen[0].id, this.getZonesFromDB);
      const xas =   zoneIds.filter(
        item => item.districtId === huyen[0].id,
      );
      
      if(xas){
        xa = xas.filter(item => {
          return item.name.unsignText().toLocaleLowerCase() === zoneName;
        });
      }
      
    }

    if(xa){
      this.formChange.detailAddress(detailAddress)
    }

    let distric = huyen && huyen.length ? huyen[0]: null;
    let province = tinh && tinh.length ? tinh[0]: null;
    let zone = xa && xa.length ? xa[0]: null;
    address =`${zone && zone.name},  ${distric && distric.name}, ${province && province.name}, Việt Nam`;
    
    this.formChange.address(address)
    const provinceId = tinh && tinh.length && tinh[0].id;
    const districtId = huyen &&  huyen.length && huyen[0].id;
    const zoneId = xa && xa.length  && xa[0].id ;
    
    fetchPatientSuccess({...data, gender, provinceId, districtId, zoneId})
  };
    
  
  
  onScanId = () => {
    const { showWebcamModal } = this.props;
    showWebcamModal({
      avatar: '',
      type: 'scanId',
      title: 'Scan CMT/ hộ chiếu người bệnh',
      modalActions: this.scanId,
    });
  };

  

  selectAddress = async data => {
    if (data.district && data.province) {
      await this.formChange.provinceId(data.province.id);
      await this.formChange.districtId(data.district.id);
      await this.formChange.zoneId(data.id);
    }

    if (!data.district && data.province) {
      await this.formChange.provinceId(data.province.id);
      await this.formChange.districtId(data.id);
    }

    if (!data.district && !data.province) {
      await this.formChange.provinceId(data.id);
    }
  };

  render() {
    const { ethnicityIds, jobIds, countryIds, provinceIds } = this.props;

    const districtIdsConcert = this.state.districtIdsFilter;
    return (
      <View
        {...this.state}
        ethnicityIds={ethnicityIds}
        jobIds={jobIds}
        countryIds={countryIds}
        provinceIds={provinceIds}
        districtIdsConcert={districtIdsConcert}
        formChange={this.formChange}
        selectAddress={this.selectAddress}
        checkPatientValue={this.checkPatientValue}
        checkPatientPhone={this.checkPatientPhone}
        checkPatientIdNo={this.checkPatientIdNo}
        checkBarcodeInsurance={this.checkBarcodeInsurance}
        checkInsurancePortal={this.checkInsurancePortal}
        checkPatientMultipeSuggest={this.checkPatientMultipeSuggest}
        takePicture={this.takePicture}
      />
    );
  }
}
const mapState = createStructuredSelector({
  patient: selectPatient(),
  jobIds: selectJobIds(),
  ethnicityIds: selectEthnicityIds(),
  countryIds: selectCountryIds(),
  provinceIds: selectProvinceIds(),
  districtIds: selectDistrictIds(),
  zoneIds: selectZoneIds(),
  patientsValue: selectPatientValue(),
  isEdit: selectIsEdit(),
  editType: selectEditType(),
});

const mapDispatch = dispatch => ({
  getProvinces: data => dispatch(getProvinces(data)),
  getDistricts: data => dispatch(getDistricts(data)),
  getPatientValue: data => dispatch(getPatientValue(data)),
  getPatientPhone: data => dispatch(getPatientPhone(data)),
  getPatientIdNo: data => dispatch(getPatientIdNo(data)),
  getPatientInsuranceBarcode: data =>
    dispatch(getPatientInsuranceBarcode(data)),
  fetchPatient: data => dispatch(fetchPatient(data)),
  checkPatientMultipeSuggest: data => dispatch(getPatientMultipeSuggest(data)),
  setValueApointment: data => dispatch(setValueApointment(data)),
  uploadImage: data => dispatch(uploadImage(data)),
  scanId: data => dispatch(scanId(data)),
  setDataChange: data => dispatch(setDataChange(data)),
  fetchPatientSuccess: data => dispatch(fetchPatientSuccess(data)),
  showWebcamModal: modalProps => {
    const modalType = WebcamModal;
    dispatch(ModalAction.showModal({ modalType, modalProps }));
  },
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ServicePatientForm,
);
