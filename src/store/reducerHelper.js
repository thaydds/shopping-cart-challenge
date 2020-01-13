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
