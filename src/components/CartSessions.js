import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'


const CartSessions = (props) => {
    const { subtotal, total, shipping } = props
    return(
        <List>
            <ListItem alignItems='center'>
                <ListItemText primary={'Subtotal'} />
                <Typography data-testid='subtotal' variant="body2">{subtotal}</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Shipping'} />
                <Typography data-testid='shipping' variant="body2">{ shipping }</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText  primary={'Total'} />
                <Typography data-testid='total' variant="body2">{total}</Typography>
            </ListItem>
        </List>
    )
}

export default CartSessions


CartSessions.propTypes = {
    total: PropTypes.number,
    subtotal: PropTypes.number,
    shipping: PropTypes.number,
  }

