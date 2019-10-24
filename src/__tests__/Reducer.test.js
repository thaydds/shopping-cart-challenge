import { initialState, cart } from '../store'
import * as Action from '../actions'

describe('Cart reducer', () => {
    it('CART_PRODUCT_AMOUNT_ADD', () => {
        const state = cart( initialState, Action.cartProductAmoundAdd('Banana'))

        const product = state.products.filter( p => p.name === 'Banana')

        expect(product[0].amount).toStrictEqual(1)
    })

    it('CART_PRODUCT_AMOUNT_SUB', () => {
        const state = cart( initialState, Action.cartProductAmoundSub('Banana'))

        const product = state.products.filter( p => p.name === 'Banana')

        expect(product[0].amount).toStrictEqual(0)
    })

    it('CART_SUBTOTAL_CALC', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana'))
        state = cart( state, Action.cartProductAmoundAdd('Apple'))
        state = cart( state, Action.cartProductAmoundAdd('Banana'))

        //subtotalcalc
        state = cart( state, Action.cartSubtotalCalc( state.products, state.cupom))

        expect(state.subtotal).toStrictEqual(16)
        
    })

    it('CART_SHIPPING_CALC', () => {
    
        let state = cart( initialState, Action.cartShippingCalc( initialState.products, initialState.cupom))
    
        expect(state.shipping).toStrictEqual(30)
        
    })

    it('CART_TOTAL_CALC', () => {
    
        let state = cart( initialState, Action.cartShippingCalc( initialState.products, initialState.cupom))
        state = cart( state, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( state, Action.cartTotalCalc( state.subtotal, state.shipping, state.cupom))

        expect(state.total).toStrictEqual(46)
        
    })

    it('CART_CUPOM_ADD', () => {
    
        let state = cart( initialState, Action.cartCupomAdd( initialState.cupoms[0]))

       
        expect(state.cupom.key).toStrictEqual('A')
        
    })

    it('CART_CUPOM_SUB', () => {
    
        let state = cart( initialState, Action.cartCupomSub( initialState.products, initialState.cupom))

         expect(state.cupom.length).toStrictEqual(0)
        
    })
})