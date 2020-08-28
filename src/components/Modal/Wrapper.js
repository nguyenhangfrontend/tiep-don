import React from 'react';
import EventLayerWrapper from 'components/EventLayerWrapper';

const Wrapper = Component => ({ show, ...other }) => {
  if (!show) {
    return null;
  }

  return (
    <EventLayerWrapper layerEvent={{ key: 'modal', events: [] }}>
      <Component {...other} />
    </EventLayerWrapper>
  );
};

export default Wrapper;
