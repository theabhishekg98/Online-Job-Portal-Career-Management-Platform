import React, { Component } from 'react'
import ChatArea from './ChatArea'
import ChatList from './ChatList'
import EmployerNavBar from './EmployerNavBar'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List';
import serverroute from '../../webconfig'
var axios = require("axios").default;
export class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chatUsersList:[],
            chatAreaMessage:[],
            chatUserName:'',
            chatId:''
        }
    }
    componentDidMount(){
        //API to get List of all Chats 
        let empId=JSON.parse(sessionStorage.getItem('authenticateDetails')).employerId
        let url=`${serverroute}/ha/chats/emp/${empId}`
        axios.get(url).then(res=>{
            this.setState({chatUsersList:res.data})
        })
        // this.setState({chatUsersList:[1,2,3,4,5,6,7,8]})
            
    }
    openChat=(chat)=>{
        console.log(chat)
        // let messages=['Hii','Hello','Whatsup']
        this.setState({
            chatAreaMessage:chat.message,
            chatUserName:chat.user.name,
            chatId:chat._id
        })
    }
    render() {
        return (
            <React.Fragment >
                <EmployerNavBar></EmployerNavBar>
                <div className=" row mt-2 mh-100" >
                    <div className="col-md-3 mh-100">
                        <Paper style={{ maxHeight: 600, overflow: 'auto' }} variant="outlined">
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                               {/* <center> {this.state.chatUsersList.length==0?<div>No Chats yet</div>:""}</center> */}
                                {this.state.chatUsersList.map(chat=>{
                                    return <div onClick={e=>this.openChat(chat)}>
                                        <ChatList data={chat} ></ChatList>
                                    </div>
                                })}
                                
                                </List>
                        </Paper>
                    </div>
                    <div className="col-md-9 mh-100">
                        <ChatArea messages={this.state.chatAreaMessage} userName={this.state.chatUserName} chatId={this.state.chatId}></ChatArea>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages
