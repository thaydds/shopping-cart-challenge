import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProducts from "./CartProducts";
import CartCalc from "./CartCalcs";
import Divider from "./Divider";
import CartCoupon from "./CartCoupon";
import { cartTotalCalc, cartSubtotalCalc, cartShippingCalc } from "../actions";

const Cart = () => {
  const cart = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartSubtotalCalc());
  }, [cart.products, cart.coupon, dispatch]);
  useEffect(() => {
    dispatch(cartTotalCalc(cart.subtotal, cart.shipping, cart.coupon));
  }, [cart.subtotal, cart.shipping, cart.coupon, dispatch]);
  useEffect(() => {
    dispatch(cartShippingCalc(cart.products, cart.coupon, cart.subtotal));
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
      <div className="cart_container__purchase_buttom">
        <button>Purchase</button>
      </div>
    </div>
  );
};

export default Cart;
