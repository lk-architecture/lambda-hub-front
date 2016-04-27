import React from "react";
import {IndexRoute, Route, Router} from "react-router";

import history from "lib/history";
import Organization from "views/organization";
import Organizations from "views/organizations";
import CreateOrganization from "views/create-organization";
import CreateLambda from "views/create-lambda";
import Settings from "views/settings";
import Root from "views/root";

export default (
    <Router history={history}>
        <Route component={Root} path="/">
            <IndexRoute component={Organizations} />
            <Route component={Organization} path="/organization/:organizationName" />
            <Route component={Organizations} path="/organizations" />
            <Route component={CreateOrganization} path="/organization" />
            <Route component={CreateLambda} path="/organization/:organizationName/lambda" />
            <Route component={Settings} path="/settings" />
        </Route>
    </Router>
);
