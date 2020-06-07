import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import FoodItem from './FoodItem';
import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Nuestro menu</h2>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FoodItem 
              name={"Tacos al pastor"} 
              imgurl={"https://www.theyucatantimes.com/wp-content/uploads/2019/03/TacoalPastorFT-e1552069491958.jpg"}
              description={"Deliciosos tacos con carne al pastor."}
              ></FoodItem>
            </Grid>
            <Grid item xs={6}>
              <FoodItem 
              name={"Taco de bistec"} 
              imgurl={"https://www.tacosdonmanolito.com/portal/wp-content/uploads/2015/10/taco-bistec-300x185.jpg"}
              description={"Un clásico, pero con nuestro sabor."}
              ></FoodItem>
            </Grid>
            <Grid item xs={6}>
              <FoodItem 
              name={"Taco Campechano"} 
              imgurl={"https://www.tacosdonmanolito.com/portal/wp-content/uploads/2015/10/Taco-campechano-300x185.jpg"}
              description={"El mas vendido. Con nuestros productos hechos en casa: cecina, longaniza y chicharrón, con o sin salsa, ¡No te puedes ir sin probarlo!"}
              ></FoodItem>
            </Grid>
            <Grid item xs={6}>
              <FoodItem 
              name={"Tacos de Cecina con Longaniza"} 
              imgurl={"https://www.tacosdonmanolito.com/portal/wp-content/uploads/2015/10/taco-cecina-con-longaniza-300x185.jpg"}
              description={"Una deliciosa combinación, con dos de nuestros mejores ingredientes hechos en casa."}
              ></FoodItem>
            </Grid>
            <Grid item xs={6}>
              <FoodItem 
              name={"Taco de Arrachera"} 
              imgurl={"https://www.tacosdonmanolito.com/portal/wp-content/uploads/2017/01/taco-de-arrachera-300x200.jpg"}
              description={"Consiéntete. Sabor Inolvidable"}
              ></FoodItem>
            </Grid>
            <Grid item xs={6}>
              <FoodItem 
              name={"Taco Costeño-Campechano"} 
              imgurl={"https://www.tacosdonmanolito.com/portal/wp-content/uploads/2015/10/taco-coste%C3%B1o-campechano-300x185.jpg"}
              description={"Cecina, longaniza, chicharrón, chile cuaresmeño, cebolla picada y nuestra salsa Don Manolito."}
              ></FoodItem>
            </Grid>
          </Grid>
        </GridItem>
      </GridContainer>
      <div>
      <h2 className={classes.title}>Nuestros beneficios</h2>

        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Chat gratuito"
              description="Ingresa a nuestro chat para comprar y ordenar en línea!"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Control de seguridad"
              description="La aplicación se desarrollo de la mejor manera. Tus datos están seguros."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Resilencia a errores"
              description="La aplicación estará funcionando la mayor parte del tiempo."
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
