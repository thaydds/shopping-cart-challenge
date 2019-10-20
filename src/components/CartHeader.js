import React from 'react'
import Typography from '@material-ui/core/Typography';


const CartHeader = () => {
    return(
    <React.Fragment>
        <Typography component="h1" variant="h4" align="center">
        Shopping Cart
        </Typography>
        <Typography variant="h6" gutterBottom>
        Order Summary
        </Typography>
    </React.Fragment>
    )
}


export default CartHeader
