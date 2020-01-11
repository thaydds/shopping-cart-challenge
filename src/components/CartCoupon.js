import React, { useState } from "react";

const CartCoupon = () => {
  return (
    <div className="coupon_container">
      <ul>
        <li>
          <span>Coupon</span>
          <form className="coupon_container__form">
            <input type="text" />
            <button>Apply</button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default CartCoupon;
