import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatMessage from './ChatMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScrollToBottom from 'react-scroll-to-bottom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const communicationApi = `http://104.155.191.166:3001/communication/`;
const databaseApi = `http://34.72.202.9:3002/database/`;
const observabilityApi = `http://35.225.121.205:3003/observe/`;


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Alert(props) {
  return <MuiAlert elevation={12} variant="filled">Pago completado</MuiAlert>;
}



const Chat = ({}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState("false");
  const [order, setOrder] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState(0);

const [messages, setMessages] = useState([
  {text: 'Hola', sender: 'Bot'},
  {text: 'Buenas tardes', sender: 'Human'}
]);

const openAlert = () => {
  setOpen(true);
};
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const chatbotConnection = async () =>{
  try{
  let body = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const message = await fetch(communicationApi + "send", body)
    .then(response => {
      if(response.ok) {
        logActivity();
        return response.json();
      } else {
        console.log(response);
        return null;
      }
    })

    if(message === null){
      setLoading("true");
    }else{
      setLoading("true");
      let msg = [{text: message, sender: 'Bot'}]
      setMessages(msg);

    }

  }catch(error){
    setLoading("false");
    //chatbotConnection();

    //setLoading("null");
  }
}

useEffect(() => {
  chatbotConnection();
}, []);

const handleOrderChange = (event) => {
  let val = event.target.value;
  setOrder(val);
}

const handleOrderAdd = (event) => {
  setOrderLoading(true);
  addOrder(order);
  setOrder('');
}

const addOrder = (_order) => {

  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: _order, amount: "" })
  };
  fetch(communicationApi + "sendOrder", body)
    .then(response => {
      if(response.ok) {
        console.log(response);
        let cMessages = Object.assign([], messages);
        cMessages.push(  {text: '('+_order + ') -orden tomada exitosamente.', sender: 'Human'})
        setMessages(cMessages);
        setOrderLoading(false);
        saveTransactionToDatabase(_order);
        logActivity();
        //getTasks();
      } else {
        
      }
    })
}



const [makingPayment, setMakingPayment] = useState(false);
  
const logActivity = () => {

  let body = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(observabilityApi + "log", body)
    .then(response => {
      if(response.ok) {
        console.log("logging...");
        console.log(response);
      } else {
        
      }
    })
}

const registerTransaction = async (_order) =>  {
  console.log("making transaction for order: " + _order);
  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: _order, amount: "" })
  };
  fetch(communicationApi + "sendTransaction", body)
  .then(response => {
    if(response.ok) {
      console.log(response);
      setMakingPayment(false);
      openAlert();
    } else {
      
    }
  })
}

const saveTransactionToDatabase = async (_order) => {
  console.log("saving transaction to db: " + _order);
  let body = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(databaseApi + "transaction/post", body)
  .then(response => {
    if(response.ok) {
      console.log(response);
  
    } else {
      
    }
  })
}

const handlePayment = (event, _order) => {
  setMakingPayment(true);
  registerTransaction(_order);
}

const handleGetStatus = (event, _order) => {
  if(currentStatus != 0){
    console.log("updating status for order: " + _order);
    let body = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(communicationApi + "status/update", body)
    .then(response => {
      if(response.ok) {
        console.log(response);
        handleStatusChange();
      } else {
        
      }
    })
  }else{
    console.log("getting status for order: " + _order);
    let body = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(communicationApi + "status/get", body)
    .then(response => {
      if(response.ok) {
        console.log(response);
        handleStatusChange();
      } else {
        
      }
    })
  }
 
}

const handleStatusChange = () => {
  if(currentStatus == 0){
    setCurrentStatus(1)
    setStatus("Preparandose...")

  }else if(currentStatus == 1){
    setCurrentStatus(2)
    setStatus("En camino...")

  }else if(currentStatus == 2){
    setCurrentStatus(3)
    setStatus("Entregando...")

  }else{
    setCurrentStatus(0)
    setStatus("Entregado...")

  }
}

  return (

    <Card className={classes.root} style={{height: '400px'}}>
      <ScrollToBottom className="chat-messages">
      {loading === "false" ? (
        <div>
            <CircularProgress />
        </div>
        ) : (
          <>
           <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Chat
            </Typography>
            <Typography variant="body2" component="p">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} index={index} makePaymentHandle={handlePayment} handleGetStatus={handleGetStatus}></ChatMessage>
                ))}
            </Typography>
            {orderLoading ? (
            <Typography variant="body2" component="p">
              registrando orden...
            </Typography>
            ): (
              <></>
            )
            }
            {makingPayment ? (
            <Typography variant="body2" component="p">
              pagando orden...
            </Typography>
            ): (
              <></>
            )
            }
            <Typography variant="body2" component="p">
              {status}
            </Typography>
                <Snackbar  anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }} open={open} autoHideDuration={1200} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Orden tomada exitosamente
            </Alert>
          </Snackbar>
          </CardContent>

          </>
      )}
                
          <CardActions className="input-chat">
            <TextField id="time" type="text" value={order} onChange={handleOrderChange} />
            <Button variant="contained" size="small" onClick={handleOrderAdd} >Enviar</Button>
          </CardActions>

    </ScrollToBottom>

  </Card>

  );
}

export default Chat;