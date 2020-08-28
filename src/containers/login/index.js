import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import userProvider from 'data-access/user-provider';
import dataCacheProvider from 'data-access/datacache-provider';
import keyEventProvider from 'data-access/keyevent-provider';
import constants from 'resources/strings';
import { setDepartmentId } from 'containers/reception/actions';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      isSaveAcc: false,
    };
    this.changeUserNameChecked = this.changeUserNameChecked.bind(this);
  }

  componentWillMount() {
    keyEventProvider.unregister(13, this);
    this.checkUserLogin();
  }

  checkUserLogin() {
    if (this.props.userApp.isLogin) {
      if (this.props.userApp.role) window.location.href = '/admin/tiep-don';
      else window.location.href = '/user/role';
    }
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const usernameOrEmail = rememberMe
      ? localStorage.getItem('usernameOrEmail')
      : '';
    this.setState({ usernameOrEmail, rememberMe }, () => {
      this.userName.focus();
      keyEventProvider.register(13, this, () => {
        this.login();
      });
    });
  }

  handleChange = event => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  changeUserNameChecked = event => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };
  login() {
    // this.props.history.push("/user/role");
    // return;
    
    const { usernameOrEmail, password } = this.state;

    userProvider
      .login(usernameOrEmail.trim(), password.trim())
      .then(s => {
        switch (s.code) {
          case 0:
            keyEventProvider.unregister(13, this);
            this.props.dispatch({
              type: constants.action.action_user_login,
              value: s.data,
            });
            const { usernameOrEmail, rememberMe } = this.state;
            localStorage.setItem('rememberMe', rememberMe);
            localStorage.setItem(
              'usernameOrEmail',
              rememberMe ? usernameOrEmail : '',
            );

            dataCacheProvider
              .save('', constants.key.storage.current_account, s.data)
              .then(s1 => {
                if (
                  this.props.userApp.currentUser.departments &&
                  this.props.userApp.currentUser.roles
                ) {
                  if (
                    this.props.userApp.currentUser.departments.length == 1 &&
                    this.props.userApp.currentUser.roles.length == 1
                  ) {
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
                    let department = departments[0];
                    let roleId1 = roles[0];
                    this.props.dispatch({
                      type: constants.action.action_user_chose_role,
                      value: roleId1,
                    });
                    this.props.dispatch({
                      type: constants.action.action_user_department,
                      value: department,
                    });
                    const tokenSelectRole = s.data.authentication.accessToken;
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
                        constants.key.storage.current_role,
                        roleId1,
                      ),
                    ]).then(values => {
                      this.props.history.push('/admin/tiep-don');
                    });
                  } else {
                    this.props.history.push('/user/role');
                  }
                }

                // }
              });
            break;
          case 1000:
            toast.error('Tài khoản không hợp lệ !', {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;
          case 1001:
            toast.error('Mật khẩu không hợp lệ ', {
              position: toast.POSITION.TOP_RIGHT,
            });
            break;

          default:
            toast.error('Đăng nhập không thành công!', {
              position: toast.POSITION.TOP_RIGHT,
            });
        }
      })
      .catch(e => {});
  }

  render() {
    const { password } = this.state;

    return (
      <div className="login-his tb">
        <div className="table-cell">
          <div className="login-form">
            <div className="head-login">
              <a href="#" className="logo-login">
                <img src="images/logo-login.png" alt="" />
              </a>
              <h2 className="title-login">BỆNH VIỆN DEMO ISOFH</h2>
            </div>
            <div className="login-inner">
              <div className="title-form-login">
                <img src="images/user-icon.png" alt="" />
                <h4>Đăng nhập</h4>
              </div>
              <div className="input-item">
                <label htmlFor="" className="label-input">
                  Tài khoản
                </label>
                <div className="input-inner">
                  <input
                    ref={ref => (this.userName = ref)}
                    name="usernameOrEmail"
                    value={this.state.usernameOrEmail}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Tài Khoản"
                  />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="" className="label-input">
                  Mật khẩu
                </label>
                <div className="input-inner">
                  <input
                    type="password"
                    value={password}
                    onChange={event =>
                      this.setState({ password: event.target.value })
                    }
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                  />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="" className="label-input">
                  Nhớ tài khoản
                </label>
                <div className="input-inner">
                  <div className="checkbox-login">
                    <div className="checkbox-style">
                      {/* <input onChange={this.changeUserNameChecked} checked={this.state.isSaveAcc} type="checkbox"/> */}
                      <input
                        name="rememberMe"
                        checked={this.state.rememberMe}
                        onChange={this.handleChange}
                        id="checked-join1"
                        className="checkbox"
                        type="checkbox"
                      />
                      <label
                        htmlFor="checked-join1"
                        className="after-checkbox"
                      ></label>
                    </div>
                    {/* <span className="label-check">Nhớ tài khoản</span> */}
                  </div>
                </div>
              </div>
              <div className="action text-right">
                <button
                  onClick={() => {
                    this.login();
                  }}
                  className="btn btn-login"
                >
                  Ok
                </button>
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
  };
}
const mapDispatch = dispatch => ({
  
  setDepartmentId: data => dispatch(setDepartmentId(data)),
  dispatch,
});
export default connect(mapStateToProps, mapDispatch, null, {
  forwardRef: true,
})(Login);
