import React from 'react'
import { render, waitForElement, fireEvent } from "@testing-library/react"
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import {CART_PRODUCT_AMOUNT_ADD, CART_PRODUCT_AMOUNT_SUB} from '../actions'
import { initialState } from '../store'


const product = {
    name: 'Banana', 
    desc: 'the best of the world', 
    price: 4, 
    amount: 2
}

jest.mock('react-redux')

describe('Product component', () => {
    it('should be able to display product info', async() => {
        const { getByTestId } = render(<Product product={product} />)
        
        await waitForElement( async () => {
            expect(getByTestId('product-name')).toHaveTextContent('Banana')
            expect(getByTestId('product-amount')).toHaveTextContent('2')
            expect(getByTestId('product-total-value')).toHaveTextContent('8')
        })
    })

    it('should to dispatch a CART_PRODUCT_AMOUNT_ADD/CART_PRODUCT_AMOUNT_SUB action', () =>{
        useSelector.mockImplementation( state => state (initialState))
        
        const dispatch = jest.fn()

        useDispatch.mockReturnValue(dispatch)

        const { getByTestId } = render(<Product product={product}/>)

        fireEvent.click(getByTestId('add-amount'))

        expect(dispatch).toHaveBeenCalledWith({
            type: CART_PRODUCT_AMOUNT_ADD, 
            productName: product.name
        })

        fireEvent.click(getByTestId('sub-amount'))

        expect(dispatch).toHaveBeenCalledWith({
            type: CART_PRODUCT_AMOUNT_SUB, 
            productName: product.name
        })

    })
})