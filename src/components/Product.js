import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from "@material-ui/core/IconButton"
import Add from "@material-ui/icons/Add"
import Remove from "@material-ui/icons/Remove"
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import { cartProductAmoundAdd, cartProductAmoundSub } from '../actions'

const Product = (props) => {
    const { product } = props
    const cart = useSelector( state => state)
    const dispatch = useDispatch()
    return(
        <ListItem>
            <ListItemIcon>
                <IconButton color="primary" data-testid="add-amount" onClick={() => dispatch(cartProductAmoundAdd(product.name, cart.products))} edge="end" aria-label="add">
                    <Add />
                </IconButton>
            </ListItemIcon> 
            <Typography data-testid="product-amount" variant="body2">{`${product.amount} kg`}</Typography>
            <ListItemIcon>
                <IconButton color="secondary" data-testid="sub-amount" onClick={() => dispatch(cartProductAmoundSub(product.name, cart.products))} edge="end" aria-label="delete">
                    <Remove />
                </IconButton>
            </ListItemIcon>       
            <ListItemText data-testid="product-name" primary={`${product.name}`} />
            <Typography data-testid="product-total-value" variant="body2">{`${product.price * product.amount} $`}</Typography>
        </ListItem>     
    )
}

export default Product

Product.propTypes = {
    product: PropTypes.object,
  }