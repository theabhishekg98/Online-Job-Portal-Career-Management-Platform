import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import  { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        //margin: theme.spacing(1),
    },
  })
);


export const TextInput = ({parentCallback}) => {

    const [text,setmessageText] = useState("")
        
    const handleClick = ()=>
    {
    
    parentCallback(text)
      
    }

    const handleTextInput = (e)=>
    {  console.log(e.target.value)
         setmessageText(e.target.value)
    }


    const classes = useStyles();
    return (
        <>
            <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField onChange={(e)=>{handleTextInput(e)}}
                id="standard-text"
                name="msg"
                label="Send a note to the Candidate"
                className={classes.wrapText}
                //margin="normal"
            />
            <Button onClick={handleClick} variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
        </>
    )
}



