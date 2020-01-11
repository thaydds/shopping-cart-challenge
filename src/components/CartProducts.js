import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { cartProductAmoundAdd, cartProductAmoundSub } from "../actions";

const CartProducts = ({ products }) => {
  const dispatch = useDispatch();
  const addAmount = productName => {
    dispatch(cartProductAmoundAdd(productName, products));
  };
  const subAmount = productName => {
    dispatch(cartProductAmoundSub(productName, products));
  };
  return (
    <div className="cart_container__items">
      <ul>
        {products.map(({ name, amount, price }) => (
          <li key={name}>
            <button onClick={() => addAmount(name)} className="add_buttom">
              +
            </button>
            <p>{name}</p>
            <button onClick={() => subAmount(name)} className="sub_buttom">
              -
            </button>
            <p className="cart_container__items price">{`${amount * price}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartProducts;

CartProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object)
};
