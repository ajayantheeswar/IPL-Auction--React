import React , {Component} from 'react';
import classes from './AuthPage.module.css';

import {iplLogo,show} from '../Assets/Images/index';
import { NavLink } from 'react-router-dom';

import * as AuthActions from '../Store/Actions/Auth';

import { connect } from 'react-redux'

import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';

class AuthPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            auth : {
                username : {
                    value : '',
                    valid : true,
                    error : null
                },
                email : {
                    value : '',
                    valid : true,
                    error : null
                },
                password : {
                    value : '',
                    valid : true,
                    error : null,
                    isShow : false
                }
            }
        }
    }

    togglePasswordShow  = () => {
        this.setState( (prevState) => {
            return {
                ...prevState,
                auth: {
                    ...prevState.auth,
                    password:{
                        ...prevState.auth.password,
                        isShow : !prevState.auth.password.isShow
                    }
                }
            }
        })
    }

    onValueChange = (event,id) => {
        const presentValues = {...this.state.auth[id]};
        presentValues.value = event.target.value;
        this.setState( (prev) => {
            return {
                ...prev,
                auth : {
                    ...prev.auth,
                    [id] : presentValues
                }
            }
        } )
    }

    onSignUpClick = () => {
        const credientials = {
            Name : this.state.auth.username.value,
            Email : this.state.auth.email.value,
            Password : this.state.auth.password.value,
            isAdmin : !!this.props.isAdmin,
            authType : 'EMP'
        }

        this.props.signUp(credientials);
    }

    onLoginClick = () => {
        const credientials = {
            Email : this.state.auth.email.value,
            Password : this.state.auth.password.value,
            isAdmin : !!this.props.isAdmin,
            authType : 'EMP'
        }

        this.props.signIn(credientials);
    }


    googleOnSuccess = (result) => {
        console.log(result);
        result.isAdmin =  !!this.props.isAdmin;
        result.AuthType = 'Google';
        result.Token = result.tokenId
        this.props.isSignup ? this.props.signUp(result) : this.props.signIn(result);
    }

    getProfileObject = (result) => result.profileObj;

    render () {
       
        return (
            <React.Fragment>
                <div className={classes['auth-head']} >
                    <img src={iplLogo} alt="logo"/>
                    <hr/>
                </div>
                <div className={classes['auth-tagline']}>
                    <h3>{this.props.isAdmin ? 'Admin' : null}</h3>
                    <h3>{this.props.isSignup ? 'Sign up to Sponsor' : 'Log in and Play'}</h3>
                    {this.props.isSignup ? <p>Already have an account  ? <span> <NavLink to={`/${this.props.isAdmin ? 'admin' : 'user'}/signin`}>Sign In</NavLink> </span></p> : <p>Don't have an account? <span><NavLink to={`/${this.props.isAdmin ? 'admin' : 'user'}/signup`}>Sign Up</NavLink></span></p>}
                </div>
                <div style={{margin:'auto', textAlign:'center'}}>
                    <GoogleLogin
                        clientId="GoogleTOKENID"
                        buttonText="Sign In With Google"
                        onSuccess={this.googleOnSuccess}
                        onFailure={this.googleOnFail}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <div className={classes['auth-content']} >
                    <div className={classes['credientials-form']}>
                        {this.props.isSignup ? <div className={classes['cred__item']}>
                            <label htmlFor='Username'>Username</label>
                            <input 
                            onChange={(event) => this.onValueChange(event,'username')}
                            type='text' value={this.state.auth.username.value} placeholder='Username' />
                        </div> :  null}
                        <div className={classes['cred__item']}>
                            <label htmlFor='email'>Email</label>
                            <input 
                            onChange={(event) => this.onValueChange(event,'email')}
                            type='text' value={this.state.auth.email.value} placeholder='Email' />
                        </div>
                        <div className={[classes['cred__item'],classes['password']].join(' ')} >
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <label htmlFor='password' placeholder='password'>Password</label>
                                <div className={classes['show-password']} onClick={this.togglePasswordShow}>
                                    <img src={show} alt='show' />
                                    <p>{!this.state.auth.password.isShow ? 'Show' : 'Hide'}</p>
                                </div>
                            </div>
                            <input
                                onChange={(event) => this.onValueChange(event,'password')}
                                value={this.state.auth.password.value}
                                type={this.state.auth.password.isShow ? 'text' : 'password'}
                                placeholder='Password' />
                        </div>
                        {!this.props.isSignup ? <p className={classes['forget']}>Forget ?</p> : null}
                        {this.props.error ? <p className={classes['auth-error']}>{this.props.error}</p> : null}
                    </div>
                <button
                 onClick={this.props.isSignup ? this.onSignUpClick : this.onLoginClick}
                 className={classes['auth-main-action']}>{this.props.isSignup ? 'Sign Up with Email' : 'Login'}</button>
                <div className={classes['auth-admin--user']}>
                    {this.props.isAdmin ? <NavLink to="/user/signin">Click here to Visit User AuthPage</NavLink>
                        : <NavLink to="/admin/signin">Click here to Visit Admin AuthPage</NavLink>
                    }
                </div>  
                </div>
                                
            </React.Fragment>
            
        )
    }

}

const mapPropsToState = state => {
    return {
      isAuth : state.auth.isAuth,
      error : state.auth.error
    }
  }
  
  const mapPropsToDisPatch = dispatch => {
    return {
      signIn : (credientials) => dispatch(AuthActions.AuthStartAsync(false,credientials)),
      signUp : (credientials) => dispatch(AuthActions.AuthStartAsync(true,credientials)),
    }
  }

export default connect(mapPropsToState,mapPropsToDisPatch)(AuthPage);


