import axios from '../Interceptor';
import * as actionTypes from './ActionTypes';

const AuthStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const AuthSuccess = () => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        isAdmin : localStorage.getItem('isAdmin')
    }
}

const AuthFail = (err) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error : err.error
    }
}

export const AuthStartAsync = (isSignup,authDetails) => dispatch => {

    let url =  `/${authDetails.isAdmin ? 'admin' : 'user'}/${isSignup ? 'signup' : 'signin'}`; 
    dispatch(AuthStart())
    console.log(authDetails);
    axios.post(url,{
        credientials: {
            ...authDetails
        }
    }).then(({data}) => {
            console.log(data);
            localStorage.setItem('token',data.Token);
            localStorage.setItem('name',data.user.name);
            localStorage.setItem('email',data.user.email);
            localStorage.setItem('isAdmin',authDetails.isAdmin);
            localStorage.setItem('authType',authDetails.authType);
            dispatch(AuthSuccess())
        })
        .catch(err => {
            console.log(err);
            dispatch(AuthFail(err.response.data))
        })
}

export const AuthCheckAsync = () => dispatch => {
    if(localStorage.getItem('token') && localStorage.getItem('name')){
        dispatch(AuthSuccess())
    }
}

export const AuthLogout = () => {
    localStorage.clear()
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}