import { connect } from 'react-redux';
import RootModalComponent from './RootModalComponent';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';

const mapStateToProps = createStructuredSelector({
  current: selectors.currentModal(),
});

const RootModal = connect(mapStateToProps)(RootModalComponent);

export { RootModal };
