import React from 'react'
import PropTypes from 'prop-types'
import classes from './BidsItem.module.css'

const BidsItem = props => {
    return (
        <div className={classes['bids-item']}>
            {props.isAdmin ? <p>{props.name || 'Name'}</p> : null} 
            <p>{new Date(+props.time).toDateString() || 'Date'}</p>
            <p>{new Date(+props.time).toTimeString().split(' ')[0] || 'Date'}</p>
            <p>{'Rs. ' + props.amount || 'Amount'}</p>
        </div>
    )
}

BidsItem.propTypes = {

}

export default BidsItem
