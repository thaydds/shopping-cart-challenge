import React from 'react'
import Chip from '@material-ui/core/Chip'
import Money from '@material-ui/icons/Money'
import { useDispatch } from 'react-redux'
import { cartCupomSub } from '../actions'

const DiscountFlag = (props) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(cartCupomSub())
      };

    return(
        <Chip
            style={{marginRight:20}}
            size='small'
            icon={<Money />}
            label={props.label}
            onDelete={handleDelete}
            color="secondary"
        />
    )
}

export default DiscountFlag