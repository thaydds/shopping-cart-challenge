import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const CartSessions = (props) => {
    return(
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
    )
}

export default CartSessions