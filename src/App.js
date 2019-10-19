import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from "@material-ui/core/IconButton"
import Add from "@material-ui/icons/Add"
import Remove from "@material-ui/icons/Remove"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    total: {

      fontWeight: '700',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  },
}));

const products = [
  { name: 'Apple', desc: 'sweet and delicious', price: 8},
  { name: 'Banana', desc: 'the best of the world', price: 4},
  { name: 'Orange', desc: 'orange orange',  price: 3}
]

export default function Checkout() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Shopping Cart
          </Typography>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List disablePadding>
            {products.map(product => 
               <ListItem alignItems='center' key={product.name}>
                  <ListItemIcon>
                  <IconButton edge="end" aria-label="add">
                      <Add />
                </IconButton>
            </ListItemIcon> 
            <Typography variant="body2">1</Typography>
            <ListItemIcon>
            <IconButton edge="end" aria-label="delete">
                      <Remove />
                </IconButton>
            </ListItemIcon>       
               <ListItemText primary={product.name} />
               <Typography variant="body2">{product.price}</Typography>
             </ListItem>
            )}
          </List>
          <Divider/>
          <List>
            <ListItem alignItems='center'>
               <ListItemText primary={'Subtotal'} />
               <Typography variant="body2">0</Typography>
             </ListItem>
             <ListItem alignItems='center'>
               <ListItemText primary={'Shipping'} />
               <Typography variant="body2">0</Typography>
             </ListItem>
             <ListItem alignItems='center'>
               <ListItemText primary={'Total'} />
               <Typography variant="body2">0</Typography>
             </ListItem>
          </List>
          <Divider/>
          <List>
            <ListItem alignItems='center'>
               <ListItemText primary={'Cupom'} />
               <Input
                inputProps={{
                  'aria-label': 'description',
                }}
              />
               <Button variant="outlined" color="primary" >
                Aplly
              </Button>
             </ListItem>
          </List> 
          <Divider />
            <List>
            <ListItem alignItems='center'>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Purchase
          </Button>
             </ListItem>
          </List> 
        </Paper>
      </main>
    </React.Fragment>
  );
}