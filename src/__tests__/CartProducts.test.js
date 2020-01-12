import React from "react";
import { render } from "@testing-library/react";
import CartProducts from "../components/CartProducts";
import { initialState } from "../store";

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

    const { getByTestId } = render(
      <CartProducts products={initialState.products} />
    );

    fireEvent.click(getByTestId("add-amount"));

    expect(dispatch).toHaveBeenCalledWith(
      cartProductAmoundAdd(product.name, products)
    );

    fireEvent.click(getByTestId("sub-amount"));

    expect(dispatch).toHaveBeenCalledWith(
      cartProductAmoundSub(product.name, products)
    );
  });
});
