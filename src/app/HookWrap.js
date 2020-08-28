import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import { useInjectReducer } from 'utils/injectReducer';
import { prefix, layerEvent } from './constants';
import reducer from './reducer';
import { compose } from 'redux';
import { addLayer } from './actions';
import { selectLayers } from './selectors'
import { createStructuredSelector } from 'reselect'

const HookWrap = (props) => {
	const { addLayer } = props;
	useInjectReducer({ key: prefix, reducer });

	useEffect(() => {
		addLayer(layerEvent);
	}, [addLayer]);

	return (
		<div>
			<Main {...props} />
		</div>
	);
};

const mapState = createStructuredSelector({
	layers: selectLayers(),
});

const mapDispatch = dispatch => ({
	addLayer: data => dispatch(addLayer(data)),
});

const withConnect = connect(
	mapState,
	mapDispatch
);

export default compose(
	withConnect,
	memo,
)(HookWrap)
