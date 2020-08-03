import React from 'react';

import './App.css';
import AuthPage from './Auth/AuthPage';
import Admin from './Dashboard/Admin/Admin';

import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as AuthActions from  './Store/Actions/Auth';


class App extends React.Component {

  render (){
    let Routes;
    if(this.props.isAuth){
      // Auth  user
      Routes = (
        <Switch>
          <Route path='/logout' render={() => { this.props.logout(); return null; }} />
          <Route path='/home' component={Admin} />
          <Redirect to='/home' />
        </Switch>
      )
    }else{
      Routes = (
        <Switch>
          <Route path ='/user/signup' render={() => <AuthPage isSignup={true} />}/>
          <Route path ='/user/signin' render={() => <AuthPage />} />
          <Route path ='/admin/signup' render={() => <AuthPage isSignup={true} isAdmin ={true} />}/>
          <Route path ='/admin/signin' render={() => <AuthPage isAdmin ={true} />} />
          <Redirect to='/user/signin' />
        </Switch>
      )
    }

    return (
      <div className="App">
        {Routes}
      </div>
    );
  }

  componentDidMount(){
    this.props.checkAuth()
  }

}

const mapPropsToState = state => {
  return {
    isAuth : state.auth.auth
  }
}

const mapPropsToDisPatch = dispatch => {
  return {
    checkAuth : () => dispatch(AuthActions.AuthCheckAsync()),
    logout : () => dispatch(AuthActions.AuthLogout())
  }
}

export default connect(mapPropsToState,mapPropsToDisPatch)(App);
