import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"

const Cupom = (props) => {
    return(
        <List>
            <ListItem alignItems='center'>
            <ListItemText primary={'Cupom'} />
            <Input
                inputProps={{
                'aria-label': 'description',
                }}
            />
            <Button variant="outlined" color="primary" >
                Aplly
            </Button>
            </ListItem>
      </List>
    )
}

export default Cupom