import React , {useState} from 'react';
import classes from './Navbar.module.css';

import {iplLogo,down,menu,xMark} from '../../../../Assets/Images/index'
import AuthLinks from './AuthLinks/Authlinks';
import DropDown from '../../../../Shared/DropDown/DropDown';

const Navbar = props => {

    const [isDropDownOpen, setDropDownOpen] = useState(false)
    return (
        <div className={classes['nav-bar']}>
            <div className={classes["navbar-main"]}>
                <img src={iplLogo} alt=""/>
            </div>
            <div className={classes["navbar-auth__controls"]}
                 onBlur={() => setDropDownOpen(false)} 
                 onClick={() => setDropDownOpen(!isDropDownOpen)} >
                <p>{localStorage.getItem('name')}</p>
                <img src={down} alt="down" />
                {isDropDownOpen ? 
                <DropDown onInsideClick={() => setDropDownOpen(false)}>
                    <AuthLinks />
                </DropDown> :
                null
                }
            </div>
            <div className={classes['bar-menu']} onClick={props.onMenubarClicked}>
                {<img src={props.isSideMenuopen ? xMark : menu } alt="menu" /> }
            </div> 
        </div>
    );
}

export default Navbar;