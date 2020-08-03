import React, { Component } from 'react'
import classes from './DropDown.module.css';

export default class DropDown extends Component {
    render() {
        return (
            <div className={classes['drop-down']} onClick={this.props.onInsideClick}> 
                {this.props.children}
            </div>
        )
    }
}
