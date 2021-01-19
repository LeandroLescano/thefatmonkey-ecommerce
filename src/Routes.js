import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/layout";
import { StoreProvider, action, createStore } from "easy-peasy";
import { Provider } from "react-redux";
import store from "./redux/store";

function Routes() {
  const storeP = createStore({
    todos: {
      items: [],
      add: action((state, payload) => {
        state.items.push(payload);
      }),
    },
  });

  // const [shoppingCart, setShoppingCart] = useState({
  //   products: [
  //     {
  //       product: null,
  //       amount: 0,
  //       description: "",
  //     },
  //   ],
  //   totalAmount: 0,
  // });

  // const updateShoppingCart = (newP) => {
  //   if (shoppingCart.products[0].product == null) {
  //     setShoppingCart({
  //       products: [
  //         {
  //           product: newP.product,
  //           amount: +newP.amount,
  //           description: newP.description,
  //         },
  //       ],
  //       totalAmount: newP.product.price * newP.amount,
  //     });
  //   } else {
  //     setShoppingCart((shoppingCart) => ({
  //       ...shoppingCart,
  //       products: [
  //         ...shoppingCart.products,
  //         {
  //           product: newP.product,
  //           amount: +newP.amount,
  //           description: newP.description,
  //         },
  //       ],
  //       totalAmount:
  //         shoppingCart.totalAmount + newP.product.price * newP.amount,
  //     }));
  //   }
  // };

  return (
    <Provider store={store}>
      <StoreProvider store={storeP}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/administrar" component={AdminPage} />
              <Route
                exact
                path="/product/:productCat/:productKey"
                component={ProductPage}
              />
              <Route
                render={function () {
                  return (
                    <div className="mt-5" style={{ justifyContent: "center" }}>
                      <div className="jumbotron">
                        <h2 className="display-4">Oops!</h2>
                        <p className="lead">
                          No pude encontrar la página especificada. Lo siento!
                        </p>
                        <hr className="my-4" />
                        <p>
                          Para volver a la pantalla principal haz click aquí
                          debajo
                        </p>
                        <Link to="/">
                          <p
                            className="btn btn-primary btn-md"
                            href="/"
                            role="button"
                          >
                            The fat monkey
                          </p>
                        </Link>
                      </div>
                    </div>
                  );
                }}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </StoreProvider>
    </Provider>
  );
}

export default Routes;
