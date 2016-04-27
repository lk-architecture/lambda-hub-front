import "babel-polyfill";
import "aws-sdk/dist/aws-sdk";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import auth0Init from "lib/auth0";
import history from "lib/history";
import routes from "lib/routes";
import store from "lib/store";

auth0Init(store, history);

const App = (
    <Provider store={store}>
        {routes}
    </Provider>
);

ReactDOM.render(App, document.getElementById("root"));
