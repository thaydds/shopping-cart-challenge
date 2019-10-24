import React from 'react'
import { render } from "@testing-library/react"
import ProductList from '../components/ProductList'
import { initialState } from '../store'

jest.mock('react-redux')

describe('ProducList component', () => {
    it('should be able to render a list of products', async() => {

        const { getByTestId, getByText } = render(<ProductList products={initialState.products} />)

        expect(getByTestId('product-list')).toContainElement(getByText('Banana'))
        expect(getByTestId('product-list')).toContainElement(getByText('Apple'))
        expect(getByTestId('product-list')).toContainElement(getByText('Orange'))

      
    })
})