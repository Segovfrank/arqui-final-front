import React from 'react';

import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

const FoodItem = ({ name, description, imgurl }) => {
    const classes = useStyles();

  return (
    <Card>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" src={imgurl} className={classes.large}/>
      }
    title={<strong>{name}</strong>}
      subheader={description}
    />

  </Card>

  );
}

export default FoodItem;