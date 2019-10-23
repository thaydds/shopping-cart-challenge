import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import Cupom from './Cupom'
import { useSelector, useDispatch } from 'react-redux'
import { initialState } from '../store'
import { CART_CUPOM_ADD } from '../actions'

jest.mock('react-redux')

describe('Cupom component', () => {
    it('should to dispatch a CART_CUPOM_ADD action when cupom input is valid', async() =>{
        useSelector.mockImplementation( state => state (initialState))
        
        const dispatch = jest.fn()
        useDispatch.mockReturnValue(dispatch)
        
        const {getByTestId} = render(<Cupom />)

        const inputNode = await waitForElement(() => getByTestId('input-cupom'))
        const buttonNode = await waitForElement(() => getByTestId('add-cupom'))

        const cupomName = 'FOO'

        fireEvent.change(
            inputNode,
            { target: { value: cupomName }}
        )

        expect(inputNode.value).toEqual(cupomName)

        fireEvent.click(buttonNode)

        expect(dispatch).toHaveBeenCalledWith({
            type: CART_CUPOM_ADD, 
            enabledCupom: [{
                active: false,
                effect: 100,
                key: 'FOO',
                type: 'Fixed'
            }]
        })
    })
})