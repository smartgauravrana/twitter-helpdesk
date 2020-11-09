import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';

function PrivateRoute(props){
  const {history, auth, ...rest } = props;
  useEffect(() => {
    console.log('props ', props)
    if(!auth.user._id){
      console.log("id:  ")
      history.replace('/auth');
    }
  }, []);
  return auth.user._id ? <Route {...rest}/>: null;
}

export default connect(({
  auth
}) => ({
  auth
}))(PrivateRoute);

