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
