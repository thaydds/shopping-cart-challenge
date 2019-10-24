import React from 'react'
import { render, waitForElement, fireEvent } from "@testing-library/react"
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import { cartProductAmoundSub, cartProductAmoundAdd } from '../actions'
import { initialState } from '../store'

const product = {
    name: 'Banana', 
    desc: 'the best of the world', 
    price: 4, 
    amount: 2
}

const products = [
    { name: 'Apple', desc: 'sweet and delicious', price: 8, amount: 0},
    { name: 'Banana', desc: 'the best of the world', price: 4, amount: 0},
    { name: 'Orange', desc: 'orange orange',  price: 3, amount: 0}
]

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
        useSelector.mockImplementation( cart => cart (initialState))
      
        const dispatch = jest.fn()

        useDispatch.mockReturnValue(dispatch)

        const { getByTestId } = render(<Product product={product}/>)

        fireEvent.click(getByTestId('add-amount'))

        expect(dispatch).toHaveBeenCalledWith(cartProductAmoundAdd(product.name, products))
        
        fireEvent.click(getByTestId('sub-amount'))

        expect(dispatch).toHaveBeenCalledWith(cartProductAmoundSub(product.name, products))

    })
})