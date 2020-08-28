import React, { PureComponent } from 'react';
import printProvider from 'data-access/print-provider';
import { isEmpty, isEqual, get } from 'lodash';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Button from 'components/Button';
import * as actions from './actions';
import { lastTime } from 'reducers/selectors';
import { createStructuredSelector } from 'reselect';
import { selectHistorySigned } from './selectors';
import { PrinterWrapper, WrapperPdf, SideBarPdf, RowSign } from './styles';
import Menu from 'components/SubMenu';
import { selectDataShowMenuLv4 } from 'containers/medical-record/selectors';

const initState = {
  pdfFile: '',
  pdfFile1: '',
  patientDocument: '',
  UnsignedFile: [],
  activeLink: null,
  activeSignNow: true,
  requestSignPatient: false,
  item: null,
};

class printPDF extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.props.listHistorySigned, newProps.listHistorySigned)) {

      this.handleHistorySigned(newProps.listHistorySigned);
    }
    const { selectDataShowMenuLv4 } = this.props;
    const { haveSubMenu, keySubMenuLv2, idSubmenuActive } =
      selectDataShowMenuLv4 || {};
    if (!isEqual(this.props.namePdf, newProps.namePdf)) {
      
      this.setState(initState);
      this.props.resetState();
      if (this.printer1){
  
        this.printer1.src = '';
      }
      
    }else
    if ((keySubMenuLv2 && haveSubMenu && !idSubmenuActive) || !keySubMenuLv2) {
      
      if (this.printer1) {
        
        this.printer1.src = '';
      }
     
    }
  }
  async handlePrint() {
    if (this.printer1) {
      var w = window.open(this.printer1.src);
      w.addEventListener('load', async () => {
        w.onfocus = function() {
          w.close();
        };
        w.print();
      });
    }
  }
  closePrinter() {
    this.setState({
      openPrintPopup: false,
    });
  }
  getFirstPdf(firstPdf) {
    this.setState({
      pdfFile1: firstPdf,
    });
  }

  showPdf(pdf, pdfFile, patientDocument, ignoreHistory, notSigned) {
    // if(!pdf) return;
    let pdfFIle1 = notSigned ? this.state.pdfFile1 : pdfFile;
    this.setState(
      {
        openPrintPopup: true,
        pdfFile: pdfFIle1,
        patientDocument: patientDocument,
        unSignedNow: false,
      },
      () => {
  
        if (!ignoreHistory) {
        
          this.getHistorySigned(this.state.patientDocument);
        }

        let blob = new Blob([new Uint8Array(pdf)], { type: 'application/pdf' });
        let blobUrl = window.URL.createObjectURL(blob);
        let printer = this.printer1;
        printer.src = blobUrl;
        setTimeout(
          function() {
            let count;
            var input = document.getElementById('pdfDocument');
            var reader = new FileReader();

            reader.readAsBinaryString(blob);
            reader.onloadend = () => {
              count = !this.state.signature
                ? get(reader, 'result.match(//Type[s]*/Page[^s]/g)', []).length
                : get(reader, 'result.match(//Type[s]*/Page[^s]/g)', [])
                    .length - 1;
              if (count) {
                this.setState({
                  count: count,
                });
              }
              return;
            };
          }.bind(this),
          1000,
        );
      },
    );
  }
  getHistorySigned = patientDocument => {
    const { formValue, getHistorySigned, recordId } = this.props;
    getHistorySigned({ patientDocument, formValue, recordId });
  };

  handleHistorySigned = data => {
    if (data.code === 0 && !isEmpty(data && data.data)) {
      let histories = data.data;
      let obj = {};
      if (histories)
        histories = histories
          .filter(item => {
            return item.status === 0;
          })
          .sort(function(itema, itemb) {
            return itema.actDate < itemb.actDate ? 1 : -1;
          });

      histories.forEach(item => {
        if (item.status !== 0) return;
        if (!obj[item.fileName]) {
          obj[item.fileName] = [];
        }
        obj[item.fileName].push(item);
      });
      for (let key in obj) {
        let signeds = obj[key];

        let sequenceNo = 0;
        let signed = false;

        for (let i = signeds.length - 1; i >= 0; i--) {
          let item = signeds[i];

          if (sequenceNo !== 0) {
            if (item.sequenceNo !== sequenceNo || signed) {
              signed = true;
              item.signed = true;
            }
          } else {
            sequenceNo = item.sequenceNo;
          }
        }
      }
      let arr = [];

      let keys = Object.keys(obj);
      keys.forEach(key => {
        arr.push(obj[key]);
      });

      let item =
        arr &&
        ((arr.length > 0 && arr[0][0].sequenceNo === 2) ||
          arr[0][0].sequenceNo === 1)
          ? arr[0][0]
          : {};
      this.setState(
        {
          listHistorySigned: arr,
          item: item,
        },
        () => {
          let pdfFile = this.state.item.signedFilePath || this.state.pdfFile1;

          this.pdfSigned(pdfFile);
        },
      );
    } else {
      this.setState({
        listHistorySigned: [],
      });
    }
  };

  saveUnsignedFile(UnsignedFile) {
    this.setState({
      UnsignedFile: UnsignedFile,
    });
  }

  pdfSigned(pdf) {
    printProvider
      .showPdfSigned(pdf)
      .then(s => {
        this.showPdf(s, pdf, this.state.patientDocument, true);
        this.setState({
          signature: true,
        });
      })
      .catch(e => {});
  }

  signaturePatient = () => {
    let fileName = this.state.pdfFile;
    const { formValue } = this.props;
    let patientDocument = this.state.patientDocument;
    let temp = {
      formValue,
      fileName: fileName,
      patientDocument: patientDocument,
      sequenceNo: 1,
      recordId: this.props.recordId,
    };
    this.setState({
      requestSignedPatient: true,
      unSignedNow: true,
    });
    printProvider
      .signaturePatient(temp)
      .then(s => {
        if (s.code === 0) {
          toast.success(`Yêu cầu kí thành công!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(`Lỗi server!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch(e => {});
  };
  signature = () => {
    const { recordId, formValue } = this.props;
    let fileName = this.state.pdfFile;
    let patientDocument = this.state.patientDocument;
    let temp = {
      formValue,
      signPositionStr: 'chu_ky_1',
      fileName: fileName,
      patientDocument: patientDocument,
      sequenceNo: 1,
      recordId,
    };
    printProvider
      .signature(temp)
      .then(s => {
        this.setState(
          {
            requestDoctorSigned: true,
          },
          () => {
            let ignoreHistory = true;
            this.pdfSigned(s.data && s.data.signedFilePath, ignoreHistory);
            this.getHistorySigned(this.state.patientDocument);
          },
        );
      })
      .catch(e => {});
  };

  renderItemHistory(item, index) {
    const date = new Date(item.actDate);
    return (
      <li key={index} className="item-child-history">
        <div>
          <img src="/images/check-symbol-green.png" alt="check-symbol-green" />{' '}
          {date.format('HH:mm dd/MM/yyyy')} - <strong>{item.username}</strong> -{' '}
          <span className="color-red-bold">
            {item.sequenceNo === 2 ? 'Ký số' : 'Ký ĐT'}
          </span>
        </div>
      </li>
    );
  }

  renderItemGroupHistory = (itemGroup, index) => {
    let item = itemGroup[0];
    let fileName = item.fileName;
    let arr = fileName.split('_');
    if (arr.length < 2) return null;

    let year = arr[0].substring(0, 4);
    let month = arr[0].substring(4, 6);
    let day = arr[0].substring(6, 8);
    let hour = arr[0].substring(8, 10);
    let minute = arr[0].substring(10, 12);
    let second = arr[0].substring(12, 14);

    let time = new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`);

    return (
      <li
        key={index}
        className={`item-signatures ${
          itemGroup[0] === this.state.item ? 'active-link' : ''
        }`}
      >
        <div
          className="main-file-pdf"
          style={{ cursor: 'pointer' }}
          onClick={e => {
            let item = itemGroup[0];
            this.pdfSigned(item.signedFilePath);
            this.setState({
              item: itemGroup[0],
              pdfFile: item.signedFilePath,
            });
          }}
        >
          <p className="name">
            {/* {arr[1]} */}
            {this.props.namePdf}
          </p>
          <span className="time-pdf">
            {!isNaN(new Date(time)) ? time.format('HH:mm:ss - dd/MM/yyyy') : ''}
          </span>
        </div>

        <ul>
          {itemGroup.map((item, index) => this.renderItemHistory(item, index))}
        </ul>
      </li>
    );
  };

  render() {
    const {
      isDefaultScreen,
      handleNextPdf,
      handleBackPdf,
      selectDataShowMenuLv4,
    } = this.props || {};
    const { haveSubMenu, keySubMenuLv2 } = selectDataShowMenuLv4;
    return this.state.openPrintPopup ? (
      <div>
        {this.props.isPopup && (
          
          <div className="poup">
           
            <div className="emr-small popup-print-single">
              <div
                className="over-lay-popup"
                onClick={() =>
                  this.setState({
                    openPrintPopup: false,
                    requestDoctorSigned: false,
                    unSignedNow: false,
                  })
                }
              ></div>
            </div>
          </div>
        )}

        <div className={`mock-up ${this.props.isPopup ? 'ispopup-print' : ''}`}>
        
          <div className="mokup-item">
            {this.props.isPopup && (
              <button
                className="mokup-time"
                onClick={() =>
                  this.setState({
                    openPrintPopup: false,
                    requestDoctorSigned: false,
                    unSignedNow: false,
                  })
                }
              >
                <img src="/images/times-1.png" alt="" />
              </button>
            )}

            <PrinterWrapper
              className="print-view"
              isDefaultScreen={isDefaultScreen}
            >
              <div className="header-printer">{this.props.namePdf}</div>
              <div className="row display-flex">
                <div className="col-md-2 pr-0">
                  <SideBarPdf className="right-bar-printer item-equal--height">
                    {this.props.formValue && this.props.signed && (
                      <div className="ki-so ">
                        <p className="label-printer">Chữ kí số</p>
                        <button className="btn-block btn btn-primary btn-print signatures text-normal signed">
                          Đã ký
                          <span>
                            <img src="/images/check-symbol-green.png" alt="" />
                          </span>
                        </button>{' '}
                        }
                      </div>
                    )}
                    {this.props.patientSign && (
                      <div className="ki-so">
                        <p className="label-printer">Chữ kí của người bệnh</p>

                        {(this.state.item &&
                          this.state.item.status === 0 &&
                          this.state.item.sequenceNo === 1) ||
                        (this.state.item && this.state.item.signed) ? (
                          <button className="btn-block btn btn-primary btn-print signatures text-normal signed">
                            Đã ký
                            <span>
                              <img
                                src="/images/check-symbol-green.png"
                                alt=""
                              />
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={this.signaturePatient}
                            className="btn-block btn btn-primary btn-print signatures"
                          >
                            <span>
                              <img
                                src="/images/signing-the-contract.png"
                                alt=""
                              />
                            </span>
                            Chữ kí người bệnh
                          </button>
                        )}
                      </div>
                    )}
                    {this.props.doctorSign && (
                      <div className="ki-so ">
                        <p className="label-printer">Chữ kí số</p>
                        {(this.state.item &&
                          this.state.item.status === 0 &&
                          this.state.item.sequenceNo === 1) ||
                        (this.state.item && this.state.item.signed) ? (
                          <button className="btn-block btn btn-primary btn-print signatures text-normal signed">
                            Đã ký
                            <span>
                              <img
                                src="/images/check-symbol-green.png"
                                alt=""
                              />
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={this.signature}
                            className="btn-block btn btn-primary btn-print signatures"
                          >
                            <span>
                              <img
                                src="/images/signing-the-contract.png"
                                alt=""
                              />
                            </span>
                            Kí số
                          </button>
                        )}
                      </div>
                    )}

                    <div className="print">
                      <p className="label-printer">Tổng số trang: 1 trang</p>
                      <button
                        ref={ref => (this.print = ref)}
                        className="btn btn-block btn-primary signatures btn-save"
                        onClick={this.handlePrint.bind(this)}
                      >
                        {' '}
                        <span>
                          <img src="/images/printer.png" alt="" />
                        </span>{' '}
                        In
                      </button>
                    </div>
                    <div
                      className={
                        haveSubMenu && keySubMenuLv2 ? 'active-menu2' : ''
                      }
                    >
                      <Menu />
                    </div>
                  </SideBarPdf>
                </div>
                <div className="col-md-8 pl-0 pr-0">
                  <WrapperPdf className="h-100">
                    {handleBackPdf && (
                      <Button
                        onClick={handleBackPdf}
                        // keyCode={37}
                        size="large"
                        type="transparent"
                      >
                        <i
                          className="fa fa-arrow-circle-o-left"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    )}
                    <embed
                      id="pdfDocument"
                      width="100%"
                      ref={ref => (this.printer1 = ref)}
                      type="application/pdf"
                    />
                    {handleNextPdf && (
                      <Button
                        // keyCode={39}
                        size="large"
                        type="transparent"
                        onClick={handleNextPdf}
                      >
                        <i className="fa fa-arrow-circle-o-right"></i>
                      </Button>
                    )}
                  </WrapperPdf>
                </div>
                <div className="col-md-2 pl-0">
                  <SideBarPdf className="right-bar-printer item-equal--height">
                    <p className="label-printer text-uppercase text-center">
                      Lịch sử ký
                    </p>
                    <RowSign className="list-signatures mostly-customized-scrollbar">
                      {this.props.doctorSign || this.props.patientSign ? (
                        <React.Fragment>

                          {!this.state.unSignedNow && (
                            <li
                              onClick={() => {
                                this.setState(
                                  {
                                    item: null,
                                  },
                                  () => {
                                    this.showPdf(
                                      this.state.UnsignedFile,
                                      this.state.pdfFile,
                                      this.state.patientDocument,
                                      true,
                                      true,
                                    );
                                  },
                                );
                              }}
                              className={
                                !this.state.item
                                  ? 'item-signatures active-unsinature'
                                  : 'item-signatures'
                              }
                            >
                              <div className="main-file-pdf">
                                <p className="label-printer">
                                  {new Date().format(
                                    'HH:mm',
                                  )}{' '}
                                  Ngày{' '}
                                  {new Date().format(
                                    'dd/MM/yyyy',
                                  )}{' '}
                                </p>
                                <p className="status-signatures ">
                                  Trạng thái: Chưa ký
                                </p>
                              </div>
                            </li>
                          )}
                          </React.Fragment>
                      ) : null}

                      {this.state.listHistorySigned &&
                      this.state.listHistorySigned.length ? (
                        this.state.listHistorySigned.map(
                          (historyItem, index) => {
                            return this.renderItemGroupHistory(
                              historyItem,
                              index,
                            );
                          },
                        )
                      ) : (
                        <li className="unsignedItem">Chưa có lịch sử ký</li>
                      )}
                    </RowSign>
                  </SideBarPdf>
                </div>
                <div />
              </div>
              <div className="pagination-print">
                <span>Trang</span> {this.state.count}
              </div>
            </PrinterWrapper>
          </div>
        </div>
      </div>
    ) : null;
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    getHistorySigned: data => dispatch(actions.getHistorySigned(data)),
    resetState: () => dispatch(actions.resetState()),
  };
}
const mapStateToProps = createStructuredSelector({
  listHistorySigned: selectHistorySigned(),
  selectDataShowMenuLv4: selectDataShowMenuLv4(),
  last_time: lastTime(),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(printPDF);
