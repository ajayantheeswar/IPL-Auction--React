import React from 'react';
import classes from './Admin.module.css';
import Navbar from './components/NavBar/Navbar';
import SideBar from '../../Shared/SideBar/SideBar';
import { Switch, Route } from 'react-router';
import SideBarNavLinks from './components/SideBarNavLinks/SideBarNavLinks';
import CreateAution from './components/CreateAuction/CreateAution';
import AuctionList from './components/AutionList/AuctionList';
import UserAutionList from './components/UserAutionList/UserAutionList';
import AuctionDetails from './components/AuctionDetails/AuctionDetails';
import AuthLink from './components/NavBar/AuthLinks/Authlinks';



class Admin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isAdmin : localStorage.getItem('isAdmin') === 'true',
            isSideMenuopen : false
        }
    }

    onBarMenuClicked = () => {
        this.setState ( (prev) => {
            return {
                ...prev,
                isSideMenuopen : !prev.isSideMenuopen
            }
        })
    }

    render () {

        let Routes ;
        if(this.state.isAdmin) {
            Routes = (<Switch>
                <Route path="/home/create-auction" render={() => <CreateAution />} />
                <Route path="/home/:id" component={AuctionDetails}/>
                <Route path="/home" render={() => <AuctionList />} />
            </Switch>)
        }else{
            Routes = (<Switch>
                <Route path="/home" exact render={() => <UserAutionList historyComponent={false} />} />
                <Route path="/home/players" exact render={() => <AuctionList historyComponent={true} />} />
                <Route path="/home/:id" exact component={AuctionDetails}/>
                
            </Switch>)
        }

        return(
            <div className={classes['admin-Dashboard']}>
                <Navbar
                isSideMenuopen={this.state.isSideMenuopen}
                onMenubarClicked ={() => this.onBarMenuClicked()} />
                <hr />
                <div className={classes['main-section']}>
                    <SideBar isSideMenuOpen={this.state.isSideMenuopen} >
                        <SideBarNavLinks isAdmin = {this.state.isAdmin}/>
                        <div className={classes['auth']} >
                            <AuthLink />
                        </div>
                    </SideBar>
                    <div className={classes['main-section__action-container']}>
                         {Routes}
                    </div>

                </div>
            </div>
        )

    }
}


export default Admin;