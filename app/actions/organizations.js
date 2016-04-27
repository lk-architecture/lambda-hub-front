import {deleteOrganization, getOrganizations, saveOrganization} from "lib/backend";

export const ORGANIZATIONS_LIST_START = "ORGANIZATIONS_LIST_START";
export const ORGANIZATIONS_LIST_SUCCESS = "ORGANIZATIONS_LIST_SUCCESS";
export const ORGANIZATIONS_LIST_ERROR = "ORGANIZATIONS_LIST_ERROR";

export function listOrganizations () {
    return async dispatch => {
        dispatch({type: ORGANIZATIONS_LIST_START});
        getOrganizations().then(response => {
            dispatch({
                type: ORGANIZATIONS_LIST_SUCCESS,
                payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type: ORGANIZATIONS_LIST_ERROR,
                payload: error.statusText,
                error: true
            });
        });
    };
}

export const ORGANIZATION_UPSERT_START = "ORGANIZATION_UPSERT_START";
export const ORGANIZATION_UPSERT_SUCCESS = "ORGANIZATION_UPSERT_SUCCESS";
export const ORGANIZATION_UPSERT_ERROR = "ORGANIZATION_UPSERT_ERROR";
export const ORGANIZATION_UPSERT_RESET_PROGRESS = "ORGANIZATION_UPSERT_RESET_PROGRESS";

export function upsertOrganization (organization) {
    return async dispatch => {
        dispatch({type: ORGANIZATION_UPSERT_START});
        saveOrganization(organization).then(() => {
            dispatch({
                type: ORGANIZATION_UPSERT_SUCCESS,
                payload: organization
            });
            setTimeout(() => {
                dispatch({type: ORGANIZATION_UPSERT_RESET_PROGRESS});
            }, 2000);
        }).catch((error) => {
            dispatch({
                type: ORGANIZATION_UPSERT_ERROR,
                payload: error,
                error: true
            });
        });
    };
}

export const ORGANIZATION_DELETE_START = "ORGANIZATION_DELETE_START";
export const ORGANIZATION_DELETE_SUCCESS = "ORGANIZATION_DELETE_SUCCESS";
export const ORGANIZATION_DELETE_ERROR = "ORGANIZATION_DELETE_ERROR";

export function removeOrganization (organizationName) {
    return async dispatch => {
        dispatch({type: ORGANIZATION_DELETE_START});
        deleteOrganization(organizationName).then(() => {
            dispatch({
                type: ORGANIZATION_DELETE_SUCCESS,
                payload: organizationName
            });
        }).catch((error) => {
            dispatch({
                type: ORGANIZATION_DELETE_ERROR,
                payload: error.statusText,
                error: true
            });
        });
    };
}
