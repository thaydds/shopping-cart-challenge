import { createStore } from "redux";
import {
  CART_PRODUCT_AMOUNT_ADD,
  CART_PRODUCT_AMOUNT_SUB,
  CART_SUBTOTAL_CALC,
  CART_TOTAL_CALC,
  CART_RESET,
  CART_SHIPPING_CALC,
  CART_COUPON_SUB,
  CART_COUPON_ADD
} from "../actions/constants";
import { products, enabledCoupons } from "./constants";
import {
  productsModifyAmount,
  subtotalCalc,
  shippingCalc,
  totalCalc
} from "./reducerHelper";

export const initialState = {
  products: products,
  shipping: 0,
  subtotal: 0,
  total: 0,
  coupons: enabledCoupons,
  coupon: []
};

export function cart(state = initialState, action) {
  switch (action.type) {
    case CART_PRODUCT_AMOUNT_ADD:
      return {
        ...state,
        products: productsModifyAmount(
          action.productName,
          "ADD",
          state.products
        )
      };
    case CART_PRODUCT_AMOUNT_SUB:
      return {
        ...state,
        products: productsModifyAmount(
          action.productName,
          "SUB",
          state.products
        )
      };
    case CART_SUBTOTAL_CALC:
      return { ...state, subtotal: subtotalCalc(state.products, state.coupon) };
    case CART_TOTAL_CALC:
      return {
        ...state,
        total: totalCalc(state.subtotal, state.shipping, state.coupon)
      };
    case CART_SHIPPING_CALC:
      return {
        ...state,
        shipping: shippingCalc(state.products, state.coupon, state.subtotal)
      };
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
const store = createStore(
  cart,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
