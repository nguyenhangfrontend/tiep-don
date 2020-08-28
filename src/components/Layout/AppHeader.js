import React from 'react';
import { connect } from 'react-redux';
import Logo from 'resources/svg/logo.svg';
import UserIcon from 'resources/svg/user.svg';
import Popover from 'components/Popover';
import { NavLink, withRouter } from 'react-router-dom';
import { Header } from './styled';

const allMenus = [
  // {
  //   name: 'Tiếp đón',
  //   url: '/admin/tiep-don',
  //   icon: 'icon-speedometer',
  //   imgUrl: '/icon/ic-profile-bold.svg',
  //   classActiveStyle: 'info-member',
  // },
  {
    name: 'Hồ sơ bệnh án',
    url: '/admin/ho-so-benh-an',
    icon: 'icon-speedometer',
    imgUrl: '/icon/ic-profile-bold.svg',
    classActiveStyle: 'info-member',
  },
  // {
  //   name: 'Danh mục giấy tờ',
  //   url: '/admin/scan-benh-an',
  //   icon: 'icon-speedometer',
  //   imgUrl: '/icon/ic-profile-bold.svg',
  //   classActiveStyle: 'info-member',
  // },
];
class AppHeader extends React.Component {
  state = { currentPath: this.props.location.pathname };

  handleLogOut = () => {
    localStorage.removeItem('_CURRENT_USER_EMR');
    localStorage.removeItem('_CURRENT_COUNTER');
    localStorage.removeItem('_CURRENT_TOKEN_ROLE');
    localStorage.removeItem('counter');
    window.location.href = `${process.env.REACT_APP_SSO_URL}logout?redirect_uri=${window.location.origin}/admin/ho-so-benh-an`;
  };

  setCurrentPath = path => () => {
    this.setState({ currentPath: path });
  };

  render() {
    const { userApp } = this.props;
    const { currentUser } = userApp;
    const { username, department } = currentUser || {};
    const { currentPath } = this.state;

    return (
      <Header className="container-fluid">
        <div className="row  flex-container">
          <div className="col-md-1 app-logo">
            <Logo />
          </div>

          <div className="col-md-7">
            <div className={'app-menu'}>
              {allMenus.map(item => (
                <NavLink
                  key={item.url}
                  className={`app-menu-item ${
                    currentPath === item.url ? 'active' : ''
                  }`}
                  to={item.url}
                  onClick={this.setCurrentPath(item.url)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="app-menu-right">
              <span className={'hospital-name'}>{'BỆNH VIỆN DEMO ISOFH'}</span>
              <div className="info-user">
                <span className="user-info-item">
                  {(department && department.name) || ''}
                </span>
                {department && department.name ? '|' : ''}
                <span className="user-info-item">{username}</span>
                <Popover
                  position={'bottom-right'}
                  content={
                    <div className="menu-user" onClick={this.handleLogOut}>
                      {'Đăng xuất'}
                    </div>
                  }
                >
                  <UserIcon />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  userApp: state.global.userApp,
  last_time: state.global.last_time,
  role_id: state.global.userApp.role,
});

export default connect(mapStateToProps)(withRouter(AppHeader));
