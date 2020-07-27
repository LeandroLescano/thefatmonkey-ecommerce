import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import Layout from "./components/layout";
import { StoreProvider, action, createStore } from "easy-peasy";

function Routes() {
  const store = createStore({
    todos: {
      items: [],
      add: action((state, payload) => {
        state.items.push(payload);
      }),
    },
  });

  return (
    <StoreProvider store={store}>
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
  );
}

export default Routes;
