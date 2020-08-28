import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import Pagination from 'components/Pagination';
import keyEventProvider from 'data-access/keyevent-provider';
import Loading from 'components/Loading';
import { selectPatientList, isLoading, selectAccesToken } from '../selectors';
import { createStructuredSelector } from 'reselect';
import { getMedicalCodeList, getMedicalCodeLastest } from './../actions';
import DatePickerCustom from 'components/DatePicker';
class MedicalRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      patientValue: '',
      patientName: '',
      currentPage: 1,
      pagiPatientLisst: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.registerKey();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoading) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  componentWillUnmount() {
    keyEventProvider.unregister([38, 13, 40], this);
  }

  registerKey() {
    keyEventProvider.register(40, this, () => {
      let index = this.state.selectedIndex || 0;
      index++;
      if (index >= this.state.pagiPatientLisst.length)
        index = this.state.pagiPatientLisst.length - 1;

      this.setState({ selectedIndex: index });
    });
    keyEventProvider.register(38, this, () => {
      let index = this.state.selectedIndex || 0;
      index--;
      if (index < 0) index = 0;
      this.setState({ selectedIndex: index });
    });
    keyEventProvider.register(13, this, () => {
      if (
        this.state.selectedIndex >= 0 &&
        this.state.selectedIndex < this.state.pagiPatientLisst.length
      ) {
        let item = this.state.pagiPatientLisst[this.state.selectedIndex];
        this.getDetailPatientHistory(item);
      }
    });
  }
  unregisterKey() {
    keyEventProvider.unregister([38, 13, 40], this);
  }

  registerSearch(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      this.showPatient();
    }
  }
  handleChangeStartDate(date) {
    this.setState({
      startDate: date,
    });
  }
  handleChangeEndDate(date) {
    this.setState({
      endDate: date,
    });
  }
  handleChangeRegDate(date) {
    this.setState({
      regDate: date,
    });
  }

  showPatient() {
    const { patientName, patientValue } = this.state;
    const { getListPatient } = this.props;
    getListPatient({ patientName, patientValue });
  }

  getDetailPatientHistory(patient) {
    this.setState(
      {
        showDetailRecord: true,
      },
      () => {
        const { history, match } = this.props;
        const { patientValue } = patient || {};
        const { url } = match || {};
        this.props.getMedicalCodeLastest({
          patientValue: patientValue,
          history,
          url,
        });
      },
    );
  }

  onChangePage(pagiPatientLisst) {
    // update state with new page of items
    this.setState({ pagiPatientLisst: pagiPatientLisst, selectedIndex: 0 });
  }

  render() {
    const { patientList, isLoading } = this.props;
    return (
      <div className="medical-record">
        <div className="record-search">
          <div className="search-head">
            <div className=" display-flex">
              <h2 className="title-search text-left mt25">Hồ sơ bệnh án</h2>
              <div className="item-search">
                <span className="label-input">Mã NB</span>
                <div className="input-content">
                  <input
                    className="form-control"
                    onChange={e => {
                      this.setState(
                        {
                          patientValue: e.target.value,
                          valueChangeSearch: e.target.value,
                        },
                        () => {
                          this.unregisterKey();
                        },
                      );
                    }}
                    onKeyDown={e => {
                      this.registerSearch(e);
                    }}
                    onBlur={() => this.registerKey()}
                    placeholder="Mã người bệnh"
                  />
                  <button className="icon-input">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="item-search">
                <span className="label-input">Họ và tên</span>
                <div className="input-content">
                  <input
                    className="form-control"
                    placeholder="Họ và tên"
                    onChange={e => {
                      this.setState(
                        {
                          patientName: e.target.value,
                          valueChangeSearch: e.target.value,
                        },
                        () => {
                          this.unregisterKey();
                        },
                      );
                    }}
                    onKeyDown={e => {
                      this.registerSearch(e);
                    }}
                    onBlur={() => this.registerKey()}
                  />
                  <button className="icon-input">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="item-search">
                <span className="label-input">Từ ngày</span>
                <div className="input-content">
                  <DatePickerCustom
                    dateFormat={'dd/MM/yyyy'}
                    value={this.state.startDate}
                    placeholder="Từ ngày"
                    onChange={e => {
                      this.handleChangeStartDate(e);
                    }}
                    theme={'dark'}
                    className="active-element insurance-element form-control"
                    disabled={this.state.readOnlyAll ? true : ''}
                  />
                  
                </div>
              </div>
              <div className="item-search">
                <span className="label-input">Đến ngày</span>
                <div className="input-content">
                <DatePickerCustom
                    dateFormat={'dd/MM/yyyy'}
                    value={this.state.endDate}
                    placeholder="Từ ngày"
                    onChange={e => {
                      this.handleChangeEndDate(e);
                    }}
                    theme={'dark'}
                    className="active-element insurance-element form-control"
                    disabled={this.state.readOnlyAll ? true : ''}
                  />
                </div>
              </div>
              <div className="item-search mt25">
                <button
                  onClick={this.showPatient.bind(this)}
                  className="btn btn-primary btn-save btn-block"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <div className="emr-table">
            {/* <input className="hide-input" ref={ref => this.accept = ref} type="checkbox" /> */}

            <div className="table-wrapp table-suggest">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã NB</th>
                    <th> Họ và tên</th>
                    <th>Tuổi</th>
                    <th> Giới tính </th>
                    <th>Ngày đăng ký</th>
                    <th>Địa chỉ</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  <tr className={'tr-row'}>
                    <td></td>
                    <td>
                      <div className="input-content">
                        <input
                          className="form-control"
                          onChange={e => {
                            this.setState(
                              {
                                patientValue: e.target.value,
                              },
                              () => {
                                this.unregisterKey();
                              },
                            );
                          }}
                          onKeyDown={e => {
                            this.registerSearch(e);
                          }}
                          onBlur={() => this.registerKey()}
                        />
                        <button className="icon-input">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="input-content">
                        <input
                          className="form-control"
                          onChange={e => {
                            this.setState(
                              {
                                patientName: e.target.value,
                              },
                              () => {
                                this.unregisterKey();
                              },
                            );
                          }}
                          onKeyDown={e => {
                            this.registerSearch(e);
                          }}
                          onBlur={() => this.registerKey()}
                        />
                        <button className="icon-input">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="input-content">
                        <input className="form-control" />
                        <button className="icon-input">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="input-content">
                        <select
                          onChange={e => {
                            this.setState({ gender: e.target.value }, () => {
                              this.unregisterKey();
                            });
                          }}
                          onKeyDown={e => {
                            this.registerSearch(e);
                          }}
                          onBlur={() => this.registerKey()}
                          className="form-control"
                        >
                          <option value="1">Nam</option>
                          <option value="2">Nữ</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="input-content">
                        <DatePicker
                          dateFormat={'dd/MM/yyyy'}
                          selected={this.state.regDate}
                          onChange={e => {
                            this.handleChangeRegDate(e);

                            this.unregisterKey();
                          }}
                          onKeyDown={e => {
                            this.registerSearch(e);
                          }}
                          onBlur={() => this.registerKey()}
                          className="active-element insurance-element form-control"
                          disabled={this.state.readOnlyAll ? true : ''}
                        />
                        <button className="icon-input">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="input-content">
                        <input
                          className="form-control"
                          onChange={e => {
                            this.setState(
                              {
                                address: e.target.value,
                              },
                              () => {
                                this.unregisterKey();
                              },
                            );
                          }}
                          onKeyDown={e => {
                            this.registerSearch(e);
                          }}
                          onBlur={() => this.registerKey()}
                        />
                        <button className="icon-input">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {this.state.pagiPatientLisst &&
                  this.state.pagiPatientLisst.length ? (
                    this.state.pagiPatientLisst.map((item, index) => {
                      let birthday = new Date(item.birthday);
                      let birthday1 = birthday.format('dd/MM/yyyy');
                      let birthYear = birthday.getFullYear();
                      let currentYear = new Date().getFullYear();
                      let agePatient = parseInt(currentYear - birthYear);
                      let gender = item.gender === 1 ? 'Nam' : 'Nữ';
                      let registerdate = new Date(item.regDate).format(
                        'dd/MM/yyyy',
                      );

                      return (
                        <tr
                          className={
                            this.state.selectedIndex === index
                              ? 'active-item'
                              : ''
                          }
                          key={index}
                          onClick={() => {
                            this.getDetailPatientHistory(item);
                          }}
                        >
                          <td className="text-center">{index + 1}</td>
                          <td className="bold-text">{item.patientValue}</td>
                          <td className="bold-text name-patient">
                            {item.patientName}{' '}
                          </td>
                          <td>
                            {birthday1} - {agePatient} tuổi
                          </td>
                          <td className="gender-patient">{gender}</td>
                          <td>{registerdate}</td>
                          <td className="address">{item.address}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7">Không có người bệnh</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              items={patientList}
              pageSize={15}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
        <Loading visible={isLoading} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMedicalCodeList: data => dispatch(getMedicalCodeList(data)),
    getMedicalCodeLastest: data => dispatch(getMedicalCodeLastest(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  patientList: selectPatientList(),
  isLoading: isLoading(),
  selectAccesToken: selectAccesToken(),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(MedicalRecord);
