import { initialState, cart } from '../store'
import * as Action from '../actions'

describe('Cart reducer', () => {
    it('when dipatch CART_PRODUCT_AMOUNT_ADD action should be able to add product amount', () => {
        const state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))

        const product = state.products.filter( p => p.name === 'Banana')

        expect(product[0].amount).toStrictEqual(1)
    })

    it('when dispatch CART_PRODUCT_AMOUNT_SUB action should be able to sub product amount', () => {
        const stateAdd = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        const state = cart( {...stateAdd}, Action.cartProductAmoundSub('Banana', stateAdd.products))

        const product = state.products.filter( p => p.name === 'Banana')

        expect(product[0].amount).toStrictEqual(0)
    })

    it('when dispatch CART_SUBTOTAL_CALC action should be able to calculate cart subtotal', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        state = cart( {...state}, Action.cartProductAmoundAdd('Apple', state.products))
    
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))

        expect(state.subtotal).toStrictEqual(16)
        
    })

    it('when dispatch CART_SHIPPING_CALC action should be able to calculate cart shipping', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        expect(state.shipping).toStrictEqual(30)
        
    })

    it('when CART_TOTAL_CALC action should be able to calculate cart total', () => {
    
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        state = cart( {...state}, Action.cartProductAmoundAdd('Apple', state.products))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        state = cart( {...state}, Action.cartTotalCalc( state.subtotal, state.shipping, state.cupom))

        expect(state.total).toStrictEqual(46)
        
    })

    it('when CART_CUPOM_ADD should be able to add a cupom', () => {    
        let state = cart( initialState, Action.cartCupomAdd( initialState.cupoms[0]))
    
        expect(state.cupom.key).toStrictEqual('A')
        
    })

    it('when CART_CUPOM_SUB should be able to sub a cupom', () => {
        let state = cart( initialState, Action.cartCupomSub( initialState.products, initialState.cupom))

        expect(state.cupom.length).toStrictEqual(0)
    })

    it('when CART_RESET should be able to reset cart', () => {
        let state = cart( initialState, Action.cartCupomSub( initialState.products, initialState.cupom))
        state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        state = cart( {...state}, Action.cartProductAmoundAdd('Apple', state.products))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        state = cart( {...state}, Action.cartTotalCalc( state.subtotal, state.shipping, state.cupom))

        state = cart( {...state}, Action.cartReset())

        expect(state).toStrictEqual(initialState)
    })
})