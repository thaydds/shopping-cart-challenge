import React from "react";

const CartCalc = () => {
  return (
    <div className="cart_container__calc">
      <ul>
        <li>
          <p>Subtotal</p>
          <p className="cart_container__items price">$ 0</p>
        </li>
        <li>
          <p>Shipping</p>
          <p className="cart_container__items price">$ 0</p>
        </li>
        <li>
          <p>Total</p>
          <p className="cart_container__items price">$ 0</p>
        </li>
      </ul>
    </div>
  );
};

export default CartCalc;
