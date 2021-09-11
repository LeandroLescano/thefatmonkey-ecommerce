import { createStore, combineReducers } from "redux";
import shoppingCart from "./reducers/shoppingCart";
import flags from "./reducers/flags";

const reducer = combineReducers({
  shoppingCart,
  flags,
});

const persistedState = () => {
  try {
    const serializedState = localStorage.getItem("shopCart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const store = createStore(
  reducer,
  { shoppingCart: persistedState(), flags: flags },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().shoppingCart);
    localStorage.setItem("shopCart", serializedState);
  } catch {
    // ignore write errors
  }
});

export default store;
