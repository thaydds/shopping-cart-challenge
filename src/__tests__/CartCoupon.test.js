import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import CartCoupon from "../components/CartCoupon";
import { useSelector, useDispatch } from "react-redux";
import { initialState } from "../store";
import { CART_COUPON_ADD } from "../constants";

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
});
