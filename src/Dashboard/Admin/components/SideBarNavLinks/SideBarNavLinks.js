import React, { Component } from 'react'
import classes from './SideBarNavLinks.module.css'
import { NavLink } from 'react-router-dom'

const SideBarNavLinks = props => {

    const AdminLinks =[{
        name : 'Home',
        path : '/home'
    },
    {
        name : 'Create Auction',
        path : '/home/create-auction'
    },
    ]

    const UserLinks = [{
        name : 'Home',
        path : '/home'
    },
    {
        name : 'My players',
        path : '/home/players'
    },]

    const links = props.isAdmin ? AdminLinks : UserLinks;
    return (
        links.map((link,index) => {
            return <NavLink key={index} to={link.path} activeClassName={classes['active']} exact>{link.name}</NavLink>
        })
    )
}



export default SideBarNavLinks;
