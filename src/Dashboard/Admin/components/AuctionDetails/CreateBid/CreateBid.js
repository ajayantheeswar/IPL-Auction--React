import React from 'react';
import PropTypes from 'prop-types';

import classes from './CreateBid.module.css';

const CreateBid = props => {
    return (
        <div className={classes['create-bid']}>
            <input type='text' placeholder="Enter the Bid Amount" value={props.value} onChange={props.onValueChange} />
            <button onClick={props.onBid} >Confirm Bid</button>
        </div>
    )
}

CreateBid.propTypes = {

}

export default CreateBid
