import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProducts from "./CartProducts";
import CartCalc from "./CartCalcs";
import Divider from "./Divider";
import CartCoupon from "./CartCoupon";

const Cart = () => {
  const cart = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className="cart_container">
      <div className="cart_container__header">
        <h2>Shopping Cart</h2>
      </div>
      <CartProducts products={cart.products} />
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
