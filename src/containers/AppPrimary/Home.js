import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Main, AppBody } from './styled';
import { isEmpty } from 'lodash';
import history from 'utils/history';
// routes config
import routes from './routes';
import AppHeader from 'components/Layout/AppHeader';
import { RootModal } from 'components/Modal/RootModal';
import AppFooter from 'components/Layout/AppFooter';
import dataCacheProvider from 'data-access/datacache-provider';
import constants from 'resources/strings';
import clientUtils from 'utils/client-utils';
import { getUrlParameter } from 'app/utils';
import { selectTokenWithUserNotLogin } from './selectors';

class Home extends Component {
  componentDidMount() {
    const { userApp, getUserInfo, location } = this.props;
    if (!userApp.isLogin) {
      const token = getUrlParameter('token', location);
      if (token) { // token from param
        this.saveAccessTokenToApp(token);
      } else if (
        dataCacheProvider.read('', constants.key.storage.current_tokenRole)
      ) {
        getUserInfo(); // check token expire :))
      } else {
        this.handleSso(this.props);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userApp, token } = nextProps;
    if (this.props.userApp.isLogin !== userApp.isLogin && !userApp.isLogin) {
      // when logout
      this.handleSso(nextProps);
    }

    if (!isEmpty(token) && !userApp.isLogin) {
      // when token get from api getTokenFromCode by 'code' on param
      this.saveAccessTokenToApp(token, true);
    }
  }

  handleSso(currentProps) {
    const { location } = currentProps;
    const code = getUrlParameter('code', location);
    const urlRedirect = window.location.origin;
    if (!code) {
      // if (this.props.match.params.id) {
      const urlUTF16Base64 = encodeURIComponent(
        location.pathname + location.search,
      );
      if (typeof window !== 'undefined') {
        window.location.href = `${process.env.REACT_APP_SSO_URL}oauth/authorize?client_id=isofh&response_type=code&redirect_uri=${urlRedirect}&state=${urlUTF16Base64}`;
      }
      // } else {
      //   // history.push('/login');
      // }
    } else {
      this.props.getTokenFromCode({ code, urlRedirect });
    }
  }

  saveAccessTokenToApp(token, tokenFromApi) {
    dataCacheProvider.save('', constants.key.storage.current_tokenRole, token);
    clientUtils.auth = token;
    this.props.dispatch({
      type: constants.action.action_get_token_role,
      value: token,
    });
    if (tokenFromApi) {
      const state = getUrlParameter('state', this.props.location);
      const urlDecodedString = decodeURIComponent(state);
      this.props.history.push(urlDecodedString);
      window.location.href = urlDecodedString;
    } else {
      const id = getUrlParameter('id', this.props.location);
      history.push(`/admin/ho-so-benh-an/${id}`);
    }
    window.location.reload();
  }

  render() {
    // let menus = this.getMenu();
    return (
      <BrowserRouter>
        <Main>
          <AppHeader />
          <Switch>
            <AppBody>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props} />}
                  />
                ) : null;
              })}
            </AppBody>
          </Switch>

          <AppFooter />
          <RootModal />
        </Main>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    userApp: state.global.userApp,
    token: selectTokenWithUserNotLogin(state),
  };
}

export default connect(mapStateToProps)(Home);
