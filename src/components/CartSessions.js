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
                <Typography variant="body2">{subtotal}</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Shipping'} />
                <Typography variant="body2">{ shipping }</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Total'} />
                <Typography variant="body2">{total}</Typography>
            </ListItem>
        </List>
    )
}

export default CartSessions

CartSessions.proptypes = {
    subtotal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired

}