import React,  {useState} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import {useDispatch, useSelector} from 'react-redux'
import { cartCupomAdd} from '../actions'
import SnackMessage from './SnackMessage'

const Cupom = () => {
    const cart = useSelector(state => state)
    const dispatch = useDispatch()
    const [ cupomField, setCupomField] = useState('')
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    }
    
    const handleChange = () =>
        event => {
        setCupomField((event.target.value).toUpperCase().trim())
    }

    const checkCupom = () => {
        const enabledCupom = cart.cupoms.filter( c => c.key === cupomField)
        if( enabledCupom.length > 0){
            dispatch(cartCupomAdd(enabledCupom))
        }else{
            handleClick()
        }
        setCupomField('') 
    }

    return(
        <List>
            <ListItem alignItems='center'>
            <ListItemText primary={'Cupom'} />
            <Input
                value={cupomField}
                onChange={handleChange()}
                inputProps={{
                "data-testid": "input-cupom",
                'aria-label': 'cupom',
                }}
            />
            <Button data-testid='add-cupom' onClick={() => checkCupom()} variant="outlined" color="primary" >
                Aplly
            </Button>
            {open ? <SnackMessage handleClose={handleClose} open={open} /> : null}
            </ListItem>
      </List>
    )
}

export default Cupom