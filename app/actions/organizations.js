import * as config from "config";

import {getDynamodb} from "lib/aws-services";

export const ORGANIZATIONS_LIST_START = "ORGANIZATIONS_LIST_START";
export const ORGANIZATIONS_LIST_SUCCESS = "ORGANIZATIONS_LIST_SUCCESS";
export const ORGANIZATIONS_LIST_ERROR = "ORGANIZATIONS_LIST_ERROR";

export function listOrganizations () {
    return async dispatch => {
        try {
            const dynamodb = getDynamodb();
            dispatch({type: ORGANIZATIONS_LIST_START});
            const result = await dynamodb.scanAsync({
                TableName: config.DYNAMODB_ORGANIZATIONS_TABLE
            });
            dispatch({
                type: ORGANIZATIONS_LIST_SUCCESS,
                payload: result.Items
            });
        } catch (error) {
            dispatch({
                type: ORGANIZATIONS_LIST_ERROR,
                payload: error,
                error: true
            });
        }
    };
}

export const ORGANIZATION_UPSERT_START = "ORGANIZATION_UPSERT_START";
export const ORGANIZATION_UPSERT_SUCCESS = "ORGANIZATION_UPSERT_SUCCESS";
export const ORGANIZATION_UPSERT_ERROR = "ORGANIZATION_UPSERT_ERROR";
export const ORGANIZATION_UPSERT_RESET_PROGRESS = "ORGANIZATION_UPSERT_RESET_PROGRESS";

export function upsertOrganization (organization) {
    return async dispatch => {
        try {
            const dynamodb = getDynamodb();
            dispatch({type: ORGANIZATION_UPSERT_START});
            await dynamodb.putAsync({
                TableName: config.DYNAMODB_ORGANIZATIONS_TABLE,
                Item: organization
            });
            dispatch({
                type: ORGANIZATION_UPSERT_SUCCESS,
                payload: organization
            });
            setTimeout(() => {
                dispatch({type: ORGANIZATION_UPSERT_RESET_PROGRESS});
            }, 2000);
        } catch (error) {
            dispatch({
                type: ORGANIZATION_UPSERT_ERROR,
                payload: error,
                error: true
            });
        }
    };
}
