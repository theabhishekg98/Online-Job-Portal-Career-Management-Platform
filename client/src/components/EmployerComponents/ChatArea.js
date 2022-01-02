import { autocompleteClasses, Card, Chip, Divider, IconButton, ListItem, Paper, Stack, TextField } from '@mui/material'
import React, { Component } from 'react'
// import background from '../../double-bubble.png'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SendIcon from '@mui/icons-material/Send';
import serverroute from '../../webconfig';
var axios = require("axios").default;
export class ChatArea extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages:[],
            inputMessage:'',
            userName:'',
            chatId:''
        }
    }
    componentDidMount(){
        // this.setState({messages:this.props.messages})
    }
    componentDidUpdate(prevProps){
        if(this.props.messages!==prevProps.messages){
            this.setState({
                messages:this.props.messages,
                userName:this.props.userName,
                chatId:this.props.chatId
            })
        }
    }
    handleInput=(e)=>{
        console.log(e.target.value)
        this.setState({inputMessage:e.target.value})
    }
    sendMessage=()=>{
        //api call to save message
        let url=`${serverroute}/ha/chat/${this.state.chatId}`
        let data={
            from:'emp',
            message:this.state.inputMessage
        }
        axios.post(url,data).then(res=>{
            console.log(res.data)
            this.setState({
                messages:res.data.message,
                inputMessage:''
            })
        })
        // this.setState({messages:})
    }
    render() {
        return (
            <React.Fragment>
            {this.state.messages.length==0?<Paper style={{height:"100%"}}>
               <center> <Typography justifyContent="center" alignContent="center">Click on Chats to view chats</Typography></center>
            </Paper>
            
            :
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                         <ListItem alignItems="flex-start" >
                             <ListItemAvatar>
                              <Avatar alt={this.state.userName} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                    primary={this.state.userName}/>
                        </ListItem>
                  </TableRow>
                </TableHead>
                        <Divider></Divider>
                <TableBody>
                    
                   { this.state.messages.map(chat=>{
                        return <React.Fragment>
                            {chat.from=="emp"?<div style={{justifyContent:"flex-end" ,display:"flex"}}>
                                 <Chip  label={chat.message} className="mt-2" />
                             </div>:
                             <div  style={{justifyContent:"flex-start" ,display:"flex" ,whiteSpace: "pre-wrap"}}>
                                     <Chip  label={chat.message} className="mt-2"/>
                            </div> }
                            </React.Fragment>
                    })}
                            
                             
                </TableBody>
              </Table>
            </TableContainer>
            
                         <div className="postion-sticky bottom-50 mt-4">
                             <Stack direction="row" spacing={2}>
                                 <TextField fullWidth label="Message" id="fullWidth" onChange={this.handleInput} multiline={true} value={this.state.inputMessage}/>
                                 <IconButton><SendIcon onClick={this.sendMessage}></SendIcon></IconButton>
                            </Stack>
                         </div>
          </Paper>
                }
                </React.Fragment>
        )
    }
}

export default ChatArea
