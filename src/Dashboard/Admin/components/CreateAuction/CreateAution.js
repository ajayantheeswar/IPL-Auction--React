import React from 'react'
import classes from './CreateAuction.module.css';

import FormElement from '../../../../Shared/FormElement/FormElement';
import { ImagePicker } from '../../../../Shared/ImagePicker/ImagePicker';

import axios from '../../../../Store/Interceptor';
import { withRouter } from 'react-router';

class CreateAution extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            playerImage : {
                image : null
            },
            player : {
                name : {
                    value : '',
                    valid : true,
                    error : null,
                    config : {
                        label : 'Name',
                        key : 'name',
                        type : 'input'
                    }
                },
                battingStyle : {
                    value : '',
                    valid : true,
                    error : null,
                    config : {
                        label : 'Batting Style',
                        key : 'battingStyle',
                        type : 'option',
                        options : ['','Left-Handed','Right-Handed']
                    }
                },
                average : {
                    value : '',
                    valid : true,
                    error : null,
                    config : {
                        label : 'Batting Average',
                        key : 'average',
                        type : 'input'
                    }
                },
                role : {
                    value : '',
                    valid : true,
                    error : null,
                    config : {
                        label : 'Role',
                        key : 'role',
                        type : 'option',
                        options : ['','Batsman','Bowler','All-Rounder']
                    }
                },
                country : {
                    value : '',
                    valid : true,
                    error : null,
                    config : {
                        label : 'Country',
                        key : 'country',
                        type : 'option',
                        options : ['','India','England','Australia','Sri Lanka','New Zeland','West Indies']
                    }
                },
                start : {
                    value : new Date(),
                    valid : true,
                    error : null,
                    config : {
                        label : 'Start Date',
                        key : 'start',
                        type : 'date',
                    }
                },
                end : {
                    value : new Date(),
                    valid : true,
                    error : null,
                    config : {
                        label : 'End Date',
                        key : 'end',
                        type : 'date',
                    }
                }
            }
        }
    }

    onImageSelector = (image) => {
        this.setState ( (prevState) => {
            return {
                ...prevState,
                playerImage:{
                    image : image
                }
            }
        });
    }

    onValueChange = (event,id) => {
        const presentValues = {...this.state.player[id]};
        presentValues.value = event.target.value;
        this.setState( (prev) => {
            return {
                ...prev,
                player : {
                    ...prev.player,
                    [id] : presentValues
                }
            }
        } )
    }

    onCreateAuction = () => {
        const formdata = new FormData();
        for (let element in  this.state.player){
            if(element === 'start' || element === 'end'){
                formdata.append(element,this.state.player[element].value.getTime());
                continue;
            }
            formdata.append(element,this.state.player[element].value);
        }
        formdata.append('profile',this.state.playerImage.image);


        axios.post('/admin/create-auction',formdata,{
            headers: {
            'Content-Type': 'multipart/form-data'
            
          }
        }).then(response => {
            this.props.history.push('/home');
        }).catch(err => {
            console.log(err);
        })

    }

    render () {
        let FormElements = []
        let n = 0;
        for (let element in this.state.player){
            FormElements.push(<FormElement key={n++} {...this.state.player[element]} onValueChange={this.onValueChange} />)
        }
        return (
            <div className={classes['create-auction']}>
                <ImagePicker 
                    imageSource={this.state.playerImage.image} 
                    OnImageSelected = {(image)=> this.onImageSelector(image)} />
                <form className={classes['player-auction-Form']}>
                    {FormElements}
                </form>
                <button className={classes['cta-button']} onClick={this.onCreateAuction}>Create</button>
            </div>
        )
    }
}

export default withRouter(CreateAution);