import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import WhatsApp from '@material-ui/icons/WhatsApp';
import PriorityHigh from '@material-ui/icons/PriorityHigh';

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Chat from "components/Chat/Chat.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import Fab from '@material-ui/core/Fab';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const dashboardRoutes = [];
const communicationApi = `http://104.155.191.166:3001/communication/`;
const databaseApi = `http://34.72.202.9:3002/database/`;
const observabilityApi = `http://35.225.121.205:3003/observe/`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const [open, setOpen] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);

  const [openChat, setOpenChat] = useState(false);

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

  const dbAlert = () => {
    setOpen(true);
    logActivity();
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleTicketClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setTicketCreated(false);
  };
  const openChatMethod = (event) => {
    setOpenChat(true);
  };

  const createTicket = (event) => {
    let body = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(observabilityApi + "ticket", body)
      .then(response => {
        if(response.ok) {
          console.log("created ticket...");
          console.log(response);
          setTicketCreated(true);
        } else {
          
        }
      })
  };

  const connectToDB = async () => {

    let body = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(databaseApi + "connect", body)
      .then(response => {
        if(response.ok) {
          console.log(response);
          dbAlert();
          //getTasks();
        } else {
          
        }
      })
  }

  useEffect(() => {
    connectToDB();
  }, []);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="El Güero"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/tacos.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={7} sm={7} md={7}>
              <h1 className={classes.title}>Tacos el güero</h1>
              <h4 className={classes.title}>Hemos hecho clientes que quieren la marca y que se han convertido en amigos. Creamos un equipo que cuida cada detalle como cuida su casa y familia. Tus tacos a un solo clic.
              </h4>
              <br />
              <Fab color="white" aria-label="add" variant="extended" onClick={openChatMethod}>
        <WhatsApp /> &nbsp;&nbsp;Ordena ahora
      </Fab>
      <Fab color="secondary" aria-label="add" variant="extended" onClick={createTicket}>
        <PriorityHigh /> &nbsp;&nbsp;Ayuda
      </Fab>


              
            </GridItem>
              {openChat ? (
                <GridItem xs={5} sm={5} md={5}>

                <Chat></Chat>
                </GridItem>

              ): (
                <></>
              )}

          </GridContainer>
        </div>

      </Parallax>
      
      <div className={classNames(classes.main, classes.mainRaised)}>
        
        <div className={classes.container}>
          <ProductSection/>
        </div>
      </div>


      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Conexión con la base de datos exitosa
        </Alert>
      </Snackbar>
      
      <Snackbar open={ticketCreated} autoHideDuration={6000} onClose={handleTicketClose}>
        <Alert onClose={handleTicketClose} severity="error">
          Ticket generado
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}
