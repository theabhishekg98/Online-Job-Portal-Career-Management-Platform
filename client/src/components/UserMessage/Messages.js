import React, { Component } from 'react'
import ChatArea from './ChatArea'
import ChatList from './ChatList'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List';
import serverroute from '../../webconfig'
import UserNavbar from '../userNavbar';
import Utils from '../../utils/utils';
const utils = new Utils();

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
        this._getUrlParams();
    }
    componentDidMount(){
        //API to get List of all Chats 
        let url = `${serverroute}/ha/chats/user/${this.userId}`
        axios.get(url).then(res=>{
            this.setState({chatUsersList:res.data})
        })
        // this.setState({chatUsersList:[1,2,3,4,5,6,7,8]})
            
    }

    _getUrlParams = async () => {
        this.userId = undefined;
        let urlParams = utils.getAllUrlParams();

        if ('userId' in urlParams) {
            this.userId = urlParams.userId;
        }
    }

    openChat=(chat)=>{
        console.log(chat)
        // let messages=['Hii','Hello','Whatsup']
        this.setState({
            chatAreaMessage:chat.message,
            chatUserName:chat.employer.name,
            chatId:chat._id
        })
    }
    render() {
        return (
            <React.Fragment >
                <UserNavbar></UserNavbar>
                <div className=" row mt-2 mh-100" >
                    <div className="col-md-3 mh-100">
                        <Paper style={{ maxHeight: 600, overflow: 'auto' }} variant="outlined">
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
