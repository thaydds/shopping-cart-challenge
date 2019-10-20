import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from "@material-ui/core/IconButton"
import Add from "@material-ui/icons/Add"
import Remove from "@material-ui/icons/Remove"
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const Product = (props) => {
    const { product, countAdd, countSub } = props
    return(
        <ListItem>
            <ListItemIcon>
                <IconButton onClick={() => countAdd(product.name)} edge="end" aria-label="add">
                    <Add />
                </IconButton>
            </ListItemIcon> 
            <Typography variant="body2">{product.amount}</Typography>
            <ListItemIcon>
                <IconButton onClick={() => countSub(product.name)} edge="end" aria-label="delete">
                    <Remove />
                </IconButton>
            </ListItemIcon>       
            <ListItemText primary={product.name} />
            <Typography variant="body2">{product.price * product.amount}</Typography>
        </ListItem>     
    )
}

export default Product

Product.propTypes = {
    product: PropTypes.object,
    countAdd: PropTypes.func.isRequired,
    countSub: PropTypes.func.isRequired
  }