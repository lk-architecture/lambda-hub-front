import * as config from "config";

import {getDynamodb} from "lib/aws-services";

export const BUILDS_LIST_START = "BUILDS_LIST_START";
export const BUILDS_LIST_SUCCESS = "BUILDS_LIST_SUCCESS";
export const BUILDS_LIST_ERROR = "BUILDS_LIST_ERROR";

export function listBuilds () {
    return async dispatch => {
        try {
            const dynamodb = getDynamodb();
            dispatch({type: BUILDS_LIST_START});
            const result = await dynamodb.scanAsync({
                TableName: config.DYNAMODB_BUILDS_TABLE
            });
            dispatch({
                type: BUILDS_LIST_SUCCESS,
                payload: result.Items
            });
        } catch (error) {
            dispatch({
                type: BUILDS_LIST_ERROR,
                payload: error,
                error: true
            });
        }
    };
}
