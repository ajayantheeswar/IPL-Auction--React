import React from 'react';
import classes from './AuctionDetails.module.css';

import axios from '../../../../Store/Interceptor';

import {profile} from '../../../../Assets/Images/index';
import CreateBid from './CreateBid/CreateBid';
import Bids from './Bids/Bids';
import Spinner from '../../../../Shared/Spinner/Spinner';

class AuctionDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            auction : null,
            loading : true,
            bid : '',
            message : '',
            error : false,
            isAdmin : localStorage.getItem('isAdmin') === 'true',
            isBidSubmitted : false
        }
    }

    fetchDetails = () => {
        const id = this.props.match.params['id'];
        let url = '';
        if(localStorage.getItem('isAdmin')=== 'true'){
            url = `/admin/get-auction`;
        }else{
            url = `/user/get-auction`;
        }

        this.setState((prev) => {
            return {
                ...prev,
                loading : true
            }
        })
        
        axios.post(url,{
            AuctionDetails : {
                auctionId : id
            }
        })
         .then(response => {
             this.setState((prev) => {
                 return {
                    ...prev,
                    loading : false,
                    auction : response.data.auction,
                    isBidSubmitted : false
                 }
             })
         })
          .catch(err => {
            this.setState( (prev) => {
                return {
                    ...prev,
                    loading : false,
                    error : err,
                    isBidSubmitted : false
                }
               
            })
          })
    }

    bidTheAuction = () => {
        
        axios.post('/user/create-bid',{
            BidDetails : {
                AuctionId : this.state.auction.id,
                Amount : this.state.bid
            }
        })
         .then(response => {
             this.setState({
                 isBidSubmitted : true
             })
         })
          .catch(err => {
              this.setstate({
                  loading : false,
                  error : err
              })
          })
    }

    onBidAmountChange = (event) => {
        event.persist()
        this.setState( (prev) => {
            return {
                ...prev,
                bid : event.target.value
            }
        }) 
    }

    componentDidUpdate (prevProps , prevState){
        
        if(!this.state.loading && this.state.isBidSubmitted){    
            this.fetchDetails()
        }
    }

    render () {
        
        if(this.state.loading && !this.state.auction){
            return <Spinner /> ;
        }

        const DetailsList = [];
        let image = profile;
        if(this.state.auction.profile !== 'null'){
            image = this.state.auction.profile
        }
        
        for(const each in this.state.auction){
            
            if(['battingStyle','average','role','start','end','country'].includes(each)){

                let value = this.state.auction[each];
                if(each ==='start' || each === 'end'){
                    const date = new Date(+value);
                    value = date.toDateString() + ' ' +date.toLocaleTimeString();
                } 
                DetailsList.push(
                    <div className={classes['details-item']} >
                        <p>{each}</p>
                        <p>{value}</p>
                    </div>
                )
            }
            
        }
    
        return (
            <div className={classes['auction-details']}>
                <div className={classes['auction-headline']}>
                    <img src={image} alt="profile" />
                    <p>{this.state.auction.name}</p>
                </div>
                <div className={classes['auction-details--list']}>
                    {DetailsList}
                </div>
                {!this.state.isAdmin ? <CreateBid value={this.state.bid} 
                    onBid={ () => this.bidTheAuction()}
                    onValueChange={ (event) => this.onBidAmountChange(event)} /> : null}
                <Bids bids={this.state.auction.bids} isAdmin={this.state.isAdmin} />
            </div>
        )
    }

    componentDidMount(){
        this.fetchDetails()
    }    

}



export default AuctionDetails;
