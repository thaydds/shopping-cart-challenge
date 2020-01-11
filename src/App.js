import React from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import "./App.scss";

export default function App() {
  // useEffect(() => {
  // 	dispatch(cartSubtotalCalc(cart.products, cart.cupom))
  // }, [cart.products, cart.cupom, dispatch])

  // useEffect(() => {
  // 	dispatch(cartTotalCalc(cart.subtotal, cart.shipping, cart.cupom))
  // }, [cart.subtotal, cart.shipping, cart.cupom, dispatch])

  // useEffect(() => {
  // 	dispatch(cartShippingCalc(cart.products, cart.cupom, cart.subtotal))
  // }, [cart.products, dispatch, cart.cupom, cart.subtotal])

  return (
    <div>
      <Header />
      <Cart />
    </div>
  );
}
