import React from 'react';
import PropTypes from 'prop-types';

const RootModalComponent = ({ current: { modalType, modalProps } }) => {
  const ModalComponent = modalType;
  if (!ModalComponent) return null;
  return <ModalComponent {...modalProps} />;
};

RootModalComponent.propTypes = {
  current: PropTypes.object,
};

export default RootModalComponent;
