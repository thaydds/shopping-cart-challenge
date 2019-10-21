import { createStore } from 'redux'
import {CART_PRODUCT_AMOUNT_ADD, CART_PRODUCT_AMOUNT_SUB} from '../actions'

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
    switch(action.type){
        case CART_PRODUCT_AMOUNT_ADD:
            return {...state, products: state.products.map( p => {
               if (p.name == action.productName) {
                   p.amount += 1
                   return p
               }
            })}
        case CART_PRODUCT_AMOUNT_SUB:
            return {...state, products: state.products.map( p => {
                if (p.name == action.productName) {
                    p.amount -= 1
                    return p
                }
            })}
        default:
            return state
    }
}

// create store
const store = createStore(cart)

export default store