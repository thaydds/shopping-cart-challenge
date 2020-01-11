// actions constants
export const CART_PRODUCT_AMOUNT_ADD = "PRODUCT_AMOUNT_ADD";
export const CART_PRODUCT_AMOUNT_SUB = "PRODUCT_AMOUNT_SUB";

export const CART_SUBTOTAL_CALC = "CART_SUBTOTAL_CALC";
export const CART_TOTAL_CALC = "CART_TOTAL_CALC";
export const CART_SHIPPING_CALC = "CART_SHIPPING_CALC";

export const CART_CUPOM_ADD = "CART_CUPOM_ADD";
export const CART_CUPOM_SUB = "CART_CUPOM_SUB";

export const CART_RESET = "CART_RESET";

export const cartProductAmoundAdd = (productName, products) => {
  let newProducts = products.map(product => {
    if (productName === product.name) {
      return { ...product, amount: product.amount + 1 };
    }
    return product;
  });
  return { type: CART_PRODUCT_AMOUNT_ADD, products: newProducts };
};

export const cartProductAmoundSub = (productName, products) => {
  let newProducts = products.map(product => {
    if (productName === product.name && product.amount > 0) {
      return { ...product, amount: product.amount - 1 };
    }
    return product;
  });
  return { type: CART_PRODUCT_AMOUNT_ADD, products: newProducts };
};
