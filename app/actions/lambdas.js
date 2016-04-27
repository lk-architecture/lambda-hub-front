import * as config from "config";

import {getDynamodb} from "lib/aws-services";

export const LAMBDAS_LIST_START = "LAMBDAS_LIST_START";
export const LAMBDAS_LIST_SUCCESS = "LAMBDAS_LIST_SUCCESS";
export const LAMBDAS_LIST_ERROR = "LAMBDAS_LIST_ERROR";

export function listLambdas () {
    return async dispatch => {
        try {
            const dynamodb = getDynamodb();
            dispatch({type: LAMBDAS_LIST_START});
            const result = await dynamodb.scanAsync({
                TableName: config.DYNAMODB_LAMBDAS_TABLE
            });
            dispatch({
                type: LAMBDAS_LIST_SUCCESS,
                payload: result.Items
            });
        } catch (error) {
            dispatch({
                type: LAMBDAS_LIST_ERROR,
                payload: error,
                error: true
            });
        }
    };
}

export const LAMBDA_UPSERT_START = "LAMBDA_UPSERT_START";
export const LAMBDA_UPSERT_SUCCESS = "LAMBDA_UPSERT_SUCCESS";
export const LAMBDA_UPSERT_ERROR = "LAMBDA_UPSERT_ERROR";
export const LAMBDA_UPSERT_RESET_PROGRESS = "LAMBDA_UPSERT_RESET_PROGRESS";

export function upsertLambda (lambda, organizationName) {
    return async dispatch => {
        try {
            const dynamodb = getDynamodb();
            dispatch({type: LAMBDA_UPSERT_START});
            await dynamodb.putAsync({
                TableName: config.DYNAMODB_LAMBDAS_TABLE,
                Item: {
                    ...lambda,
                    organization: organizationName
                }
            });
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
        } catch (error) {
            dispatch({
                type: LAMBDA_UPSERT_ERROR,
                payload: error,
                error: true
            });
        }
    };
}
