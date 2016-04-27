import {
    ORGANIZATION_DELETE_SUCCESS,
    ORGANIZATIONS_LIST_START,
    ORGANIZATIONS_LIST_SUCCESS,
    ORGANIZATIONS_LIST_ERROR
} from "actions/organizations";

const defaultOrganizations = {
    fetching: false,
    fetchingError: null,
    collection: []
};

export default function organizations (state = defaultOrganizations, action) {
    const {type, payload} = action;
    switch (type) {
    case ORGANIZATIONS_LIST_START:
        return {
            ...state,
            fetching: true,
            fetchingError: null
        };
    case ORGANIZATIONS_LIST_SUCCESS:
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
    case ORGANIZATIONS_LIST_ERROR:
        return {
            ...state,
            fetching: false,
            fetchingError: payload
        };
    case ORGANIZATION_DELETE_SUCCESS:
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
