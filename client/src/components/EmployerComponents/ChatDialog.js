
import React from 'react'
import { useState } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextInput } from "./EmpTextInput.js";
import { MessageLeft, MessageRight } from "./EmpMessages";
import axios from 'axios'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Constants from '../../utils/constants';
const C = new Constants();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: "120%",
            height: "80vh",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100%",
            height: "100&",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        }
    })
);



// http://localhost:3001/abhi/PostMessage

export default function ChatDialog(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(true)

    const [message, setMessage] = useState(false)
    const [messageContent, setmessageContent] = useState("")

    const [messagedelivered, setmessageDelivered] = useState(false)

    const handleDialogclose = () => {
        setOpen(false)
        props.closeChat()
    }
    const handleMessageOpen = (text) => {
        console.log("heyy")
        console.log(props)
        axios.post(`${C.Server_URL}/abhi/PostMessage`,
            {
                userId: props.userId,
                username: props.name,
                empId: props.empId,
                empname: JSON.parse(sessionStorage.getItem('authenticateDetails')).fname,
                msg: text

            }).then(resp => {

                setmessageContent(text)

                setTimeout(() => {
                    setmessageDelivered(true)
                }, 1000)


                setMessage(true)

            }).catch(err => {
                console.log(err)

            })


    }



    console.log(message)
    console.log(messageContent)
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleDialogclose}
                // scroll={this.state.scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Applicants</DialogTitle>
                <DialogContent style={{ height: '600px' }}>
                   {messagedelivered !=true?<div className={classes.container} >
                        <Paper className={classes.paper} zDepth={2} >
                            <Paper id="style-1" className={classes.messagesBody}  >
                                {message == true ? <MessageRight
                                    message={messageContent}
                                    
                                /> : ""
                                }
                            </Paper>
                            <TextInput parentCallback={handleMessageOpen} />
                        </Paper>
                    </div> :   <div className="row" style={{textAlign:"center"}}>
                        <div className="col-md-12" style={{marginTop:"35%"}}>
                        Note Sent<DoneOutlineIcon/>
                         </div>                   
                    </div>}
                    
                </DialogContent>
            </Dialog>
            
        </div>



    )
}

