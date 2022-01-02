import React, { Component } from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ReactComponent as IndeedLogo } from '../../Indeed.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import WorkIcon from '@mui/icons-material/Work';
import { Redirect } from 'react-router-dom';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AssessmentIcon from '@mui/icons-material/Assessment';
export class EmployerNavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDrawerOpened: false,
            logoff : false
        }
    }
    closeDrawer = () => {
        this.setState({
            isDrawerOpened: false
        })
    }
    toggleDrawerStatus = () => {
        this.setState({
            isDrawerOpened: true,
        })
    }
    handleLogout = ()=>
    {
      sessionStorage.clear()
      this.setState({
          logoff:true
      })
    
    }
    employerProfileUrl = `/company/profile`
    employerReviewsUrl = `/company/reviews`
    employerReportsUrl = `/company/reports`
    employerMessagesUrl = `/company/messages`
    employerHomeUrl=`/JobApplicants`
    jobPostingUrl=`/JobPostingPage`
    menuList = (
        <div
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}>
        
                <List>
                    <ListItem button key='Home' to={this.employerHomeUrl} component={Link}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </List>
            
        
                <List>
                    <ListItem button key='Profile' to={this.employerProfileUrl} component={Link}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItem>
                </List>
            
        
                <List>
                    <ListItem button key='Reviews' to={this.employerReviewsUrl} component={Link}>
                        <ListItemIcon>< ReviewsIcon></ReviewsIcon></ListItemIcon>
                        <ListItemText primary='Reviews' />
                    </ListItem>
                </List>
            
            <>
                <List>
                    <ListItem button key='Messages' to={this.employerMessagesUrl} component={Link}>
                    <center><ListItemIcon><MessageIcon /></ListItemIcon></center>
                        <ListItemText primary='Messages' />
                    </ListItem>
                </List>
            </>
        
                <List>
                    <ListItem button key='jobPosting' to={this.jobPostingUrl} component={Link}>
                        <ListItemIcon><WorkIcon /></ListItemIcon>
                        <ListItemText primary='Post Jobs' />
                    </ListItem>
                </List>
       
    
                <List>
                    <ListItem button key='Reports' to={this.employerReportsUrl} component={Link}>
                        <center><ListItemIcon><AssessmentIcon /></ListItemIcon></center>
                        <ListItemText primary='Reports' />
                    </ListItem>
                </List>
            
        </div>

    )
    render() {
        if(this.state.logoff !=true)
        {
        return (
            <div className="sticky-top">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark  ">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <IconButton onClick={this.toggleDrawerStatus}>
                                <MenuIcon color="info"  ></MenuIcon>
                            </IconButton>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to='#'><IndeedLogo></IndeedLogo></Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right ms-auto">
                        <li >
                 
                        </li>
                        <li>
                            <IconButton onClick={this.handleLogout}><LogoutIcon color="info" /></IconButton>
                        </li>
                    </ul>
                </nav>

                <div>
                    <Drawer
                        variant="temporary"
                        open={this.state.isDrawerOpened}
                        onClose={this.closeDrawer}
                    >
                        {/* {this.props.view == 'customer' ? this.customerMenuList : ''} */}
                        {this.menuList}
                    </Drawer>
                </div>
            </div>
        )
    }else
    {

       return(<Redirect to="/"></Redirect>)
    }
    }
}

export default EmployerNavBar
