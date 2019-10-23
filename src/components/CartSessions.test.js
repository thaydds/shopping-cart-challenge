import React from 'react'
import { render, waitForElement } from "@testing-library/react"
import CartSessions from './CartSessions'

describe('CartSessions component', () => {
    it('should be able to display total/subtotal/shipping values', async() => {
        const {getByTestId} = render(<CartSessions total={60} subtotal={30} shipping={30} />)
    
        await waitForElement( async () => {
            expect(getByTestId('total')).toHaveTextContent('60')
            expect(getByTestId('subtotal')).toHaveTextContent('30')
            expect(getByTestId('shipping')).toHaveTextContent('30')
        })
    })
})