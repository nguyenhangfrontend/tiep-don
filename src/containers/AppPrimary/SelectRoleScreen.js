import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Selects from 'react-select';
import userProvider from 'data-access/user-provider';
import keyEventProvider from 'data-access/keyevent-provider';
import { ToastContainer, toast } from 'react-toastify';
import dataCacheProvider from 'data-access/datacache-provider';
import constants from 'resources/strings';
import receiveProvider from 'data-access/receive-provider';

import WithRoot from './WithRoot';
class SelectRoleScreen extends Component {
  constructor(props) {
    super(props);
    let departments =
      this.props.userApp.currentUser &&
      (this.props.userApp.currentUser.departments
        ? this.props.userApp.currentUser.departments
        : []
      ).map(item => {
        return { value: item.id, label: item.name };
      });

    let roles =
      this.props.userApp.currentUser &&
      (this.props.userApp.currentUser.roles
        ? this.props.userApp.currentUser.roles
        : []
      ).map(item => {
        return { value: item.id, label: item.name };
      });
    this.state = {
      roles,
      departments,
      // selectedRole: roles,
      // selectedDepartment: departments
    };
    this.changeRole = this.changeRole.bind(this);
    this.changeDepartments = this.changeDepartments.bind(this);
  }
  componentWillMount() {
    if (!this.props.userApp.isLogin) {
      window.location.href = '/login';
    }

    //  else if (this.props.userApp.isLogin) {
    //     if (this.props.userApp.role) {
    //         window.location.href = "/admin/tiep-don";
    //     }
    // }
  }
  componentDidMount() {
    this.role.focus();
    keyEventProvider.register(13, this, () => {
      this.goAdmin();
    });

    this.loadRoleDepartment();
  }

  loadRoleDepartment() {
    let listRoles = this.props.userApp.currentUser.roles;
    let listDepartments = this.props.userApp.currentUser.departments;
    let localRole1 = this.props.userApp.role ? this.props.userApp.role : null;
    let localDepartment1 = this.props.userApp.department
      ? this.props.userApp.department
      : null;

    let localRole, localDepartment;
    if (
      listRoles &&
      localRole1 &&
      listRoles.find(item => item.id === localRole1.value)
    ) {
      localRole = localRole1;
    } else {
      localRole = this.state.roles ? this.state.roles[0] : null;
    }

    if (
      listDepartments &&
      localDepartment1 &&
      listDepartments.find(item => item.id === localDepartment1.value)
    ) {
      localDepartment = localDepartment1;
    } else {
      localDepartment = this.state.departments
        ? this.state.departments[0]
        : null;
    }

    this.props.dispatch({
      type: constants.action.action_user_chose_role,
      value: localRole,
    });
    this.props.dispatch({
      type: constants.action.action_user_department,
      value: localDepartment,
    });
    dataCacheProvider.save(
      '',
      constants.key.storage.current_role,
      localRole,
      true,
    );
    dataCacheProvider.save(
      '',
      constants.key.storage.current_department,
      localDepartment,
      true,
    );
  }
  componentWillUnmount() {
    keyEventProvider.unregister(13, this);
  }
  changeRole(event) {
    const counterSinggle = event.value;
    this.setState(
      {
        roleId: event,
        counterSinggle,
      },
      () => {
        const roleId = this.state.roleId;
        this.props.dispatch({
          type: constants.action.action_user_chose_role,
          value: roleId,
        });
        dataCacheProvider.save(
          '',
          constants.key.storage.current_role,
          roleId,
          true,
        );
      },
    );
  }

  handlelogOut = event => {
    let param = JSON.parse(localStorage.getItem('isofh'));
    localStorage.clear();
    window.location.href = '/login';
  };
  changeDepartments(selectedDepartment) {
    // this.setState({
    //     serviceError: "",
    //     doctorVendorError: ""
    // },

    this.setState(
      {
        serviceError: '',
        labelServiceError: true,
        selectedDepartment,
        validService: true,
      },
      () => {
        // if ((this.state.selectedDepartment || []).length == 0) {
        //     this.setState({ serviceError: true, labelServiceError: false, validService: false })
        //     return
        // }
        const department =
          this.state.departments.length > 0
            ? this.state.selectedDepartment
              ? this.state.selectedDepartment
              : this.state.departments[0]
            : null;
        this.props.dispatch({
          type: constants.action.action_user_department,
          value: department,
        });
        dataCacheProvider.save(
          '',
          constants.key.storage.current_department,
          department,
          true,
        );
      },
    );
  }

