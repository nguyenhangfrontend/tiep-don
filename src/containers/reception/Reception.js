import BookService from 'containers/book-service';
import ToolBar from 'containers/reception/components/Middle/Toolbar';
import React, { PureComponent } from 'react';
import printProvider from 'data-access/print-provider';
import dataCacheProvider from 'data-access/datacache-provider';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PrintPDF from 'containers/print';
import constants from 'resources/strings';
import { createStructuredSelector } from 'reselect';
import ReceptionForm from 'containers/reception/components/Middle/ReceptionForm/Container';
import { WrappedReceived } from './Styles';
import Loading from 'components/Loading';
import {
  updatePatient,
  clearPatient,
  nextPatient,
  fetchPatientsSuccess,
  fetchPatient,
  setDataChange
} from './actions';
import { selectPatient, selectPatients, selectdataChange, selectLoadingAll } from './selectors';
import { ModalAction } from 'components/Modal';
import ModalConfirm from 'components/Modal/Confirm';

class Reception extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
    };
    this.printer = React.createRef();
    this.bookedServiceRef = React.createRef();
  }
  handleNextPatient = async data => {
    const { fetchPatientsSuccess, fetchPatient } = this.props;

   await fetchPatientsSuccess(data);
    const waittingPatents = data.filter(item => item.status === 20);
    const waittingPatentId = waittingPatents && waittingPatents[0].receptionId;
    if (waittingPatentId) {
      fetchPatient({
        receptionId: waittingPatentId
      });
    }
  };
componentDidMount(){
  const {setDataChange} = this.props
  setDataChange(false)
}
  nextPatient = () => {
    // TODO
    const {
      nextPatient,
      history,
      fetchPatient,
      patients,
      patient,
      updatePatient,
    } = this.props;

    history.push(`/admin/tiep-don/`);
    const waittingPatents = patients.filter(item => item.status === 20);
    if (waittingPatents.length) {
      const waittingPatentId = waittingPatents[0].receptionId;
      if ( patient.id === waittingPatentId) {
        
        const counterStr = localStorage.getItem('counter');

        const counterId = counterStr ? JSON.parse(counterStr).id : '';
        const param = { counterId: counterId };
        nextPatient({ param, callback: this.handleNextPatient });
      } else {
        if (waittingPatentId) {
          
          fetchPatient({
            receptionId: waittingPatentId
          });
          updatePatient({
            ...waittingPatents[0],
            key: waittingPatentId,
          });
        }
      }
    }

 
  };

  handlePrint = () => {
    
    const { patient } = this.props;

    this.savePrintTimeAction();
    if (patient.patientDocument && patient.patientType === 2) {
      this.setState({
        loading: true,
      });
      this.printUnsignPdf();
    }
  }

  printF = () => {
    this.handlePrint();
    this.setState({
      namePdf: 'In Giấy Giữ Thẻ',
    });
  };

  printUnsignPdf = () =>{
    
    const { patient } = this.props;
    printProvider
      .getPdf(patient.id)
      .then(s => {
        this.setState({
          loading: false,
        });

        this.printInsuranceCardHolder(s.data);
        return;
      })
      .catch(() => {});
  }

  printInsuranceCardHolder = (pdf) =>{
    const { patient } = this.props;

    printProvider
      .showPdf(pdf)
      .then(s => {
        let patientDocument = patient.patientDocument;
        if (this.printer) {
          this.printer.current.showPdf(s, pdf, patientDocument, true);
          this.printer.current.getFirstPdf(pdf);
          this.printer.current.saveUnsignedFile(s);
        }
      })
      .catch(e => {});
  }

  savePrintTimeAction() {
    const last_time = new Date().getTime();
    this.props.dispatch({
      type: constants.action.action_last_time,
      value: last_time,
    });
    dataCacheProvider.save(
      '',
      constants.key.storage.last_action_time,
      last_time,
      true,
    );
  }

  onChangeInput() {
    this.props.dispatch({
      type: constants.action.action_set_data_save_or_not,
      value: true,
    });
  }

  addNew = () => {
  const { history, clearPatient, showConfirmModal, isChangeValue } = this.props;
  
    if (!isChangeValue) {
      
     clearPatient();
     history.push('/admin/tiep-don');
     
    } else {
      
      showConfirmModal({
        message: 'Bạn có chắc chắn muốn hủy bản ghi hiện tại ?',
        dataFunction: this.addNew
      })
      
    }
  };

  render() {
    const { patient, isLoadingAll } = this.props;
    const { closemain, namePdf } = this.state;

    return (
      <WrappedReceived id="wrapper" className={closemain ? 'close-main' : ''}>
        
        <div className="main-content-received">
          <ToolBar
            nextPatient={this.nextPatient}
            printF={this.printF}
            resetForm={this.addNew}
          />

          <div>
            <Route
              path={'/admin/tiep-don/:patientId'}
              component={BookService}
            />

            <Route exact path={'/admin/tiep-don'} component={ReceptionForm} />
          </div>

          <PrintPDF
            printRef={this.printer}
            className="print-pdf"
            patientSign={true}
            recordId={patient && patient.id}
            formValue={'BM003'}
            doctorSign={true}
            isPopup={true}
            namePdf={namePdf}
          />
        </div>
        
      </WrappedReceived>
    );
  }
}

const mapState = createStructuredSelector({
  patient: selectPatient(),
  patients: selectPatients(),
  isChangeValue: selectdataChange(),
  isLoadingAll: selectLoadingAll()
});

const mapDispatch = dispatch => ({
  showConfirmModal: modalProps => {
    const modalType = ModalConfirm;
    dispatch(ModalAction.showModal({ modalType, modalProps }));
  },
  updatePatient: data => dispatch(updatePatient(data)),
  setDataChange: data => dispatch(setDataChange(data)),
  clearPatient: data => dispatch(clearPatient(data)),
  nextPatient: data => dispatch(nextPatient(data)),
  fetchPatientsSuccess: data => dispatch(fetchPatientsSuccess(data)),
  fetchPatient: data => dispatch(fetchPatient(data)),
  dispatch,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  withRouter(Reception),
);
