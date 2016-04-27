import {
    ORGANIZATION_UPSERT_START,
    ORGANIZATION_UPSERT_SUCCESS,
    ORGANIZATION_UPSERT_ERROR,
    ORGANIZATION_UPSERT_RESET_PROGRESS
} from "actions/organizations";

const defaultOrganizationCreation = {
    completed: false,
    started: false,
    error: null
};

export default function organizationCreation (state = defaultOrganizationCreation, action) {
    const {payload, type} = action;
    switch (type) {
    case ORGANIZATION_UPSERT_START:
        return {
            completed: false,
            started: true,
            error: null
        };
    case ORGANIZATION_UPSERT_SUCCESS:
        return {
            ...state,
            completed: true
        };
    case ORGANIZATION_UPSERT_ERROR:
        return {
            ...state,
            completed: false,
            error: payload
        };
    case ORGANIZATION_UPSERT_RESET_PROGRESS:
        return defaultOrganizationCreation;
    default:
        return state;
    }
}
