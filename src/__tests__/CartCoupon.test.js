import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import CartCoupon from "../components/cart/coupon";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../store";
import { CART_COUPON_ADD } from "../actions/constants";

jest.mock("react-redux");

describe("Cupom component", () => {
  it("should to dispatch a CART_CUPOM_ADD action when coupon input is valid", async () => {
    useSelector.mockImplementation(state => state(initialState));

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<CartCoupon />);

    const inputNode = await waitForElement(() => getByTestId("input-coupon"));
    const buttonNode = await waitForElement(() => getByTestId("add-coupon"));

    const couponName = "FOO";

    fireEvent.change(inputNode, { target: { value: couponName } });

    expect(inputNode.value).toEqual(couponName);

    fireEvent.click(buttonNode);

    expect(dispatch).toHaveBeenCalledWith({
      type: CART_COUPON_ADD,
      enabledCoupon: [
        {
          active: false,
          effect: 100,
          key: "FOO",
          type: "Fixed",
          min: 0
        }
      ]
    });
  });
  it("should be able to render a div below input field when coupon doesn't exists", () => {
    const { getByTestId, getByText } = render(<CartCoupon />);

    const inputNode = getByTestId("input-coupon");
    const buttonNode = getByTestId("add-coupon");

    const couponName = "CODEMINER";

    fireEvent.change(inputNode, { target: { value: couponName } });
    fireEvent.click(buttonNode);

    expect(getByTestId("error-message")).toContainElement(
      getByText("Invalid coupon. You can try: A, C, FOO")
    );
  });
  it("should be able to render an error message when the shipping coupon was applied without the min value ", () => {
    const { getByText, getByTestId } = render(<CartCoupon />);

    const inputNode = getByTestId("input-coupon");
    const buttonNode = getByTestId("add-coupon");

    const couponName = "C";
    const minValue = 300.5;

    fireEvent.change(inputNode, { target: { value: couponName } });
    fireEvent.click(buttonNode);

    expect(getByTestId("error-message")).toContainElement(
      getByText(
        `Minimum subtotal requirement to use this coupon is ${minValue}`
      )
    );
  });
});
