import React from 'react'
import classes from './FormElement.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormElement = props => {
    
    switch(props.config.type){
        case 'input' : {
            return (
                <div className={classes['cred__item']}>
                    <label htmlFor={props.config.label}>{props.config.label}</label>
                    <input 
                    onChange={(event) => props.onValueChange(event,props.config.key)}
                    type='text' value={props.value} placeholder={props.config.label} />
                </div>
            )
        }
        case 'option' : {
            return (
                <div className={classes['cred__item']}>
                    <label htmlFor={props.config.label}>{props.config.label}</label>
                    <select 
                        onChange={(event) => props.onValueChange(event,props.config.key,props.config.type)}
                        value={props.value} >
                        {props.config.options.map((option,index) => {
                            return <option key={index} value={option}>{option === '' ? 'Select' : option}</option>
                        })}
                    </select>
                </div>
            )
        }
        case 'date' : {
            return (
                <div className={classes['cred__item']}>
                    <label htmlFor={props.config.label}>{props.config.label}</label>
                    <ReactDatePicker
                        selected={props.value}
                        onChange={date => props.onValueChange({target : {value : date}},props.config.key,props.config.type)}
                        minDate={new Date()}
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        showTimeInput
                    />
                </div>
            )
        }
        default : {
            return null
        }
    }
    
    
    
    
    
    
}

export default FormElement
