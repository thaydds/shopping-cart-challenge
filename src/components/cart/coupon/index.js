import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartCouponAdd } from "../../../actions";
import "./coupon.scss";

const CartCoupon = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState({ status: false, message: "" });
  const cart = useSelector(state => state);
  const dispatch = useDispatch();
  const enabledCoupon = cart.coupons.filter(c => c.key === query);
  const isFixedCoupon =
    enabledCoupon.length > 0 &&
    (enabledCoupon[0].type === "Fixed" ||
      enabledCoupon[0].type === "Percentual");
  const isShippingCoupon =
    enabledCoupon.length > 0 && enabledCoupon[0].type === "Free Shipping";

  const handleApplyButtom = e => {
    e.preventDefault();
    checkCoupom();
  };
  const checkCoupom = () => {
    if (isFixedCoupon) {
      setError({ ...error, status: false });
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (isShippingCoupon && cart.subtotal >= enabledCoupon[0].min) {
      setError({ ...error, status: false });
      dispatch(cartCouponAdd(enabledCoupon));
    } else if (isShippingCoupon && cart.subtotal < enabledCoupon[0].min) {
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
      <div className="teste">
        <p>Coupon</p>
        <div className="coupon_container__form">
          <input
            value={query}
            data-testid="input-coupon"
            onChange={e => setQuery(e.target.value.toUpperCase().trim())}
            type="text"
          />
          <button data-testid="add-coupon" onClick={e => handleApplyButtom(e)}>
            Apply
          </button>
          {error.status && (
            <div data-testid="error-message" className="error-message">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCoupon;