import {create} from "axios";

import {BACKEND_ENDPOINT, BACKEND_TIMEOUT} from "config";

var client = create({
    baseURL: BACKEND_ENDPOINT,
    timeout: BACKEND_TIMEOUT
});

export function getOrganizations () {
    var response = client.get("/api/organizations");
    return response.data;
}

export function saveOrganization (organization) {
    client.post("/api/organizations", organization);
}

export function getOrganization (organizationName) {
    var response = client.get(`/api/organizations/${organizationName}`);
    return response.data;
}

export function deleteOrganization (organizationName) {
    client.delete(`/api/organizations/${organizationName}`);
}

export function getLambdas (organizationName) {
    var response = client.get(`/api/lambdas/${organizationName}`);
    return response.data;
}

export function saveLambda (organizationName, lambda) {
    client.post(`/api/lambdas/${organizationName}`, lambda);
}

export function getLambda (organizationName, lambdaName) {
    var response = client.get(`/api/lambdas/${organizationName}/${lambdaName}`);
    return response.data;
}

export function deleteLambda (organizationName, lambdaName) {
    client.delete(`/api/lambdas/${organizationName}/${lambdaName}`);
}
