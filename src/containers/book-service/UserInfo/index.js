import { connect } from 'react-redux';
import View from './View';

const mapStateToProps =(state) => ({
		patient: state.reception.patient,
});

export default connect(mapStateToProps)(View)
