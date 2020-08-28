import React, { memo, useState } from 'react';
import { Main } from './styled';
import Button from 'components/Button';
import FormItem from '../components/FormItem';
import SwitchCustom from '../components/SwitchCustom';
import SaveIcon from 'resources/svg/save.svg';
import CheckBox from 'components/CheckBox';
import DatePickerCustom from 'components/DatePicker';
import Input from '../components/Input';
import ListHospitalFilter from '../../../ListHospitalFillter';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSetApoinment , selectIsEdit} from 'containers/reception/selectors';

const InsurancePatientFormView = ({
  form,
  formChange,
  disabled,
  checkPatientInsuranceNumber,
  checkInsurancePortal,
  isApointment,
  isEdit,
  checkBarcodeEdit,
  disabledPatientTypeButton
}) => {
  const requireContinuity5YearDate =
    !form.continuity5YearDate && (form.continuity5Year || form.notCopayment)
      ? true
      : false;
  const requireReson =
    form.patientType === 2 &&
    !form.reason &&
    (form.patientFromHospitalId || isApointment)
      ? true
      : false;

  return (
    <Main>
      <div className="head--insurance-form">
        <SwitchCustom
          onText={'Có BHYT'}
          offText={'Không có BHYT'}
          className="switch-insurance"
          onChange={formChange.patientType}
          value={form.patientType}
          disabled={disabledPatientTypeButton}
        />
        <Button
          icon={<SaveIcon />}
          type={'dark-light'}
          className={'scan-id-btn text-uppercase'}
          disabled={disabled}
          onClick={checkInsurancePortal}
        >
          Kiểm tra thẻ
        </Button>
      </div>
      {isEdit && 
        <FormItem
        ref={formChange['insuranceNumberRef']}
        label={'Quét barcode'}
        placeholder={''}
        inputComponent={Input}
        disabled={disabled}
        onKeyDown={e => {
          checkBarcodeEdit(e);
        }}
      />
      }
      
      <div className="row">
        <div className="col-md-6">
          <FormItem
            ref={formChange['insuranceNumberRef']}
            label={'Số bảo hiểm'}
            placeholder={'Số bảo hiểm'}
            inputComponent={Input}
            onChange={formChange.insuranceNumber}
            value={form.insuranceNumber}
            disabled={disabled}
            onBlur={e => checkPatientInsuranceNumber(e)}
            onKeyDown={e => {
              checkPatientInsuranceNumber(e);
              checkInsurancePortal()
            }}
            rules={[
              {
                rule: form.patientType === 2 ? 'lengthInsurance' : '',
                message:
                  'Số thẻ không hợp lệ. Yêu cầu Số thẻ BHYT gồm 15 ký tự',
              },
            ]}
          />
        </div>
        <div className="col-md-6">
          <FormItem
            ref={formChange['insurancePercentRef']}
            label={'% BH trả'}
            value={form.insurancePercent}
            disabled
            inputComponent={Input}
          />
        </div>
      </div>
      <FormItem
        ref={formChange['regAtHospitalIdRef']}
        label={'Nơi đăng ký'}
        placeholder={'Nơi đăng kí'}
        inputComponent={ListHospitalFilter}
        className="mb5"
        onChange={formChange.regAtHospitalId}
        value={form.regAtHospitalId}
        disabled={disabled}
      />
      <div className="row mb10">
        <div className="col-md-6">
          <FormItem
            ref={formChange['insuranceFromDateRef']}
            label={'BH từ ngày'}
            placeholder={'BH từ ngày'}
            inputComponent={DatePickerCustom}
            onChange={formChange.insuranceFromDate}
            value={form.insuranceFromDate}
            disabled={disabled}
          />
        </div>
        <div className="col-md-6">
          <FormItem
            ref={formChange['insuranceToDateRef']}
            label={'BH đến ngày'}
            placeholder={'BH đến ngày'}
            inputComponent={DatePickerCustom}
            onChange={formChange.insuranceToDate}
            value={form.insuranceToDate}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="row mb5">
        <div className="col-md-6">
          <CheckBox
            onChange={formChange.continuity5Year}
            checked={form.continuity5Year}
            disabled={disabled}
          >
            {'BHYT 5 năm liên tục và đồng chi trả < 6 tháng lương'}
          </CheckBox>
        </div>
        <div className="col-md-6">
          <CheckBox
            onChange={formChange.notCopayment}
            checked={form.notCopayment}
            disabled={disabled}
          >
            {'Miễn đồng chi trả'}
          </CheckBox>
        </div>
      </div>
      <div className="row mb5">
        <div className="col-md-6">
          <FormItem
            ref={formChange['continuity5YearDateRef']}
            label={'T/g đủ 5 năm liên tục *'}
            placeholder={'Thời gian'}
            inputComponent={DatePickerCustom}
            onChange={formChange.continuity5YearDate}
            value={form.continuity5YearDate}
            disabled={disabled}
            require={requireContinuity5YearDate}
          />
        </div>
        <div className="col-md-6">
          <FormItem
            ref={formChange['insuranceErrorCodeRef']}
            label={'Mã lỗi'}
            placeholder={'Mã lỗi'}
            inputComponent={Input}
            className="mb5"
            onChange={formChange.insuranceErrorCode}
            value={form.insuranceErrorCode}
            disabled
          />
        </div>
      </div>

      <FormItem
        ref={formChange['patientFromHospitalIdRef']}
        label={'Nơi giới thiệu'}
        placeholder={'Nơi giới thiệu'}
        inputComponent={ListHospitalFilter}
        onChange={formChange.patientFromHospitalId}
        value={form.patientFromHospitalId}
        disabled={disabled}
        className="mb5"
      />
      <FormItem
        ref={formChange['reasonRef']}
        label={'Lý do đến khám *'}
        placeholder={'Lý do đến khám'}
        inputComponent={Input}
        className="mb5"
        onChange={formChange.reason}
        value={form.reason}
        require={requireReson}
        rules={[
          {
            rule: requireReson ? 'required' : '',
            message: 'Vui lòng nhập lý do đến khám !',
          },
        ]}
        disabled={disabled}
      />
      <FormItem
        ref={formChange['insuranceAddressRef']}
        label={'Địa chỉ BHYT'}
        placeholder={'Địa chỉ BHYT'}
        inputComponent={Input}
        onChange={formChange.insuranceAddress}
        value={form.insuranceAddress}
        disabled={disabled}
        rules={[
          {
            rule: form.patientType === 2 ? 'required' : '',
            message: 'Vui lòng điền địa chỉ BHYT !',
          },
        ]}
      />
    </Main>
  );
};
const mapState = createStructuredSelector({
  isApointment: selectSetApoinment(),
  isEdit: selectIsEdit(),
});
export default memo(connect(mapState, null, null, { forwardRef: true })(
  InsurancePatientFormView,
));
