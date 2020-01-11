import React from "react";

const CartItems = () => {
  return (
    <div className="cart_container__items">
      <ul>
        <li>
          <button>+</button>
          <p>Apple</p>
          <button>-</button>
          <p className="cart_container__items price">$ 0</p>
        </li>
        <li>
          <button>+</button>
          <p>Banana</p>
          <button>-</button>
          <p className="cart_container__items price">$ 0</p>
        </li>
        <li>
          <button>+</button>
          <p>Orange</p>
          <button>-</button>
          <p className="cart_container__items price">$ 0</p>
        </li>
      </ul>
    </div>
  );
};

export default CartItems;
