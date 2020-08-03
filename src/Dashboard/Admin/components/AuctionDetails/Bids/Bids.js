import React from 'react';
import PropTypes from 'prop-types';
import classes from './Bids.module.css';
import BidsItem from './BidsItem/BidsItem';

const Bids = props => {
    const classStyle = classes['bid-heading'];
    
    return (
        <div className={classes['bids']}>
            <div className={classes['bids-heading']}>
                {props.isAdmin ? <p>Team Name</p> : null}
                <p>Date</p>
                <p>Time</p>
                <p>Amount</p>
            </div>
            {props.bids.map((bid,index) => <BidsItem isAdmin={props.isAdmin} {...bid} key={bid.id} index={index} />)}
        </div>
    )
}

Bids.propTypes = {

}

export default Bids
