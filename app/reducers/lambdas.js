import {
    LAMBDA_DELETE_SUCCESS,
    LAMBDAS_LIST_START,
    LAMBDAS_LIST_SUCCESS,
    LAMBDAS_LIST_ERROR
} from "actions/lambdas";

const defaultOrganizations = {
    fetching: false,
    fetchingError: null,
    collection: []
};

export default function lambdas (state = defaultOrganizations, action) {
    const {type, payload} = action;
    switch (type) {
    case LAMBDAS_LIST_START:
        return {
            ...state,
            fetching: true,
            fetchingError: null
        };
    case LAMBDAS_LIST_SUCCESS:
        return {
            fetching: false,
            fetchingError: null,
            collection: payload.map((value) => {
                return {
                    ...value,
                    id: value.name
                };
            })
        };
    case LAMBDAS_LIST_ERROR:
        return {
            ...state,
            fetching: false,
            fetchingError: payload
        };
    case LAMBDA_DELETE_SUCCESS:
        return {
            fetching: false,
            fetchingError: null,
            collection: state.collection.filter((value) => {
                return value.name !== payload;
            })
        };
    default:
        return state;
    }
}
