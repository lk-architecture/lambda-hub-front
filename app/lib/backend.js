import {create} from "axios";

import {BACKEND_ENDPOINT, BACKEND_TIMEOUT} from "config";
import store from "lib/store";

var clientInstance;

function getClient () {
    if (undefined === clientInstance) {
        clientInstance = create({
            baseURL: BACKEND_ENDPOINT,
            timeout: BACKEND_TIMEOUT,
            headers: {
                "Authorization": `Bearer ${store.getState().auth0.token}`
            }
        });
    }
    return clientInstance;
}

export function getOrganizations () {
    return getClient().get("/organizations");
}

export function saveOrganization (organization) {
    return getClient().post("/organizations", organization);
}

export function getOrganization (organizationName) {
    return getClient().get(`/organizations/${organizationName}`);
}

export function deleteOrganization (organizationName) {
    return getClient().delete(`/organizations/${organizationName}`);
}

export function getLambdas (organizationName) {
    return getClient().get(`/lambdas/${organizationName}`);
}

export function saveLambda (organizationName, lambda) {
    return getClient().post(`/lambdas/${organizationName}/`, lambda);
}

export function getLambda (organizationName, lambdaName) {
    return getClient().get(`/lambdas/${organizationName}/${lambdaName}`);
}

export function deleteLambda (organizationName, lambdaName) {
    return getClient().delete(`/lambdas/${organizationName}/${lambdaName}`);
}
