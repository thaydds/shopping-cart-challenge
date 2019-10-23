import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import Money from '@material-ui/icons/Money'

const CartSessions = (props) => {
    const { subtotal, total, shipping } = props

  const handleDelete = () => {
    alert('You clicked the delete icon.');
  };
    return(
        <List>
            <ListItem alignItems='center'>
                <ListItemText primary={'Subtotal'} />
                <Chip
                style={{marginRight:20}}
                size='small'
                icon={<Money />}
                label="Discount Cupom 30%"
                onDelete={handleDelete}
                color="secondary"
            />
                <Typography data-testid='subtotal' variant="body2">{`${subtotal} $`}</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Shipping'} />
                <Typography data-testid='shipping' variant="body2">{ `${shipping} $` }</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText  primary={'Total'} />
                <Typography data-testid='total' variant="body2">{`${total} $`}</Typography>
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

