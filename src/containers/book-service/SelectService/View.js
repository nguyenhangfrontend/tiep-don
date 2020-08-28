import React from 'react';
import T from 'prop-types';
import Popover from 'components/Popover';
import Button from 'components/Button';
import PrintIcon from 'resources/svg/print.svg';
import TrashIcon from 'resources/svg/trash.svg';
import { Main, ActionFillter } from './styled';
import ListServiceSearch from '../ListServiceSearch';
import KeyEventWrapper from 'components/KeyEventWrapper';
import PackageService from '../PackageService';
import Services from '../Services';
import UserInfo from '../UserInfo';

const SelectServiceView = ({
  showListSearch,
  hideListSearch,
  listSearch,
  onSubmit,
  type,
  onTypeChange,
  onFocusTextSearch,
  remove,
  printReceptionForm,
  printSpecifyForm,
  setTextSearch,
  patientOnPlanServices,
  updateListSearch,
  packageRef,
  servicesRef,
  onChangeSearch,
  submitPackage,
  patient,
  onKeydown,
  text,
  listSearchRef,
}) => (
  <Main className="col-md-10 d-flex flex-column">
    <div className="row">
      <div className="col-md-8 d-flex justify-content-end flex-column">
        <div className="head-menu  text-left">Chỉ định dịch vụ</div>
        <Popover
          show={showListSearch}
          controlRemote
          width="100%"
          onHide={hideListSearch}
          content={type === 1 ? (
              <ListServiceSearch
                ref={listSearchRef}
                switchType={onTypeChange}
                listSearch={listSearch || []}
                onSubmit={onSubmit}
                updateListSearch={updateListSearch}
              />
            ) : (
              <PackageService
                switchType={onTypeChange}
                listSearch={listSearch || []}
                onSubmit={submitPackage}
                updateListSearch={updateListSearch}
                ref={packageRef}
              />
            )
          }
        >
          <ActionFillter>
            <KeyEventWrapper
              keyAction={onTypeChange(1)}
              keyCode={49}
              controlKey={'ctrlKey'}
            >
              <div
                className={type === 1 ? 'button active pointer' : 'button pointer'}
                onClick={onTypeChange(1)}
              >
                <img
                  src={
                    type === 1
                      ? require('resources/images/group-service/dichvu0.png')
                      : require('resources/images/group-service/dichvudim.png')
                  }
                  alt=""
                />
                DỊCH VỤ
              </div>
            </KeyEventWrapper>
            <KeyEventWrapper
              keyAction={onTypeChange(0)}
              keyCode={50}
              controlKey={'ctrlKey'}
            >
              <div onClick={onTypeChange(0)} className={type === 0 ? 'button active pointer' : 'button pointer'}>
                <img
                  src={
                    type === 0
                      ? require('resources/images/group-service/phacdomau0.png')
                      : require('resources/images/group-service/phacdomaudim.png')
                  }
                  alt=""
                />
                PHÁC ĐỒ MẪU
              </div>
            </KeyEventWrapper>

            <input
              value={text}
              type="text"
              onChange={onChangeSearch}
              ref={setTextSearch}
              onKeyUp={onKeydown}
              onFocus={onFocusTextSearch}
              placeholder="Tìm kiếm Mã DV, Tên DV, Mã phác đồ mẫu, Tên phác đồ mẫu"
              className="form-control search-box"
            />
          </ActionFillter>
        </Popover>
      </div>
      <div className="col-md-4">
        <div className="select-user-info">
          <UserInfo type={'dark'} />
        </div>
      </div>
    </div>

    <div className={'select-service-toolbar'}>
      <Button
        icon={<TrashIcon />}
        shortKey={'F9'}
        keyCode={120}
        type={'light-pink'}
        onClick={remove}
        style={{ marginLeft: 50 }}
      >
        {'XÓA'}
      </Button>

      <Button
        icon={<PrintIcon />}
        keyCode={119}
        shortKey={'F8'}
        type={'light-blue'}
        onClick={printReceptionForm}
        style={{ marginLeft: 50 }}
      >
        {'IN PHIẾU KHÁM'}
      </Button>

      <Button
        icon={<PrintIcon />}
        keyCode={121}
        shortKey={'F10'}
        type={'light-blue'}
        onClick={printSpecifyForm}
        style={{ marginLeft: 50 }}
      >
        {'IN PHIẾU CHỈ ĐỊNH'}
      </Button>
    </div>

    <Services ref={servicesRef} patient={patient} services={patientOnPlanServices} />
  </Main>
);

SelectServiceView.propTypes = {
  packageRef: T.shape({}),
  showListSearch: T.bool,
  hideListSearch: T.func,
  listSearch: T.arrayOf(T.shape({})),
  onSubmit: T.func,
  type: T.number,
  onTypeChange: T.func,
  onKeyDown: T.func,
  onFocusTextSearch: T.func,
  remove: T.func,
  printReceptionForm: T.func,
  printSpecifyForm: T.func,
  submitPackage: T.func,
};

export default SelectServiceView;
