import React from 'react'
import CartHeader from './CartHeader'
import { render } from '@testing-library/react'

describe('CartHeader component', () =>{
  it('shoulbe be able to render the cart header ', () =>{
      const {getByText, getByTestId} = render(<CartHeader/>)
      expect(getByTestId('cart-header')).toContainElement(getByText('Shopping Cart'))
   })
})
