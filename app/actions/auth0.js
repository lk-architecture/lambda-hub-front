export const AUTH0_SET_TOKEN = "AUTH0_SET_TOKEN";
export const AUTH0_SET_PROFILE = "AUTH0_SET_PROFILE";

export function setToken (token) {
    return {
        type: AUTH0_SET_TOKEN,
        payload: token
    };
}

export function setProfile (profile) {
    return {
        type: AUTH0_SET_PROFILE,
        payload: profile
    };
}
