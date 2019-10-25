import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import DiscountFlag from './DiscountFlag'


const CartSessions = (props) => {
    const { subtotal, total, shipping, cupom } = props

    return(
        <List>
            <ListItem alignItems='center'>
                <ListItemText primary={'Subtotal'} />
                { cupom ? cupom.type ==='Percentual' ? <DiscountFlag label={`Percentual Cupom (-${cupom.effect * 100}%) of ${((100 * subtotal) / (100 - (cupom.effect * 100))).toFixed(0)}$`} /> : null : null }
                <Typography data-testid='subtotal' variant="body2">{`${subtotal.toFixed(2)} $`}</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Shipping'} />
                { cupom ? cupom.type ==='Free Shipping' && subtotal >= cupom.min ? <DiscountFlag label={`Free Shipping Cupom`} /> : null : null }
                <Typography data-testid='shipping' variant="body2">{ `${(shipping).toFixed(2)} $` }</Typography>
                </ListItem>
                <ListItem alignItems='center'>
                <ListItemText primary={'Total'} />
                { cupom ? cupom.type ==='Fixed' ? <DiscountFlag label={`Fixed Cupom -${cupom.effect}$`} /> : null : null }
                <Typography data-testid='total' variant="subtitle2">{`${total.toFixed(2)} $`}</Typography>
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

