import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartCouponAdd } from "../actions";

const CartCoupon = () => {
  const [query, setQuery] = useState("");
  const cart = useSelector(state => state);
  const dispatch = useDispatch();
  const handleApplyButtom = e => {
    e.preventDefault();
    checkCoupom();
  };
  const checkCoupom = () => {
    const enabledCoupon = cart.coupons.filter(c => c.key === query);
    if (
      enabledCoupon.length > 0 &&
      (enabledCoupon[0].type === "Fixed" ||
        enabledCoupon[0].type === "Percentual")
    ) {
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (
      enabledCoupon.length > 0 &&
      enabledCoupon[0].type === "Free Shipping" &&
      cart.subtotal >= enabledCoupon[0].min
    ) {
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (
      enabledCoupon.length > 0 &&
      enabledCoupon[0].type === "Free Shipping" &&
      cart.subtotal < enabledCoupon[0].min
    ) {
      console.log(
        `[ERROR]: Minimum subtotal requirement to use this coupon is ${enabledCoupon[0].min}`
      );
    } else {
      console.log(`[ERROR]: invalid coupon. You can try: A, C, FOO`);
    }
    setQuery("");
  };

  return (
    <div className="coupon_container">
      <ul>
        <li>
          <span>Coupon</span>
          <form className="coupon_container__form">
            <input
              value={query}
              onChange={e => setQuery(e.target.value.toUpperCase().trim())}
              type="text"
            />
            <button onClick={e => handleApplyButtom(e)}>Apply</button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default CartCoupon;