  goAdmin(e) {
    this.setState({
      labelServiceError: true,
      labelDoctorError: true,
      labelStartTimeError: true,
      labelEndTimeError: true,
    });
    const roleId1 =
      this.state.roles.length > 0
        ? this.state.roleId
          ? this.state.roleId
          : this.state.roles[0]
        : null;
    const department =
      this.state.departments.length > 0
        ? this.state.selectedDepartment
          ? this.state.selectedDepartment
          : this.state.departments[0]
        : null;
    const departmentId =
      this.state.departments.length > 0
        ? this.state.selectedDepartment
          ? this.state.selectedDepartment.value
          : this.state.departments[0].value
        : null;

    const roleId =
      this.state.roles.length > 0
        ? this.state.roleId
          ? this.state.roleId.value
          : this.state.roles[0].value
        : null;

    const temp = { departmentId, roleId };
    userProvider.selectRole(temp).then(res => {
      //    if(res.code == 0){
      //
      //    }

      switch (res.code) {
        case 0:
          keyEventProvider.unregister(13, this);
          const tokenSelectRole = res.data.authentication.accessToken;
          this.props.dispatch({
            type: constants.action.action_user_login,
            value: res.data,
          });

          this.props.dispatch({
            type: constants.action.action_user_chose_role,
            value: roleId1,
          });
          this.props.dispatch({
            type: constants.action.action_get_token_role,
            value: tokenSelectRole,
          });

          Promise.all([
            dataCacheProvider.save(
              '',
              constants.key.storage.current_tokenRole,
              tokenSelectRole,
            ),
            dataCacheProvider.save(
              '',
              constants.key.storage.current_department,
              department,
            ),
            dataCacheProvider.save(
              '',
              constants.key.storage.current_department,
              department,
            ),
            dataCacheProvider.save(
              '',
              constants.key.storage.current_role,
              roleId1,
            ),
          ]).then(values => {});
          this.props.history.push('/admin/tiep-don');
          break;
        case 1002:
          toast.error('User không tồn tại role đã chọn !', {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;
        case 1003:
          toast.error('không tồn tại khoa đã chọn', {
            position: toast.POSITION.TOP_RIGHT,
          });
          break;

        default:
          toast.error('Lỗi server', {
            position: toast.POSITION.TOP_RIGHT,
          });
      }
    });
  }
  render() {
    const { department, role_id } = this.props.department || '';
    return (
      <div>
        {/* <button onClick={() => {
                    this.props.history.push("/admin")
                }}>go</button> */}
        <div className="login-his tb">
          <div className="table-cell">
            <div className="login-form">
              <div className="head-login">
                <a href="#" className="logo-login">
                  <img src="images/logo-login.png" alt="" />
                </a>
                <h2 className="title-login">Bệnh Viện Đại Học Y Hà Nội</h2>
              </div>
              <div className="login-inner">
                <div className="input-item">
                  <label htmlFor="" className="label-input">
                    Role
                  </label>
                  <div className="input-inner">
                    <Selects
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#d8f0fa',
                          primary: '#1985d9',
                        },
                      })}
                      style={{ width: '100%', marginTop: 8 }}
                      inputProps={{ name: 'selectRole', id: 'selectRole' }}
                      displayEmpty
                      onChange={event => this.changeRole(event)}
                      value={role_id}
                      defaultValue={this.state.roles[0]}
                      className={
                        this.state.serviceError
                          ? 'normal-input error-input row-right'
                          : 'normal-input row-right'
                      }
                      options={this.state.roles}
                      ref={ref => (this.role = ref)}
                    />
                  </div>
                </div>
                <div className="input-item">
                  <label htmlFor="" className="label-input">
                    Khoa
                  </label>
                  <div className="input-inner">
                    <Selects
                      ref={el => (this.myFormRef = el)}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: '#03a9f44f',
                          primary: '#1a2b33',
                        },
                      })}
                      style={{ width: '100%', marginTop: 8 }}
                      inputProps={{ name: 'selectRole', id: 'selectRole' }}
                      displayEmpty
                      // defaultValue={this.state.departments[0]}
                      value={department}
                      onChange={this.changeDepartments}
                      className={
                        this.state.serviceError
                          ? 'normal-input error-input row-right'
                          : 'normal-input row-right'
                      }
                      options={this.state.departments}
                    />
                  </div>
                </div>

                <div className="action text-right">
                  <button
                    onClick={() => {
                      this.goAdmin();
                    }}
                    className="btn btn-primary"
                  >
                    Ok
                  </button>
                  <button
                    onFocus={() => {
                      keyEventProvider.unregister(13, this);
                    }}
                    onClick={() => {
                      this.handlelogOut();
                    }}
                    className="btn btn-default"
                  >
                    hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userApp: state.global.userApp,
    role_id: state.global.userApp.role,
    department: state.global.userApp.department,
  };
}
export default connect(mapStateToProps)(WithRoot(SelectRoleScreen));
