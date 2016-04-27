import {deleteLambda, getLambdas, saveLambda} from "lib/backend";

export const LAMBDAS_LIST_START = "LAMBDAS_LIST_START";
export const LAMBDAS_LIST_SUCCESS = "LAMBDAS_LIST_SUCCESS";
export const LAMBDAS_LIST_ERROR = "LAMBDAS_LIST_ERROR";

export function listLambdas (organizationName) {
    return async dispatch => {
        dispatch({type: LAMBDAS_LIST_START});
        getLambdas(organizationName).then(response => {
            dispatch({
                type: LAMBDAS_LIST_SUCCESS,
                payload: response.data
            });
        }).catch((error) => {
            dispatch({
                type: LAMBDAS_LIST_ERROR,
                payload: error.statusText,
                error: true
            });
        });
    };
}

export const LAMBDA_UPSERT_START = "LAMBDA_UPSERT_START";
export const LAMBDA_UPSERT_SUCCESS = "LAMBDA_UPSERT_SUCCESS";
export const LAMBDA_UPSERT_ERROR = "LAMBDA_UPSERT_ERROR";
export const LAMBDA_UPSERT_RESET_PROGRESS = "LAMBDA_UPSERT_RESET_PROGRESS";

export function upsertLambda (organizationName, lambda) {
    return async dispatch => {
        dispatch({type: LAMBDA_UPSERT_START});
        saveLambda(organizationName, lambda).then(() => {
            dispatch({
                type: LAMBDA_UPSERT_SUCCESS,
                payload: {
                    ...lambda,
                    organization: organizationName
                }
            });
            setTimeout(() => {
                dispatch({type: LAMBDA_UPSERT_RESET_PROGRESS});
            }, 2000);
        }).catch((error) => {
            dispatch({
                type: LAMBDA_UPSERT_ERROR,
                payload: error.statusText,
                error: true
            });
        });
    };
}

export const LAMBDA_DELETE_START = "LAMBDA_DELETE_START";
export const LAMBDA_DELETE_SUCCESS = "LAMBDA_DELETE_SUCCESS";
export const LAMBDA_DELETE_ERROR = "LAMBDA_DELETE_ERROR";

export function removeLambda (organizationName, lambdaName) {
    return async dispatch => {
        dispatch({type: LAMBDA_DELETE_START});
        deleteLambda(organizationName, lambdaName).then(() => {
            dispatch({
                type: LAMBDA_DELETE_SUCCESS,
                payload: lambdaName
            });
        }).catch((error) => {
            dispatch({
                type: LAMBDA_DELETE_ERROR,
                payload: error.statusText,
                error: true
            });
        });
    };
}
