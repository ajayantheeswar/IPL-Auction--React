import React from 'react';
import axios from '../../../../Store/Interceptor';

import {withRouter} from 'react-router'

import classes from './AuctionList.module.css';
import AuctionItem from './AuctionItem/AuctionItem';
import Spinner from '../../../../Shared/Spinner/Spinner';
import EmptyResult from '../../../../Shared/EmptyResult/EmptyResult';

class AuctionList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            auctionList : [],
            loading : true
        }
    }
    onItemClick = (id) => {
        this.props.history.push(`/home/${id}`)
    }

    fetchAuctions = () => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        console.log(isAdmin);
        let url = '';
        if(isAdmin){
            url = `/admin/get-all-auctions` ;
        }else if(this.props.historyComponent){
            url = '/user/get-user-auctions';
        }else{
            url = `/user/get-all-auctions` ;
        }
        axios.post(url,{})
            .then(response => {
                this.setState({
                    loading : false,
                    auctionList : response.data.Auctions
                })
            })
            .catch(error => console.dir(error))
    }

    

    render () {
        if(this.state.loading){
            return <Spinner />
        }
        return (
            <div className={classes['auction-list']}>

                
                {this.state.auctionList.length !== 0 ? this.state.auctionList.map(auction =>
                    <AuctionItem 
                        historyComponent = {this.props.historyComponent}
                        {...auction} 
                        key={auction.ID}
                        onClickBanner={() => this.onItemClick(auction.ID)} /> 
                ) : <EmptyResult />}
            </div>
        );
    }
    componentDidMount() {
        this.fetchAuctions()
    }
}

export default withRouter(AuctionList);