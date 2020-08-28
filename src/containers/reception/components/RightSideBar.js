import React, { Component } from 'react';
import roomProvider from 'data-access/room-provider';
import { connect } from 'react-redux';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }
  // get data
  getRoomInfo = () => {
    roomProvider
      .getAllRoomReception()
      .then(s => {
        this.setState({
          rooms: s.filter(item => {
            return (
              item.checkInQuantity > 0 ||
              item.servicingQuantity > 0 ||
              item.waitCheckupQuantity > 0
            );
          }),
        });
      })
      .catch(e => {
        try {
          this.setState({ rooms: [] });
        } catch (error) {}
      });
  };
  componentWillMount() {
    this.getRoomInfo();
    this.interval = setInterval(this.getRoomInfo, 10000);
  }
  componentWillUnmount() {
    try {
      if (this.interval) clearInterval(this.interval);
    } catch (error) {}
  }

  render() {
    const { rooms } = this.state;

    return (
      <div className="sidebar sidebar-right ">
        <div className="main-sidebar">
          <div className="content-sidebar mt50">
            <h4 className="title-sidebar text-uppercase">
              Thông tin phòng khám
            </h4>
            <table className="table-scroll-vertical">
              <thead>
                <tr>
                  <th scope="col">Phòng khám</th>
                  <th scope="col">Đăng kí</th>
                  <th scope="col">Chờ</th>
                  <th scope="col">Đang khám</th>
                </tr>
              </thead>
              <tbody className="mostly-customized-scrollbar list-clinic">
                {rooms && rooms.length ? (
                  rooms.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>P.{item.value}</td>
                        <td>{item.checkInQuantity}</td>
                        <td>{item.waitCheckupQuantity}</td>
                        <td>{item.servicingQuantity}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td rowSpan="4">Không có phòng khám </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="main-sidebar">
          <div className="content-sidebar history-lists mostly-customized-scrollbar ">
            <h4 className="title-sidebar text-uppercase">Lịch sử khám</h4>
            <table>
              <thead>
                <tr>
                  <th className="col-history" scope="col">
                    Tên DV
                  </th>
                  <th className="col-history" scope="col">
                    Ngày Khám
                  </th>
                  <th className="col-history" scope="col">
                    Đối Tượng
                  </th>
                  <th className="col-history" scope="col">
                    BS khám
                  </th>
                  <th className="col-history" scope="col">
                    Phòng khám
                  </th>
                  <th className="col-history" scope="col">
                    Mã DV
                  </th>
                  <th className="col-history" scope="col">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.patientHistories &&
                this.props.patientHistories.length ? (
                  this.props.patientHistories.map(
                    (patientsHistoryItem, index) => {
                      //
                      const date = new Date(patientsHistoryItem.actDate).format(
                        'dd/MM/yyyy',
                      );
                      return (
                        <tr key={index}>
                          <td className="col-history espilist-text">
                            <span title={patientsHistoryItem.serviceName}>
                              {patientsHistoryItem.serviceName}
                            </span>
                          </td>
                          <td className="col-history">{date}</td>
                          <td className="col-history">
                            {patientsHistoryItem.patientType === 1
                              ? 'Không BHYT'
                              : 'BHYT'}
                          </td>
                          <td className="col-history">
                            {patientsHistoryItem.doctorName}
                          </td>
                          <td className="col-history espilist-text">
                            <span title={patientsHistoryItem.roomName}></span>
                          </td>
                          <td className="col-history">
                            {patientsHistoryItem.value}
                          </td>
                          <td className="col-history">
                            {patientsHistoryItem.status === 10
                              ? 'Đã in phiếu'
                              : patientsHistoryItem.status === 20
                              ? 'Chờ tiếp đón'
                              : patientsHistoryItem.status === 30
                              ? 'Đăng ký'
                              : patientsHistoryItem.status === 40
                              ? 'Chờ tiếp nhận'
                              : patientsHistoryItem.status === 50
                              ? 'Đợi khám'
                              : patientsHistoryItem.status === 60
                              ? 'Bỏ qua'
                              : patientsHistoryItem.status === 70
                              ? 'Đã bàn giao'
                              : patientsHistoryItem.status === 80
                              ? 'Đã lấy mẫu'
                              : patientsHistoryItem.status === 100
                              ? 'Trả lại mẫu'
                              : patientsHistoryItem.status === 110
                              ? 'Đã tiếp nhận'
                              : patientsHistoryItem.status === 120
                              ? 'Đang thực hiện DV'
                              : patientsHistoryItem.status === 130
                              ? 'Đợi kết luận'
                              : patientsHistoryItem.status === 140
                              ? 'Hoàn thành khám'
                              : patientsHistoryItem.status === 150
                              ? 'Đã có kết quả'
                              : patientsHistoryItem.status === 300
                              ? 'Y/c hủy'
                              : patientsHistoryItem.status === 300
                              ? 'Đã hủy'
                              : null}
                          </td>
                        </tr>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <td colSpan="7">Chưa có lịch sử khám</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    patientHistories:
      state.reception && (state.reception.patientHistories || []),
  };
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  RightSideBar,
);
