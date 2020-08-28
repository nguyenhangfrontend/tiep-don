import React, {useRef, useEffect} from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import CheckWhiteIcon from 'resources/svg/checked-white.svg';
import Button from 'components/Button';
import Modal from './index';
import { hideModal } from './RootModal/actions';
import { ModalConfirm } from './styled';

const ConfirmModal = (props) => {
	const { okAction, cancelAction, hideModal, title, message, okText, cancelText } = props;
	const btnOK = useRef(null);

  useEffect(() => {
    btnOK.current && btnOK.current.onFocus();
  }, []);
	const handleOk = () => {
		okAction();
		hideModal();
	};

	const handelCancel = () => {
		cancelAction();
		hideModal();
	};

	const header = (
		<div className={'confirm-header'}>{title}</div>
	);

	const footer = (
		<div className={'confirm-action'}>
			<Button type={'blue-light'} className={'confirm-btn'} onClick={handelCancel}>{cancelText}</Button>
			<Button  forwardRef={btnOK} icon={<CheckWhiteIcon />} shortKey={'Enter'} keyCode={13} className={'confirm-btn'} onClick={handleOk}>
				{okText}
			</Button>
		</div>
	);

	return (
		<ModalConfirm>
			<Modal show width={'25%'} header={header} footer={footer}>
				<div className={'confirm-body'}>{message}</div>
			</Modal>
		</ModalConfirm>
	)
};

ConfirmModal.defaultProps = {
	okAction: () => {},
	cancelAction: () => {},
	hideModal: () => {},
	title: '',
	message: '',
	okText: 'Có',
	cancelText: 'Không'
};

ConfirmModal.propTypes = {
	okAction: T.func,
	cancelAction: T.func,
	hideModal: T.func,
	title: T.string,
	message: T.string,
	okText: T.string,
	cancelText: T.string
};

const mapDispatch = dispatch => {
	return {
		hideModal: () => dispatch(hideModal()),
	};
};

export default connect(null, mapDispatch)(ConfirmModal);
