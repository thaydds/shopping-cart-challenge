import { createStore } from "redux";
import {
  CART_PRODUCT_AMOUNT_ADD,
  CART_PRODUCT_AMOUNT_SUB,
  CART_SUBTOTAL_CALC,
  CART_TOTAL_CALC,
  CART_RESET,
  CART_SHIPPING_CALC,
  CART_COUPON_SUB,
  CART_COUPON_ADD,
  enabledCoupons,
  products
} from "../constants";

export const initialState = {
  products: products,
  shipping: 0,
  subtotal: 0,
  total: 0,
  coupons: enabledCoupons,
  coupon: []
};

// cart reducer

export function cart(state = initialState, action) {
  switch (action.type) {
    case CART_PRODUCT_AMOUNT_ADD:
      return { ...state, products: action.products };
    case CART_PRODUCT_AMOUNT_SUB:
      return { ...state, products: action.products };
    case CART_SUBTOTAL_CALC:
      return { ...state, subtotal: action.subtotal };
    case CART_TOTAL_CALC:
      return { ...state, total: action.total };
    case CART_SHIPPING_CALC:
      return { ...state, shipping: action.shippingPrice };
    case CART_COUPON_ADD:
      return { ...state, coupon: action.enabledCoupon };
    case CART_COUPON_SUB:
      return { ...state, coupon: [] };
    case CART_RESET:
      return initialState;
    default:
      return state;
  }
}

// create store
const store = createStore(cart);

export default store;
