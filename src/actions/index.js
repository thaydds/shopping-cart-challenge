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

export const cartShippingCalc = (products, coupon, subtotal) => {
  const kg = products.reduce((sum, product) => {
    return sum + product.amount;
  }, 0);
  let shippingPrice = kg === 0 ? 0 : 30;
  if (kg > 10) {
    shippingPrice += Math.floor(kg / 5 - 2) * 7;
  }
  if (subtotal > 400) {
    shippingPrice = 0;
  }
  if (coupon.length > 0 && coupon[0].type === "Free Shipping") {
    shippingPrice = subtotal >= coupon[0].min ? 0 : shippingPrice;
  }
  return { type: CART_SHIPPING_CALC, shippingPrice: shippingPrice };
};

export const cartTotalCalc = (subtotal, shipping, coupon) => {
  let discount = 0;
  if (coupon.length > 0 && coupon[0].type === "Fixed") {
    discount = coupon[0].effect;
  }
  let total = subtotal + shipping - discount;
  if (total < 0) {
    total = 0;
  }
  return { type: CART_TOTAL_CALC, total: total };
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
