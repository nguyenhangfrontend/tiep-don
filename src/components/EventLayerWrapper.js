import React, { memo, useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addLayer, removeLayer} from 'app/actions';
import { createStructuredSelector } from 'reselect';
import { selectLayers } from 'app/selectors';

const EventLayerWrapper = (props) => {
	const { addLayer, layerEvent, children, removeLayer, layers } = props;
	if (!layers.find(item => item.key === layerEvent.key)) {
		addLayer(layerEvent);
	}

	useEffect(() => {
		return () => removeLayer(layerEvent);
	}, []);

	return children;
};

EventLayerWrapper.propTypes = {
	layerEvent: T.shape({}),
};

const mapState = createStructuredSelector({
	layers: selectLayers(),
});

const mapDispatch = dispatch => ({
	addLayer: data => dispatch(addLayer(data)),
	removeLayer: data => dispatch(removeLayer(data)),
});

const withConnect = connect(
	mapState,
	mapDispatch
);

export default compose(
	withConnect,
	memo,
)(EventLayerWrapper)
