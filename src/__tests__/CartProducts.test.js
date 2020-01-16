import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CartProducts from "../components/cart/products";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../store";
import { cartProductAmountAdd, cartProductAmountSub } from "../actions";

jest.mock("react-redux");

describe("ProducList component", () => {
  it("should be able to render a list of products", () => {
    const { getByTestId, getByText } = render(
      <CartProducts products={initialState.products} />
    );

    expect(getByTestId("product-list")).toContainElement(getByText("Banana"));
    expect(getByTestId("product-list")).toContainElement(getByText("Apple"));
    expect(getByTestId("product-list")).toContainElement(getByText("Orange"));
  });
  it("should be able to dispatch a CART_PRODUCT_AMOUNT_ADD/CART_PRODUCT_AMOUNT_SUB action", () => {
    useSelector.mockImplementation(cart => cart(initialState));

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId, getAllByTestId } = render(
      <CartProducts products={initialState.products} />
    );

    fireEvent.click(getByTestId("add-amount-Banana"));

    expect(dispatch).toHaveBeenCalledWith(
      cartProductAmountAdd("Banana", initialState.products)
    );

    fireEvent.click(getByTestId("sub-amount-Banana"));

    expect(dispatch).toHaveBeenCalledWith(
      cartProductAmountSub("Banana", initialState.products)
    );
  });
});
