import React from "react";
import PropTypes from "prop-types";
import { cartCouponSub } from "../actions";
import { useDispatch } from "react-redux";

const CartCalc = ({ subtotal, shipping, total, coupon }) => {
  const dispatch = useDispatch();
  const removeCoupon = () => {
    dispatch(cartCouponSub());
  };
  return (
    <div className="cart_container__calc">
      <ul>
        <li>
          <p>Subtotal</p>
          <p className="cart_container__items price">
            {coupon && coupon.type === "Percentual" && (
              <span>
                {`Percentual Coupon (-${coupon.effect * 100}%) of ${(
                  (100 * subtotal) /
                  (100 - coupon.effect * 100)
                ).toFixed(0)}$`}{" "}
                <button onClick={() => removeCoupon()}>x</button>
              </span>
            )}
            {`${subtotal.toFixed(2)} $`}
          </p>
        </li>
        <li>
          <p>Shipping</p>
          <p className="cart_container__items price">
            {coupon &&
              coupon.type === "Free Shipping" && subtotal >= coupon.min && (
                <span>
                  {`Free Shipping Coupon`}{" "}
                  <button onClick={() => removeCoupon()}>x</button>
                </span>
              )}
            {`${shipping.toFixed(2)} $`}
          </p>
        </li>
        <li>
          <p>Total</p>
          <p className="cart_container__items price">
            {coupon &&
              coupon.type === "Fixed" && (
                <span>
                  {`Fixed Coupon -${coupon.effect}$`}{" "}
                  <button onClick={() => removeCoupon()}>x</button>
                </span>
              )}
            {`${total.toFixed(2)} $`}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CartCalc;

CartCalc.propTypes = {
  total: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number
};
