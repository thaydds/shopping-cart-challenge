import { createStore } from "redux";
import {
  CART_PRODUCT_AMOUNT_ADD,
  CART_PRODUCT_AMOUNT_SUB,
  CART_SUBTOTAL_CALC,
  CART_TOTAL_CALC,
  CART_RESET,
  CART_SHIPPING_CALC,
  CART_CUPOM_SUB,
  CART_CUPOM_ADD
} from "../actions";

const products = [
  { name: "Apple", desc: "sweet and delicious", price: 8, amount: 0 },
  { name: "Banana", desc: "the best of the world", price: 4, amount: 0 },
  { name: "Orange", desc: "orange orange", price: 3, amount: 0 }
];

// Percentual coupon: are coupons that reduce an amount in percentage of the cost on subtotal.
// Fixed coupon: are coupons with fixed amounts that should reduce over the TOTAL.
// Free Shipping: make the shipping price become 0 when applied, and should have a minimum subtotal requirement

const enabledCupons = [
  { key: "A", type: "Percentual", effect: 0.3, active: false, min: 0 },
  { key: "FOO", type: "Fixed", effect: 100, active: false, min: 0 },
  { key: "C", type: "Free Shipping", effect: 0, active: false, min: 300.5 }
];

export const initialState = {
  products: products,
  shipping: 0,
  subtotal: 0,
  total: 0,
  cupoms: enabledCupons,
  cupom: []
};

// cart reducer

export function cart(state = initialState, action) {
  switch (action.type) {
    case CART_PRODUCT_AMOUNT_ADD:
      return { ...state, products: action.products };
    // case CART_PRODUCT_AMOUNT_SUB:
    //     return {...state, products: action.products}
    // case CART_SUBTOTAL_CALC:
    //     return {...state, subtotal: action.subtotal}
    // case CART_TOTAL_CALC:
    //     return {...state, total: action.total}
    // case CART_SHIPPING_CALC:
    //     return {...state, shipping: action.shippingPrice}
    // case CART_CUPOM_ADD:
    //     return {...state, cupom: action.enabledCupom}
    // case CART_CUPOM_SUB:
    //     return {...state, cupom: []}
    // case CART_RESET:
    //     return initialState
    default:
      return state;
  }
}

// create store
const store = createStore(cart);

export default store;
