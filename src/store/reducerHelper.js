export const productsModifyAmount = (productName, operator, products) => {
  const newProducts = products.map(product => {
    if (productName === product.name && operator === "ADD") {
      return { ...product, amount: product.amount + 1 };
    } else if (
      productName === product.name &&
      operator === "SUB" &&
      product.amount > 0
    ) {
      return { ...product, amount: product.amount - 1 };
    }
    return product;
  });
  return newProducts;
};

export const subtotalCalc = (products, coupon) => {
  const subtotal = products.reduce((sum, product) => {
    return sum + product.amount * product.price;
  }, 0);
  let discount = 0;
  if (coupon.length > 0 && coupon[0].type === "Percentual") {
    discount = subtotal * coupon[0].effect;
  }
  return subtotal - discount;
};

export const shippingCalc = (products, coupon, subtotal) => {
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
  return shippingPrice;
};

export const totalCalc = (subtotal, shipping, coupon) => {
  let discount = 0;
  if (coupon.length > 0 && coupon[0].type === "Fixed") {
    discount = coupon[0].effect;
  }
  let total = subtotal + shipping - discount;
  if (total < 0) {
    total = 0;
  }
  return total;
};
