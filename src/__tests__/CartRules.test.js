import { initialState, cart } from '../store'
import * as Action from '../actions'

describe('Shipping Rules', () => {
    it('For purchases above R$400.00 the shipping should be free', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))

        for(let loop = 0; loop < 99; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        
        // case when cart subtotal = 400
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))

        expect(state.shipping).toStrictEqual(156)
        expect(state.subtotal).toStrictEqual(400)  
        
        // case when cart subtotal > 400 apply the rule
        state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))

        expect(state.shipping).toStrictEqual(0)
        expect(state.subtotal).toStrictEqual(404)  
 
    })

    it('For purchases bellow or equal 10kg the shipping price should be $30', () => {
        //case when kg = 1
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
            state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
            state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))

        expect(state.shipping).toStrictEqual(30)

        //case when kg = 10
        for(let loop = 0; loop < 9; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        expect(state.shipping).toStrictEqual(30) 
    })

    it('Each 5kg above 10kg should add $7 to the shipping price', () => {
        //case when kg = 14
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        for(let loop = 0; loop < 13; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        expect(state.shipping).toStrictEqual(30) 

        //case when kg = 15
        state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        expect(state.shipping).toStrictEqual(37)
        
        //case when kg = 15
        for(let loop = 0; loop < 15; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        expect(state.shipping).toStrictEqual(58) 
    })
})

describe('Cupom Rules', () => {

    const percentualCupom = [
        {key: 'A', type: 'Percentual', effect: 0.3, active: false},
    ]
    const shippingCupom = [
        {key: 'C', type: 'Free Shipping', effect: 0, active: false},
    ]
    const fixedCupom = [
        {key: 'FOO', type: 'Fixed', effect: 100, active: false},
    ]

    it('Percentual coupon should reduce an amount in percentage of the cost on subtotal', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        for(let loop = 0; loop < 24; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        //reduce 30% of subtotal
        state = cart( {...state}, Action.cartCupomAdd(percentualCupom))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))

        expect(state.subtotal).toStrictEqual(70)
    })

    it('Fixed coupon should reduce over the TOTAL', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        for(let loop = 0; loop < 24; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        //reduce 100% of subtotal
        state = cart( {...state}, Action.cartCupomAdd(fixedCupom))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        state = cart( {...state}, Action.cartTotalCalc( state.subtotal, state.shipping, state.cupom))

        expect(state.total).toStrictEqual(51)

    })

    it('Shipping coupon should make the shipping price become 0 when applied, and should have a minimum subtotal requirement', () => {
        let state = cart( initialState, Action.cartProductAmoundAdd('Banana', initialState.products))
        for(let loop = 0; loop < 24; loop++){
            state = cart( {...state}, Action.cartProductAmoundAdd('Banana', state.products))
        }
        //when subtotal >= 300.50 $ should aplly free shipṕing
        state = cart( {...state}, Action.cartCupomAdd(shippingCupom))
        state = cart( {...state}, Action.cartSubtotalCalc( state.products, state.cupom))
        state = cart( {...state}, Action.cartShippingCalc( state.products, state.cupom, state.subtotal))
        state = cart( {...state}, Action.cartTotalCalc( state.subtotal, state.shipping, state.cupom))

        expect(state.shipping).toStrictEqual(0)
    })
})