import {combineReducers} from "redux";
import {reducer as form} from "redux-form";

import auth0 from "reducers/auth0";
import builds from "reducers/builds";
import hasRehydrated from "reducers/has-rehydrated";
import lambdaCreation from "reducers/lambda-creation";
import lambdas from "reducers/lambdas";
import organizationCreation from "reducers/organization-creation";
import organizations from "reducers/organizations";
import settings from "reducers/settings";
import settingsCreation from "reducers/settings-creation";

export default combineReducers({
    auth0,
    builds,
    form,
    hasRehydrated,
    lambdaCreation,
    lambdas,
    organizationCreation,
    organizations,
    settings,
    settingsCreation
});
