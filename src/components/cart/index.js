import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProducts from "./products";
import CartCalc from "./calcs";
import Divider from "../common/divider";
import CartCoupon from "./coupon";
import {
  cartTotalCalc,
  cartSubtotalCalc,
  cartShippingCalc
} from "../../actions";
import "./cart.scss";

const Cart = () => {
  const cart = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartSubtotalCalc());
  }, [cart.products, cart.coupon, dispatch]);
  useEffect(() => {
    dispatch(cartTotalCalc());
  }, [cart.subtotal, cart.shipping, cart.coupon, dispatch]);
  useEffect(() => {
    dispatch(cartShippingCalc());
  }, [cart.products, dispatch, cart.coupon, cart.subtotal]);

  return (
    <div className="cart_container">
      <div className="cart_container__header">
        <h2>Shopping Cart</h2>
      </div>
      <CartProducts products={cart.products} />
      <Divider />
      <CartCalc
        total={cart.total}
        subtotal={cart.subtotal}
        shipping={cart.shipping}
        coupon={cart.coupon[0]}
      />
      <Divider />
      <CartCoupon />
      <div className="cart_container__purchase_button">
        <button disabled={cart.total === 0} type="submit">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;
