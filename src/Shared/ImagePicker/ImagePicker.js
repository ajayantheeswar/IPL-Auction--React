import React from 'react';
import classes from './ImagePicker.module.css';

import {camera,profile} from '../../Assets/Images/index';
export const ImagePicker = props => {

    const imageHandler = (event) => {
        // After the File is Selected
        const file = event.target.files && event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            props.OnImageSelected(event.target.result)
        }
    
        if(file){
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className={classes['image-picker']}>
            <img className={classes['img-preview']} src={props.imageSource || profile} alt="upload" />
            <div className={classes['img-upload-icon']}>
                <label htmlFor="filechoose">
                    <img src={camera} alt='upload' htmlFor="filechoose" />
                </label>
                <input type="file" id="filechoose" onChange={imageHandler} style={{display : 'none'}} />
            </div>
        </div>
    )
}
