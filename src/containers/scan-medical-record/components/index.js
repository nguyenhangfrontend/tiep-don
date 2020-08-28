import React, { useState, useEffect, useRef } from 'react';
import PrintPDF from 'containers/print';
import { connect } from 'react-redux';
import { selectFile } from '../selectors';
import { showPdf } from 'containers/scan-medical-record/actions';
import { createStructuredSelector } from 'reselect';
import printProvider from 'data-access/print-provider';
export const Active = props => {
  const [isActive, setIsActive] = useState(false);
  const { value, id, onChange, showPdf } = props;
  useEffect(() => {
    setIsActive(value);
  }, [value]);
  const handChange = e => {
    setIsActive(e.target.checked);
  };

  return <input type="checkbox" checked={isActive} onChange={handChange} />;
};

function ViewScan(props) {
  const { data } = props;

  const printer = useRef();
  const handlePrint = () => {
    // showPdf({ param: data.filePath, callback: printpdf });
    printProvider
        .showPdfScan(data.filePath)
        .then(s => {
          if (printer) {
            printer.current.showPdf(s, data.filePath, data.patientDocument, true);
            printer.current.getFirstPdf(data.filePath);
            printer.current.saveUnsignedFile(s);
          }
        })
        .catch(e => {});
    
  };

  return (
    <React.Fragment>
      <span onClick={handlePrint}>Xem</span>
      <PrintPDF printRef={printer} namePdf={data.form} className="print-pdf" isPopup={true} />
    </React.Fragment>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    showPdf: data => dispatch(showPdf(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  file: selectFile(),
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ViewScan, Active);
