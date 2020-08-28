import React, { memo } from 'react';
import T from 'prop-types';
import Modal from 'components/Modal';
import Button from 'components/Button';
import ErrorIcon from 'resources/svg/error.svg';
import { Main, Header, Footer } from './styled';

const ErrorDeleteModal = ({ success, errors, headMessage, bodyMessage }) => {
  const header = <Header>{`${headMessage} (${success}) dịch vụ!`}</Header>;

  const footer = callback => (
    <Footer>
      <Button onClick={callback} className={'repeat-btn'}>
        {'Xác nhận'}
      </Button>
    </Footer>
  );
  return (
    <Modal header={header} footer={footer} width={'60%'} show>
      <Main>
        <div className={'error-title'}>
          {`${bodyMessage} (${errors.length})`}
        </div>
        <div className={'errors-list'}>
          {errors.map(item => (
            <div className={'error-line'}>
              <div className={'error-icon'}>
                <ErrorIcon />
              </div>
              <div className={'service-code'}>{`Dịch vụ ${item.value}: `}</div>
              <div className={'error-message'}>{item.message}</div>
            </div>
          ))}
        </div>
      </Main>
    </Modal>
  );
};

ErrorDeleteModal.defaultProps = {
  errors: [],
  headMessage: 'Xóa thành công',
  bodyMessage: 'Không xóa được',
};

ErrorDeleteModal.propTypes = {
  errors: T.arrayOf(T.shape({})),
  success: T.number,
  headMessage: T.string,
  bodyMessage: T.string,
};

export default memo(ErrorDeleteModal);
