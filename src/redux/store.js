import { createStore, combineReducers } from "redux";
import shoppingCart from "./reducers/shoppingCart";
import flags from "./reducers/flags";

const reducer = combineReducers({
  shoppingCart,
  flags,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
