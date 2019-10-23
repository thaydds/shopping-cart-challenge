import React from 'react'
import Typography from '@material-ui/core/Typography';


const CartHeader = () => {
    return(
    <React.Fragment>
        <Typography data-testid='cart-header' component="h1" variant="h4" align="center">
        Shopping Cart
        </Typography>
    </React.Fragment>
    )
}


export default CartHeader
