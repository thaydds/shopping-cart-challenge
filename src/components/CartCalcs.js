import React from "react";
import PropTypes from "prop-types";

const CartCalc = ({ subtotal, shipping, total }) => {
  return (
    <div className="cart_container__calc">
      <ul>
        <li>
          <p>Subtotal</p>
          <p className="cart_container__items price">{`${subtotal.toFixed(
            2
          )} $`}</p>
        </li>
        <li>
          <p>Shipping</p>
          <p className="cart_container__items price">{`${shipping.toFixed(
            2
          )} $`}</p>
        </li>
        <li>
          <p>Total</p>
          <p className="cart_container__items price">{`${total.toFixed(
            2
          )} $`}</p>
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
