import {
  CART_PRODUCT_AMOUNT_ADD,
  CART_PRODUCT_AMOUNT_SUB,
  CART_SUBTOTAL_CALC,
  CART_TOTAL_CALC,
  CART_RESET,
  CART_SHIPPING_CALC,
  CART_COUPON_SUB,
  CART_COUPON_ADD
} from "../constants";

export const cartProductAmountAdd = productName => {
  return { type: CART_PRODUCT_AMOUNT_ADD, productName };
};

export const cartProductAmountSub = productName => {
  return { type: CART_PRODUCT_AMOUNT_SUB, productName };
};

export const cartSubtotalCalc = () => {
  return { type: CART_SUBTOTAL_CALC };
};

export const cartShippingCalc = () => {
  return { type: CART_SHIPPING_CALC };
};

export const cartTotalCalc = () => {
  return { type: CART_TOTAL_CALC };
};

export const cartCouponAdd = enabledCoupon => {
  return { type: CART_COUPON_ADD, enabledCoupon };
};

export const cartCouponSub = () => {
  return { type: CART_COUPON_SUB };
};

export const cartReset = () => {
  return {
    type: CART_RESET
  };
};
