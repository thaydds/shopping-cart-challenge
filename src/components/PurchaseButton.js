import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from "@material-ui/core/Button"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));

const PurchaseButton = () => {
    const classes = useStyles();

    return(
        <List>
            <ListItem alignItems='center'>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Purchase
            </Button>
        </ListItem>
        </List> 
    )
}

export default PurchaseButton