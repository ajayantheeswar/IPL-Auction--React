import React from 'react';
import classes from './AuctionItem.module.css';

import { profile } from '../../../../../Assets/Images/index';

const AuctionItem = props => {

    let image = profile;

    let timeClass = props.IsSold ? [classes['auction-remaining-time'] , classes['sold']].join(' ') : classes['auction-remaining-time'];

    if(props.profile !== 'null'){
        image = props.Profile
    }

    if(props.isSold){

    }

    return (
        <div className={classes['auction-item']} onClick={() => props.onClickBanner && props.onClickBanner()}>
            <img src={image} alt="img"/>
            <div className={classes['auction-preview-details']}>
                <p>{props.Name || "Muhammad Ali Pattodi"}</p>
                <p>{props.Role || "Batsman"}</p>
                <p>{props.Country || "India"}</p>
            </div>
            {!props.historyComponent ? <div className={timeClass}>{props.IsSold ? 'Ended' : `Ends on ${new Date(+props.End).toDateString()}` }</div> : null}
        </div>
    )
}

export default AuctionItem;