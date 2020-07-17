import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Layout from "./components/layout";

function Routes() {
    return (
      <BrowserRouter>
        <Layout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          render={function() {
            return(
              <div className="mt-5" style={{justifyContent: "center"}}>
                  <div className="jumbotron">
                  <h2 className="display-4">Oops!</h2>
                  <p className="lead">No pude encontrar la página especificada. Lo siento!</p>
                  <hr className="my-4" />
                  <p>Para volver a la pantalla principal haz click aquí debajo</p>
                  <a className="btn btn-primary btn-md" href="/" role="button">Generador de descuentos</a>
                  </div>
            </div>
              )
          }}
        />
      </Switch>
    </Layout>
    </BrowserRouter>
    );
}

export default Routes;
