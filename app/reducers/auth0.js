import {AUTH0_SET_PROFILE, AUTH0_SET_TOKEN} from "actions/auth0";

const defaultAuth0 = {
    loggedIn: false,
    profile: null,
    token: null
};

export default function auth0 (state = defaultAuth0, {type, payload}) {
    switch (type) {
    case AUTH0_SET_PROFILE:
        return {
            ...state,
            profile: payload
        };
    case AUTH0_SET_TOKEN:
        return {
            ...state,
            loggedIn: true,
            token: payload
        };
    default:
        return state;
    }
}
