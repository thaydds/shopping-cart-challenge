import React from 'react'
import { render, waitForElement } from "@testing-library/react"
import Product from './Product'


const product = {
    name: 'Banana', 
    desc: 'the best of the world', 
    price: 4, 
    amount: 2
}

jest.mock('react-redux')

describe('CartSessions component', () => {
    it('should be able to display product info', async() => {

        const {getByTestId} = render(<Product product={product} />)
        
        await waitForElement( async () => {
            expect(getByTestId('product-name')).toHaveTextContent('Banana')
            expect(getByTestId('product-total-value')).toHaveTextContent('8')
        })
    })
})