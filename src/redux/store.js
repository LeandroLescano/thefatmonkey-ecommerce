import { createStore, combineReducers } from "redux";
import shoppingCart from "./reducers/shoppingCart";

const reducer = combineReducers({
  shoppingCart,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
