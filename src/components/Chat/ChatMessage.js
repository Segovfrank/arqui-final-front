import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import green from '@material-ui/core/colors/green';


import Button from '@material-ui/core/Button';
import NetworkCheck from '@material-ui/icons/NetworkCheck';
import LocalAtm from '@material-ui/icons/LocalAtm';
import { Paper } from '@material-ui/core';
import './styles.css';

const ChatMessage = ({ message, index, makePaymentHandle, handleGetStatus}) => {


    const humanColor = green[200];

  return (

    <Paper className="chat-message bot" style={{backgroundColor: message.sender == 'Bot' ? 'white' : humanColor}}>
      <TableRow>
        <TableCell>
        {message.text}
        </TableCell>

        <TableCell style={{display: message.sender == 'Bot' ? 'none' : ''}}>
          <Button
            onClick={(event) => makePaymentHandle(event, message.text)}
          >
          <LocalAtm/>   
          </Button>

        </TableCell>
        <TableCell style={{display: message.sender == 'Bot' ? 'none' : ''}}>
        <Button
            onClick={(event) => handleGetStatus(event, message.text)}
          >
          <NetworkCheck/>   
          </Button>
        </TableCell>
  
      </TableRow>
        </Paper>

  );
}

export default ChatMessage;