import { initialState, cart } from "../store";
import * as Action from "../actions";

describe("Shipping Rules", () => {
  it("For purchases above R$400.00 the shipping should be free", () => {
    let state = cart(initialState, Action.cartProductAmountAdd("Banana"));

    for (let loop = 0; loop < 100; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.shipping).toStrictEqual(0);
    expect(state.subtotal).toStrictEqual(404);
  });

  it("For purchases equal or over R$400.00 the shipping should be > 0", () => {
    let state = cart(initialState, Action.cartProductAmountAdd("Banana"));

    for (let loop = 0; loop < 99; loop++) {
      state = cart({ ...state }, Action.cartProductAmountAdd("Banana"));
    }

    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.shipping).toStrictEqual(156);
    expect(state.subtotal).toStrictEqual(400);
  });

  it("For purchases bellow or equal 10kg the shipping price should be $30", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.shipping).toStrictEqual(30);

    for (let loop = 0; loop < 9; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());
    expect(state.shipping).toStrictEqual(30);
  });

  it("Each 5kg above 10kg should add $7 to the shipping price", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    for (let loop = 0; loop < 14; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.shipping).toStrictEqual(37);
  });
});

describe("Coupon Rules", () => {
  const percentualCoupon = [
    { key: "A", type: "Percentual", effect: 0.3, active: false, min: 0 }
  ];
  const shippingCoupon = [
    { key: "C", type: "Free Shipping", effect: 0, active: false, min: 300.5 }
  ];
  const fixedCoupon = [
    { key: "FOO", type: "Fixed", effect: 100, active: false, min: 0 }
  ];

  it("Percentual coupon should reduce an amount in percentage of the cost on subtotal", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    for (let loop = 0; loop < 24; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }

    state = cart({ ...state }, Action.cartCouponAdd(percentualCoupon));
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.subtotal).toStrictEqual(70);
  });

  it("Fixed coupon should reduce over the TOTAL", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    for (let loop = 0; loop < 24; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }
    state = cart({ ...state }, Action.cartCouponAdd(fixedCoupon));
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());
    state = cart({ ...state }, Action.cartTotalCalc());

    expect(state.total).toStrictEqual(51);
  });

  it("Shipping coupon should have a minimum subtotal requirement", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    for (let loop = 0; loop < 74; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }
    state = cart({ ...state }, Action.cartCouponAdd(shippingCoupon));
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());
    state = cart({ ...state }, Action.cartTotalCalc());

    expect(state.shipping).not.toStrictEqual(0);
  });

  it("Shipping coupon should make the shipping price become 0 when applied with a minimum subtotal requiriment", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    for (let loop = 0; loop < 75; loop++) {
      state = cart(
        { ...state },
        Action.cartProductAmountAdd("Banana", state.products)
      );
    }

    state = cart({ ...state }, Action.cartCouponAdd(shippingCoupon));
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());
    state = cart({ ...state }, Action.cartTotalCalc());

    expect(state.shipping).toStrictEqual(0);
  });
});
