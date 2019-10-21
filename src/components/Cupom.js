import React,  {useState} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import {useDispatch, useSelector} from 'react-redux'

const Cupom = (props) => {
    const cart = useSelector(state => state)
    const dispatch = useDispatch
    const [ cupomField, setCupomField] = useState('')

    const handleChange = () => event => {
        setCupomField(event.target.value);
    };

    const checkCupom = () => {

        const validCupom = cart.cupoms.filter( c => c.key === cupomField)

        console.log('cupom', validCupom)

    }

    console.log('cupom', cupomField)

    return(
        <List>
            <ListItem alignItems='center'>
            <ListItemText primary={'Cupom'} />
            <Input
                value={cupomField}
                onChange={handleChange()}
                onClick={() => checkCupom()}
                inputProps={{
                'aria-label': 'description',
                }}
            />
            <Button onClick={() => checkCupom()} variant="outlined" color="primary" >
                Aplly
            </Button>
            </ListItem>
      </List>
    )
}

export default Cupom