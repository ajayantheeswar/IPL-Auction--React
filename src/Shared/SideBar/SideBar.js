import React, { Component } from 'react';
import classes from './SideBar.module.css'

export default class SideBar extends Component {
    render() {

        const visible = classes['side-bar'] + ' ' + classes['visible']

        return (
            <React.Fragment>
                {this.props.isSideMenuOpen ? <div className={classes['backdrop']}></div> : null}
                <div className={this.props.isSideMenuOpen ? visible : classes['side-bar']}>
                    {this.props.children}
                </div>
            </React.Fragment>
            
        )
    }
}
