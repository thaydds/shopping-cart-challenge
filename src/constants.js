// actions constants
export const CART_PRODUCT_AMOUNT_ADD = "PRODUCT_AMOUNT_ADD";
export const CART_PRODUCT_AMOUNT_SUB = "PRODUCT_AMOUNT_SUB";
export const CART_SUBTOTAL_CALC = "CART_SUBTOTAL_CALC";
export const CART_TOTAL_CALC = "CART_TOTAL_CALC";
export const CART_SHIPPING_CALC = "CART_SHIPPING_CALC";
export const CART_COUPON_ADD = "CART_COUPON_ADD";
export const CART_COUPON_SUB = "CART_COUPON_SUB";
export const CART_RESET = "CART_RESET";

export const products = [
  { name: "Apple", desc: "sweet and delicious", price: 8, amount: 0 },
  { name: "Banana", desc: "the best of the world", price: 4, amount: 0 },
  { name: "Orange", desc: "orange orange", price: 3, amount: 0 }
];

// Percentual coupon: are coupons that reduce an amount in percentage of the cost on subtotal.
// Fixed coupon: are coupons with fixed amounts that should reduce over the TOTAL.
// Free Shipping: make the shipping price become 0 when applied, and should have a minimum subtotal requirement

export const enabledCoupons = [
  { key: "A", type: "Percentual", effect: 0.3, active: false, min: 0 },
  { key: "FOO", type: "Fixed", effect: 100, active: false, min: 0 },
  { key: "C", type: "Free Shipping", effect: 0, active: false, min: 300.5 }
];
