import React, { memo } from 'react';
import { Main } from './styled';
import Button from 'components/Button';
import FormItem from '../components/FormItem';
import moment from 'moment';
import CameraIcon from 'resources/svg/camera.svg';
import CheckBox from 'components/CheckBox';
import {SelectCustom} from 'components';
import Select from '../components/Select';
import Input from '../components/Input';
import AddressFilter from 'containers/reception/components/AddressDetail';
import { optionGenders } from 'containers/reception/constants';
import { selectIsEdit, selectEditType } from 'containers/reception/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DOBInput from 'components/DOBInput';

const ServicePatientFormView = ({
  form,
  formChange,
  ethnicityIds,
  jobIds,
  countryIds,
  provinceIds,
  districtIdsConcert,
  zoneIds,
  selectAddress,
  checkPatientValue,
  checkPatientPhone,
  checkPatientIdNo,
  checkBarcodeInsurance,
  takePicture,
  checkInsurancePortal,
  checkPatientMultipeSuggest,
  disabled,
  disabledEthnicity,
  disabledAddress,
  editType
  
}) => {
  const srcAvatar = form.avatar.absoluteUrl() || '/images/avatar-default.png';
  return (
    <Main>
      <div className="capture-image--wrap">
        <div className="row mb5">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div className="input-item">
                  <span className="label-input">Ngày đăng ký</span>
                  <p className="input-content">
                    {moment().format('HH:mm:ss DD/MM/YYYY')}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-item">
                  <span className="label-input">Khoa</span>
                  <p className="input-content" />
                </div>
              </div>
            </div>
            <div className="row mb5">
              <div className="col-md-6">
                <FormItem
                  ref={formChange['patientValueRef']}
                  label={'Mã người bệnh'}
                  placeholder={'Mã người bệnh'}
                  inputComponent={Input}
                  onChange={formChange.patientValue}
                  value={form.patientValue}
                  onKeyDown={checkPatientValue}
                  onBlur={checkPatientValue}
                  disabled={disabled}
                />
              </div>
              <div className="col-md-6">
                <div className="input-item">
                  <span className="label-input">Mã hồ sơ</span>
                  <p className="input-content" />
                </div>
              </div>
            </div>

            <FormItem
              ref={formChange['patientNameRef']}
              label={'Họ và tên *'}
              placeholder={'Họ và tên'}
              require={!form.patientName}
              inputComponent={Input}
              onChange={formChange.patientName}
              value={form.patientName}
              disabled={disabled}
              onKeyDown={e => {
                checkBarcodeInsurance(e);
                checkInsurancePortal();
                checkPatientMultipeSuggest();
              }}
              validate
              rules={[
                {
                  rule: 'required',
                  message: 'Tên người bệnh không được bỏ trống',
                },
                {
                  rule: 'lengthName',
                  message: 'Họ và tên không được nhập quá 60 kí tự !',
                },
                {
                  rule: 'formatName',
                  message:
                    'Xin lỗi , chỉ được nhập ký tự (a-z) , số ( 0-9 ) , và dấu (.)',
                },
              ]}
            />
          </div>
          <div className="col-md-4">
            <div
              className="take-photo not-popup"
              style={{ backgroundImage: `url(${srcAvatar})` }}
            >
              <div className="over-lay-captured">
                <div className="icon-avatar">
                  <Button keyCode={118} onClick={takePicture}>
                    <CameraIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row mb5">
          <div className="col-md-8">
            <FormItem
              ref={formChange['birthdayRef']}
              label={'Ngày sinh *'}
              placeholder={'Ngày sinh'}
              inputComponent={DOBInput}
              require={!form.birthday.date}
              onChange={formChange.birthday}
              value={form.birthday}
              onKeyDown={() => {
                checkPatientMultipeSuggest();
                checkInsurancePortal();
              }}
              fieldKey={'birthday'}
              disabled={disabled}
              rules={[
                {
                  rule: 'required',
                  message: 'Ngày sinh bệnh không được bỏ trống',
                },
                {
                  rule: 'invalidType1',
                  message:
                    'Sai định dạng. Yêu cầu tuổi của Người bệnh nằm trong khoảng giá tự 1 - 200 (tuổi)',
                },
                {
                  rule: 'invalidType2',
                  message:
                    'Định dạng ngày sinh sai. Yêu cầu nhập số và sử dụng định dạng: A hoặc AA hoặc AAA (Tuổi) - YYYY (Năm sinh) - DDMMYY hoặc DDMMYYYY hoặc DD/MM/YYY (Ngày tháng năm sinh)',
                },
                { rule: 'invalidType3', message: 'Ngày sinh không đúng' },
              ]}
            />
          </div>
          <div className="col-md-4">
            <FormItem
              ref={formChange['genderRef']}
              label={'Giới tính'}
              options={optionGenders}
              placeholder={'Giới tính'}
              inputComponent={Select}
              onChange={formChange.gender}
              value={form.gender}
              disabled={disabled}
            />
          </div>
        </div>
        <FormItem
          ref={formChange['addressRef']}
          label={'Địa chỉ'}
          placeholder={'Địa chỉ'}
          className="mb5"
          inputComponent={AddressFilter}
          selectAddress={selectAddress}
          onChange={formChange.address}
          value={form.address}
          disabled={disabled}
        />
        <div className="row mb5">
          <div className="col-md-4">
            <FormItem
              ref={formChange['phoneRef']}
              label={'Số điện thoại'}
              placeholder={'Số điện thoại'}
              inputComponent={Input}
              onChange={formChange.phone}
              value={form.phone}
              onKeyDown={checkPatientPhone}
              onBlur={checkPatientPhone}
              disabled={disabled}
              rules={[
                {
                  rule: 'phoneFormat',
                  message:
                    ' Số điện thoại không đúng định dạng, các số có thể cách nhau bởi khoảng trắng.',
                },
                {
                  rule: 'phoneLength',
                  message:
                    'Yêu cầu nhập Số (10 - 18 ký tự), có thể nhập số 0 hoặc bỏ trống',
                },
              ]}
            />
          </div>
          <div className="col-md-4">
            <FormItem
              ref={formChange['idNoRef']}
              label={'Số CMT/Hộ chiếu'}
              placeholder={'Số CMT/Hộ chiếu'}
              inputComponent={Input}
              onChange={formChange.idNo}
              value={form.idNo}
              onKeyDown={checkPatientIdNo}
              onBlur={checkPatientIdNo}
              disabled={disabled}
              rules={[
                {
                  rule: 'idNoFormat',
                  message: ' Số CMT/ Hộ chiếu không hợp lệ. Yêu cầu nhập 8 - 12 ký tự, có thể nhập số 0 hoặc bỏ trống.',
                },
              ]}
            />
          </div>
          <div className="col-md-4">
            <FormItem
              ref={formChange['ethnicityIdRef']}
              label={'Dân tộc'}
              options={ethnicityIds}
              placeholder={'Dân tộc'}
              inputComponent={SelectCustom}
              value={form.ethnicityId}
              type={'white'}
              onChange={formChange.ethnicityId}
              disabled={disabledEthnicity || disabled}
            />
          </div>
        </div>
        <FormItem
          ref={formChange['jobIdRef']}
          label={'Nghề nghiệp'}
          options={jobIds}
          placeholder={'Nghề nghiệp'}
          inputComponent={SelectCustom}
          className={'mb10'}
          value={form.jobId}
          onChange={formChange.jobId}
          disabled={disabled}
          displayEmpty
        />
        <div className="row mb5">
          <div className="col-md-4">
            <FormItem
              ref={formChange['guardianNameRef']}
              label={'Tên người bảo lãnh'}
              placeholder={'Tên người bảo lãnh'}
              inputComponent={Input}
              require={
                form.birthday && form.birthday.date && moment().diff(form.birthday.date, 'year') < 7
              }
              value={form.guardianName}
              onChange={formChange.guardianName}
              common={{ birthdayStr: form.birthdayStr }}
              disabled={disabled}
              rules={[
                {
                  rule:
                    form.birthday && moment().diff(form.birthday.date, 'year') < 7
                      ? 'required'
                      : '',
                  message: 'Vui lòng điền tên người bảo lãnh!',
                },
                {
                  rule: 'formatName',
                  message:
                    'Xin lỗi , chỉ được nhập ký tự (a-z) , số ( 0-9 ) , và dấu (.)',
                },
              ]}
            />
          </div>
          <div className="col-md-4">
            <FormItem
              ref={formChange['guardianPhoneRef']}
              label={'SĐT người bảo lãnh'}
              placeholder={'SĐT người bảo lãnh'}
              require={
                form.birthday && form.birthday.date && moment().diff(form.birthday.date, 'year') < 7
              }
              inputComponent={Input}
              value={form.guardianPhone}
              onChange={formChange.guardianPhone}
              disabled={disabled}
              rules={[
                {
                  rule:
                    form.birthday && moment().diff(form.birthday.date, 'year') < 7
                      ? 'required'
                      : '',
                  message: 'Vui lòng điền SĐT người bảo lãnh!',
                },

                {
                  rule: 'phoneFormat',
                  message:
                    ' Số điện thoại không đúng định dạng. các số có thể cách nhau khoảng trắng.',
                },
                {
                  rule: 'phoneLength',
                  message: 'Yêu cầu nhập Số (10 - 18 ký tự)',
                },
              ]}
            />
          </div>
          <div className="col-md-4">
            <FormItem
              ref={formChange['guardianIdNoRef']}
              label={'CMT người bảo lãnh'}
              options={[]}
              require={
                form.birthday && form.birthday.date && moment().diff(form.birthday.date, 'year') < 7
              }
              placeholder={'CMT người bảo lãnh'}
              inputComponent={Input}
              value={form.guardianIdNo}
              onChange={formChange.guardianIdNo}
              disabled={disabled}
             
              rules={[
                {
                  rule:
                    form.birthday && moment().diff(form.birthday.date, 'year') < 7
                      ? 'required'
                      : '',
                  message: 'CMT người bảo lãnh không được để trống!',
                },
                {
                  rule: 'idNoFormat',
                  message: ' Số CMT/ Hộ chiếu không hợp lệ. Yêu cầu nhập 8 - 12 ký tự, có thể nhập số 0 hoặc bỏ trống.',
                },
              ]}
            />
          </div>
        </div>
        <div className="form-item mb5">
          <CheckBox
            className="mr10"
            checked={form.priority}
            onChange={formChange.priority}
            disabled={disabled}
          >
            {'Ưu tiên'}
          </CheckBox>
          <CheckBox
            checked={form.appointment}
            onChange={formChange.appointment}
            disabled={editType === 1}
          >
            {'Người bệnh hẹn khám'}
          </CheckBox>
        </div>
        <div className="more-info">
          <span className="more-info--action">Thêm thông tin</span>
          <div className="more-info--inner">
            <div className="row">
              <div className="col-md-4">
                <FormItem
                  ref={formChange['nationalityIdRef']}
                  label={'Quốc tịch'}
                  options={countryIds}
                  placeholder={'Quốc tịch'}
                  inputComponent={SelectCustom}
                  value={form.nationalityId}
                  onChange={formChange.nationalityId}
                  className={'mb5'}
                  disabled={disabled}
                />
              </div>
              <div className="col-md-4">
                <FormItem
                  ref={formChange['countryIdRef']}
                  label={'Quốc gia'}
                  options={countryIds}
                  placeholder={'Quốc gia'}
                  inputComponent={SelectCustom}
                  value={form.countryId}
                  onChange={formChange.countryId}
                  disabled={disabled}
                />
              </div>
              <div className="col-md-4">
                <FormItem
                  ref={formChange['provinceIdRef']}
                  label={'Tỉnh/TP *'}
                  options={provinceIds}
                  placeholder={'Tỉnh/TP'}
                  inputComponent={SelectCustom}
                  require={!form.provinceId}
                  value={form.provinceId}
                  onChange={formChange.provinceId}
                  disabled={disabledAddress || disabled}
                  rules={[
                    {
                      rule: 'required',
                      message: 'Vui lòng nhập Tỉnh/TP',
                    },
                  ]}
                />
              </div>
              <div className="col-md-4">
                <FormItem
                  ref={formChange['districtIdRef']}
                  label={'Quận/Huyện'}
                  options={districtIdsConcert}
                  placeholder={'Quận/Huyện'}
                  inputComponent={SelectCustom}
                  value={form.districtId}
                  onChange={formChange.districtId}
                  disabled={disabledAddress || disabled}
                />
              </div>
              <div className="col-md-4">
                <FormItem
                  ref={formChange['zoneIdRef']}
                  label={'Phường/Xã'}
                  options={zoneIds}
                  placeholder={'Phường/Xã'}
                  inputComponent={SelectCustom}
                  value={form.zoneId}
                  onChange={formChange.zoneId}
                  disabled={disabledAddress || disabled}
                />
              </div>
              <div className="col-md-4">
                <FormItem
                  ref={formChange['detailAddressRef']}
                  label={'Số nhà/Thôn/Xóm'}
                  placeholder={'Số nhà/Thôn/Xóm'}
                  inputComponent={Input}
                  value={form.detailAddress}
                  onChange={formChange.detailAddress}
                  disabled={disabledAddress || disabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
const mapState = createStructuredSelector({
  isEdit: selectIsEdit(),
  editType: selectEditType(),

});


export default connect(mapState, null, null, { forwardRef: true })(
  ServicePatientFormView,
);
