import React from "react";
import CartItems from "./CartItems";
import CartCalc from "./CartCalcs";
import Divider from "./Divider";
import CartCoupon from "./CartCoupon";

const Cart = () => {
  return (
    <div className="cart_container">
      <div className="cart_container__header">
        <h2>Shopping Cart</h2>
      </div>
      <CartItems />
      <Divider />
      <CartCalc />
      <Divider />
      <CartCoupon />
      <div className="cart_container__purchase_buttom">
        <button>Purchase</button>
      </div>
    </div>
  );
};

export default Cart;
