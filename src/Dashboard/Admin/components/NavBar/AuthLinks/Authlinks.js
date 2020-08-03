import React from 'react';
import classes from './AuthLinks.module.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as AuthActions from '../../../../../Store/Actions/Auth';


const AuthLink = props => {

    const links = [
    {
        name : "Logout",
        path : "/logout",
        
    }]

    return (
        links.map((lin,index) => {
            return (
                <NavLink key={index} className={classes['auth-link']} to={`${lin.path}`}  >{lin.name}</NavLink>
            )
        })
    )
}



export default AuthLink;
