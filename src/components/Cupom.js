import React,  {useState} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import {useDispatch, useSelector} from 'react-redux'
import {CART_CUPOM_ADD, CART_CUPOM_SUB} from '../actions'

const Cupom = () => {
    const cart = useSelector(state => state)
    const dispatch = useDispatch()
    const [ cupomField, setCupomField] = useState('')
    
    const handleChange = () =>
     event => {
        setCupomField(event.target.value.trim());
    };

    const checkCupom = (teste) => {
        console.log('teste', teste)

        const enabledCupom = cart.cupoms.filter( c => c.key === cupomField)
        if( enabledCupom.length > 0){
            dispatch({type: CART_CUPOM_ADD , enabledCupom: enabledCupom})
        } else {
            dispatch({type: CART_CUPOM_SUB})

        }
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
            <Button data-testid='add-cupom' onClick={() => checkCupom('button')} variant="outlined" color="primary" >
                Aplly
            </Button>
            </ListItem>
      </List>
    )
}

export default Cupom