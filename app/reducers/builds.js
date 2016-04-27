import {
    BUILDS_LIST_START,
    BUILDS_LIST_SUCCESS,
    BUILDS_LIST_ERROR
} from "actions/builds";

const defaultOrganizations = {
    fetching: false,
    fetchingError: null,
    collection: []
};

export default function builds (state = defaultOrganizations, action) {
    const {type, payload} = action;
    switch (type) {
    case BUILDS_LIST_START:
        return {
            ...state,
            fetching: true,
            fetchingError: null
        };
    case BUILDS_LIST_SUCCESS:
        return {
            fetching: false,
            fetchingError: null,
            collection: payload.map((value) => {
                return {
                    id: value.name,
                    name: value.name
                };
            })
        };
    case BUILDS_LIST_ERROR:
        return {
            ...state,
            fetching: false,
            fetchingError: payload
        };
    default:
        return state;
    }
}
