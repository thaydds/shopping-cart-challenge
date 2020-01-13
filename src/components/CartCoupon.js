import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartCouponAdd } from "../actions";

const CartCoupon = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
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
      setError({ ...error, status: false });
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (
      enabledCoupon.length > 0 &&
      enabledCoupon[0].type === "Free Shipping" &&
      cart.subtotal >= enabledCoupon[0].min
    ) {
      setError({ ...error, status: false });
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (
      enabledCoupon.length > 0 &&
      enabledCoupon[0].type === "Free Shipping" &&
      cart.subtotal < enabledCoupon[0].min
    ) {
      setError({
        status: true,
        message: `Minimum subtotal requirement to use this coupon is ${enabledCoupon[0].min}`
      });
    } else {
      setError({
        status: true,
        message: `Invalid coupon. You can try: A, C, FOO`
      });
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
              data-testid="input-coupon"
              onChange={e => setQuery(e.target.value.toUpperCase().trim())}
              type="text"
            />
            <button
              data-testid="add-coupon"
              onClick={e => handleApplyButtom(e)}
            >
              Apply
            </button>
            {error.status ? (
              <div data-testid="error-message" className="error-message">
                invalid coupon. You can try: A, C, FOO
              </div>
            ) : null}
          </form>
        </li>
      </ul>
    </div>
  );
};

export default CartCoupon;
