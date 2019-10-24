import React, {useState} from 'react'
import Button from "@material-ui/core/Button"
import CartDialog from './CartDialog'


const PurchaseButton = () => {

    const [open, setOpen] = useState(false)
  
    const handleClickOpen = () => {
      setOpen(true);
    }
  
    const handleClose = value => {
      setOpen(false);
    }

    return(
        <React.Fragment>
            <Button
            type="submit"
            fullWidth
            onClick={handleClickOpen}
            variant="contained"
            color="primary">
            Purchase
            </Button> 
            { open ? <CartDialog open={open} onClose={handleClose}/> : null}
        </React.Fragment>
    )
}

export default PurchaseButton