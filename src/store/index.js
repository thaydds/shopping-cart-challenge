import { createStore } from 'redux'
import {CART_PRODUCT_AMOUNT_ADD, CART_PRODUCT_AMOUNT_SUB, 
        CART_SUBTOTAL_CALC, CART_TOTAL_CALC, 
        CART_SHIPPING_CALC} from '../actions'

const products = [
    { name: 'Apple', desc: 'sweet and delicious', price: 8, amount: 0},
    { name: 'Banana', desc: 'the best of the world', price: 4, amount: 0},
    { name: 'Orange', desc: 'orange orange',  price: 3, amount: 0}
]   

const initialState = {
    products: products,
    shipping: 0,
    subtotal: 0,
    total: 0,
    kg: 0,
    cupoms: []
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