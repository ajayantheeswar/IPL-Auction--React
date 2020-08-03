import React from 'react';
import classes from './AuctionItem.module.css';

import { profile } from '../../../../../Assets/Images/index';

const AuctionItem = props => {

    let image = profile;

    let timeClass = props.isSold ? [classes['auction-remaining-time'] , classes['sold']].join(' ') : classes['auction-remaining-time'];

    if(props.profile !== 'null'){
        image = props.profile
    }

    if(props.isSold){

    }

    return (
        <div className={classes['auction-item']} onClick={() => props.onClickBanner && props.onClickBanner()}>
            <img src={image} alt="img"/>
            <div className={classes['auction-preview-details']}>
                <p>{props.name || "Muhammad Ali Pattodi"}</p>
                <p>{props.role || "Batsman"}</p>
                <p>{props.country || "India"}</p>
            </div>
            {!props.historyComponent ? <div className={timeClass}>{props.isSold ? 'Ended' : `Ends on ${new Date(+props.end).toDateString()}` }</div> : null}
        </div>
    )
}

export default AuctionItem;