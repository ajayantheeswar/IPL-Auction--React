import React from 'react'
import PropTypes from 'prop-types'
import classes from './BidsItem.module.css'

const BidsItem = props => {
    return (
        <div className={classes['bids-item']}>
            {props.isAdmin ? <p>{props.Name || 'Name'}</p> : null} 
            <p>{new Date(+props.Time).toDateString() || 'Date'}</p>
            <p>{new Date(+props.Time).toTimeString().split(' ')[0] || 'Date'}</p>
            <p>{'Rs. ' + props.Amount || 'Amount'}</p>
        </div>
    )
}

BidsItem.propTypes = {

}

export default BidsItem
