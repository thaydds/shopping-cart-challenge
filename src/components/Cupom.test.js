import React from 'react'
import { render } from '@testing-library/react'
import Cupom from './Cupom'


jest.mock('react-redux')

describe('Cupom component', () => {
    it('should render something',() =>{
       
        const {getByTestId} = render(<Cupom />)


    })
})