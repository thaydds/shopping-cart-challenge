import { createStore } from 'redux'
import {CART_PRODUCT_AMOUNT_ADD, CART_PRODUCT_AMOUNT_SUB, 
        CART_SUBTOTAL_CALC, CART_TOTAL_CALC, 
        CART_SHIPPING_CALC} from '../actions'

const products = [
    { name: 'Apple', desc: 'sweet and delicious', price: 8, amount: 0},
    { name: 'Banana', desc: 'the best of the world', price: 4, amount: 0},
    { name: 'Orange', desc: 'orange orange',  price: 3, amount: 0}
]

// Percentual coupon: are coupons that reduce an amount in percentage of the cost on subtotal.
// Fixed coupon: are coupons with fixed amounts that should reduce over the TOTAL.
// Free Shipping: make the shipping price become 0 when applied, and should have a minimum subtotal requirement

const enabledCupons = [
    {key: 'A', type: 'Percentual', effect: 0.3, active: false},
    {key: 'FOO', type: 'Fixed', effect: 100, active: false},
    {key: 'FOO', type: 'Free Shipping', effect: 0, active: false}
]

const initialState = {
    products: products,
    shipping: 0,
    subtotal: 0,
    total: 0,
    cupoms: enabledCupons,
    cumpom: ''
  }

// cart reducer

function cart(state = initialState, action){
    console.log('action', action)
    switch(action.type){
        case CART_PRODUCT_AMOUNT_ADD:
            return {...state, products: state.products.map( p => {
               if (p.name === action.productName) {
                   p.amount += 1
               }
               return p
            })}
        case CART_PRODUCT_AMOUNT_SUB:
            return {...state, products: state.products.map( p => {
                if (p.name === action.productName && p.amount > 0) {
                    p.amount -= 1
                }
                return p
            })}
        case CART_SUBTOTAL_CALC: 
            return {...state, subtotal: state.products.reduce((sum, product) => {
                return sum + (product.amount * product.price)
              }, 0)}
        case CART_TOTAL_CALC: 
            return {...state, total: state.subtotal + state.shipping}
        case CART_SHIPPING_CALC: 
            return {...state, shipping: action.shippingPrice}      
        default:
            return state
    }
}

// create store
const store = createStore(cart)

export default store