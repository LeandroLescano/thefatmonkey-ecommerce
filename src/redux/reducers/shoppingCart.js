const defaultState = {
  products: [],
  totalAmount: 0,
};

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case "addProducts": {
      if (state.products.length <= 0) {
        return {
          products: [
            {
              product: payload.product,
              amount: +payload.amount,
              description: payload.description,
              url: payload.url,
            },
          ],
          totalAmount: payload.product.price * payload.amount,
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            {
              product: payload.product,
              amount: +payload.amount,
              description: payload.description,
              url: payload.url,
            },
          ],
          totalAmount:
            state.totalAmount + payload.product.price * payload.amount,
        };
      }
    }
    case "deleteProduct": {
      if (state.products.length > 1) {
        state.totalAmount =
          state.totalAmount -
          state.products[payload].product.price *
            state.products[payload].amount;
        state.products.splice(payload, 1);
        return { ...state };
      } else {
        return defaultState;
      }
    }
    case "modifyProduct": {
      state.products[payload["index"]].amount = payload["amount"];
      let total = 0;
      state.products.map((item) => {
        return (total += item.amount * item.product.price);
      });
      state.totalAmount = total;
      return { ...state };
    }
    default:
      return state;
  }
}

export default reducer;
