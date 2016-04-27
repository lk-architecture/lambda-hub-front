import {
    LAMBDA_UPSERT_START,
    LAMBDA_UPSERT_SUCCESS,
    LAMBDA_UPSERT_ERROR,
    LAMBDA_UPSERT_RESET_PROGRESS
} from "actions/lambdas";

const defaultLambdaCreation = {
    completed: false,
    started: false,
    error: null
};

export default function lambdaCreation (state = defaultLambdaCreation, action) {
    const {payload, type} = action;
    switch (type) {
    case LAMBDA_UPSERT_START:
        return {
            completed: false,
            started: true,
            error: null
        };
    case LAMBDA_UPSERT_SUCCESS:
        return {
            ...state,
            completed: true
        };
    case LAMBDA_UPSERT_ERROR:
        return {
            ...state,
            completed: false,
            error: payload
        };
    case LAMBDA_UPSERT_RESET_PROGRESS:
        return defaultLambdaCreation;
    default:
        return state;
    }
}
