import React from 'react'
import classes from './EmptyResult.module.css';
import PropTypes from 'prop-types'

const EmptyResult = props => {
    return (
        <div className={classes['empty-result']}>
            <p>Sorry No Result Found !</p>
        </div>
    )
}

EmptyResult.propTypes = {

}

export default EmptyResult
