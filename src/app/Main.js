import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';
import GlobalStyle from 'global-styles';
import Login from 'containers/login';
import keyEventProvider from 'data-access/keyevent-provider';
import { handleKeyUp } from './utils';
import AppPrimary from '../containers/AppPrimary';

window.postMessageAndHandleClick = function(action, onOK, onCancel) {
  this.handleOK = onOK;
  this.handleCancel = onCancel;
  window.postMessage(action);
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.events = [
    //   'load',
    //   'mousemove',
    //   'mousedown',
    //   'click',
    //   'scroll',
    //   'keypress',
    // ]
    // this.warn = this.warn.bind(this)
    // this.resetTimeout = this.resetTimeout.bind(this)

    // for (var i in this.events) {
    //   window.addEventListener(this.events[i], this.resetTimeout)
    // }

    // this.setTimeout()

    
    // let dataCounter = dataCacheProvider.read(
    //   '',
    //   constants.key.storage.current_counter,
    //   null,
    //   true,
    // );
    // let last_time = dataCacheProvider.read(
    //   '',
    //   constants.key.storage.last_action_time,
    //   null,
    //   true,
    // );

    // this.props.dispatch({
    //   type: constants.action.action_select_counter,
    //   value: dataCounter,
    // });
    // this.props.dispatch({
    //   type: constants.action.action_last_time,
    //   value: last_time,
    // });
  }
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown);
    document.addEventListener('keydown', this.handleKeyUpE);
    document.addEventListener('keyup', this._handleKeyUp);
    document.addEventListener('close', function() {});
  }

  handleKeyUpE = e => {
    const { layers } = this.props;
    handleKeyUp(e, layers);
  };

  // clearTimeout() {
  //   if (this.warnTimeout) clearTimeout(this.warnTimeout)

  //   if (this.logoutTimeout) clearTimeout(this.logoutTimeout)
  // }

  // setTimeout() {
  //   this.warnTimeout = setTimeout(this.warn, 3600000)
  // }

  // resetTimeout() {
  //   this.clearTimeout()
  //   this.setTimeout()
  // }

  // warn() {
  //   if (window.location.pathname == '/login') {
  //     return false;
  //   } else {
  //     let param = JSON.parse(localStorage.getItem('isofh'));
  //     localStorage.removeItem('_CURRENT_USER_EMR');
  //     localStorage.removeItem('_CURRENT_COUNTER');
  //     localStorage.removeItem('_CURRENT_TOKEN_ROLE');
  //     window.location.href = '/login';
  //   }
  // }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  _handleKeyDown = event => {
    // this.saveLastTimeAction()
    let keycode = event.keyCode;
    switch (keycode) {
      case 18:
        keyEventProvider.altDown = true;
        break;
      case 17:
        keyEventProvider.ctrlDown = true;
        break;
      case 16:
        keyEventProvider.shiftDown = true;
      case 91:
        keyEventProvider.windowsDown = true;
        break;
    }

    let func = keyEventProvider.getFunction(keycode, 'keydown');
    if (func) {
      if (!func()) {
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    }
  };
  _handleKeyUp = event => {
    let keycode = event.keyCode;
    switch (keycode) {
      case 18:
        keyEventProvider.altDown = false;
        break;
      case 17:
        keyEventProvider.ctrlDown = false;
        break;
      case 16:
        keyEventProvider.shiftDown = false;
      case 91:
        keyEventProvider.windowsDown = false;
        break;
    }
    let func = keyEventProvider.getFunction(keycode, 'keyup');
    if (func) {
      if (!func()) {
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    }
  };
  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  //   saveLastTimeAction() {
  //     let lat_time = new Date().getTime()
  //     this.props.dispatch({ type: constants.action.action_last_time, value: lat_time })
  //     dataCacheProvider.save("", constants.key.storage.last_action_time, lat_time, true)
  // }

  // activeElement(){

  //     this.saveLastTimeAction()
  // }
  render() {
    return (
      <div id="app" className="App" ref={ref => (this.EMRWrapper = ref)}>
        <BrowserRouter>
          <div>
            {/* {['/login', '/dang-nhap'].map((item, index) => (
              <Route key={index} exact path={item} component={Login} />
            ))} */}
            {/* <Route exact path="/user/role" component={SelectRoleScreen} /> */}
            {['/', '/admin', '/admin/:function', '/admin/:function/:id'].map(
              (item, index) => (
                <Route key={index} exact path={item} component={AppPrimary} />
              ),
            )}
          </div>
        </BrowserRouter>
        <GlobalStyle />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userApp: state.global.userApp,
    tokenRole: state.global.userApp.loginToken,
  };
}

export default connect(mapStateToProps)(Main);
