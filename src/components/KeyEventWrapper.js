import React, { memo, useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { addEvent, removeEvent } from 'app/actions';
import { compose } from 'redux';

const KeyEventWrapper = props => {
  const {
    children,
    keyCode,
    dispatchAddEvent,
    keyAction,
    controlKey,
    removeEvent,
    listEvents,
  } = props;
  const e = { keyCode, keyAction, controlKey };
  const handleAddEvent = () => {
		if (keyCode || listEvents) {
			if (listEvents) {
        dispatchAddEvent(listEvents);
      } else {
				dispatchAddEvent(e);
			}
    }
  };

  useEffect(() => {
    handleAddEvent();
    return () => removeEvent(e);
  }, []);

  return children;
};

KeyEventWrapper.defaultProps = {
  controlKey: '',
  keyCode: 0,
  listEvents: null,
};

KeyEventWrapper.propTypes = {
  keyCode: T.number,
  controlKey: T.oneOf(['ctrlKey', 'shiftKey', 'altKey', '']),
  keyAction: T.func,
  listEvents: T.array,
};

const mapDispatch = dispatch => ({
  dispatchAddEvent: data => dispatch(addEvent(data)),
  removeEvent: data => dispatch(removeEvent(data)),
});

const withConnect = connect(null, mapDispatch);

export default compose(withConnect, memo)(KeyEventWrapper);
