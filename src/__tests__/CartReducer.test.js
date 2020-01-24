import { initialState, cart } from "../store";
import * as Action from "../actions";

describe("Cart reducer", () => {
  it("when dipatch CART_PRODUCT_AMOUNT_ADD action should be able to add product amount", () => {
    const state = cart(initialState, Action.cartProductAmountAdd("Banana"));

    const product = state.products.filter(p => p.name === "Banana");

    expect(product[0].amount).toStrictEqual(1);
  });

  it("when dispatch CART_PRODUCT_AMOUNT_SUB action and product amount > 0 should be able to sub product amount", () => {
    let state = cart(initialState, Action.cartProductAmountAdd("Banana"));

    state = cart({ ...state }, Action.cartProductAmountAdd("Banana"));
    state = cart({ ...state }, Action.cartProductAmountSub("Banana"));

    const product = state.products.filter(p => p.name === "Banana");

    expect(product[0].amount).toStrictEqual(1);
  });

  it("when dispatch CART_PRODUCT_AMOUNT_SUB and produc amount === 0 should return 0", () => {
    const state = cart(initialState, Action.cartProductAmountSub("Banana"));
    const product = state.products.filter(p => p.name === "Banana");

    expect(product[0].amount).toStrictEqual(0);
  });

  it("when dispatch CART_SUBTOTAL_CALC action should be able to calculate cart subtotal", () => {
    let state = cart(initialState, Action.cartProductAmountAdd("Banana"));
    state = cart({ ...state }, Action.cartProductAmountAdd("Banana"));
    state = cart({ ...state }, Action.cartProductAmountAdd("Apple"));

    state = cart({ ...state }, Action.cartSubtotalCalc());

    expect(state.subtotal).toStrictEqual(16);
  });

  it("when dispatch CART_SHIPPING_CALC action should be able to calculate cart shipping", () => {
    let state = cart(initialState, Action.cartProductAmountAdd("Banana"));

    state = cart({ ...state }, Action.cartProductAmountAdd("Banana"));
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());

    expect(state.shipping).toStrictEqual(30);
  });

  it("when CART_TOTAL_CALC action should be able to calculate cart total", () => {
    let state = cart(
      initialState,
      Action.cartProductAmountAdd("Banana", initialState.products)
    );
    state = cart(
      { ...state },
      Action.cartProductAmountAdd("Banana", state.products)
    );
    state = cart(
      { ...state },
      Action.cartProductAmountAdd("Apple", state.products)
    );
    state = cart({ ...state }, Action.cartSubtotalCalc());
    state = cart({ ...state }, Action.cartShippingCalc());
    state = cart({ ...state }, Action.cartTotalCalc());

    expect(state.total).toStrictEqual(46);
  });

  it("when CART_COUPON_ADD should be able to add a coupon", () => {
    let state = cart(
      initialState,
      Action.cartCouponAdd(initialState.coupons[0])
    );

    expect(state.coupon.key).toStrictEqual("A");
  });

  it("when CART_COUPON_SUB should be able to sub a coupon", () => {
    let state = cart(
      initialState,
      Action.cartCouponSub(initialState.products, initialState.coupon)
    );

    expect(state.coupon.length).toStrictEqual(0);
  });

  it("when CART_RESET should be able to reset cart", () => {
    let state = cart(
      initialState,
      Action.cartCouponSub(initialState.products, initialState.coupon)
    );
    state = cart(
      { ...state },
      Action.cartProductAmountAdd("Banana", state.products)
    );
    state = cart(
      { ...state },
      Action.cartProductAmountAdd("Apple", state.products)
    );
    state = cart(
      { ...state },
      Action.cartSubtotalCalc(state.products, state.coupon)
    );
    state = cart({ ...state }, Action.cartShippingCalc());
    state = cart({ ...state }, Action.cartTotalCalc());

    state = cart({ ...state }, Action.cartReset());

    expect(state).toStrictEqual(initialState);
  });
});
