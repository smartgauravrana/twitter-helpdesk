import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Route, useHistory, Switch } from 'react-router';

import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import Auth from "pages/Auth";
import Home from 'pages/Home';
import LoginTwitter from 'components/LoginTwitter';

// redux actions
import { getCurrentUser } from 'redux/modules/auth';

import "./App.scss";

function App({
  getCurrentUser,
  auth
}) {

  const history = useHistory();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const { user, isFetching } = auth;

  return !isFetching ? (<div>
    <div className="Container">
      <Header user={auth.user} />
      {user._id && !user.organisationId.accessToken && <LoginTwitter/>}
      <div className="Content">
        <Switch>
          <Route path='/auth' component={Auth} exact />
          <PrivateRoute path='/' component={Home} history={history} exact />
        </Switch>

        {/* {!user._id ? <Auth /> :
          <Home />} */}
      </div>
    </div>
  </div>) : <div>Loading...</div>
};

export default connect(({
  auth
}) => ({
  auth
}), {
  getCurrentUser
})(App)