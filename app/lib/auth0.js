import axios from "axios";
import {parse} from "qs";

import {setProfile, setToken} from "actions/auth0";
import * as config from "config";

function decodeBase64Url (string) {
    // Add removed at end "="
    if (string.length % 4 !== 0) {
        string += Array(5 - string.length % 4).join("=");
    }
    string = string
        .replace(/\-/g, "+") // Convert '-' to '+'
        .replace(/\_/g, "/"); // Convert '_' to '/'
    return window.atob(string);
}

function decodeJwt (jwt) {
    const encoded = jwt && jwt.split(".")[1];
    return JSON.parse(decodeBase64Url(encoded));
}

function parseHash () {
    const hash = window.location.hash;
    return parse(hash.slice(1).replace(/^\//, ""));
}

export default function auth0Init (store, history) {
    const hash = parseHash();
    const auth0UserToken = localStorage.auth0UserToken || hash.id_token;
    // Check token exists
    if (!auth0UserToken) {
        return;
    }
    const decodedToken = decodeJwt(auth0UserToken);
    // Check token expiry date
    if (decodedToken.exp < (Date.now() / 1000)) {
        // Delete the expired token from localStorage and from the hash
        delete localStorage.auth0UserToken;
        history.replace("/");
        return;
    }
    localStorage.auth0UserToken = auth0UserToken;
    store.dispatch(setToken(auth0UserToken));
    history.replace(hash.state || "/");
    // Retrieve the user profile
    const profileUrl = `https://${config.AUTH0_DOMAIN}/tokeninfo`;
    axios.post(profileUrl, {id_token: auth0UserToken})
        .then(res => store.dispatch(setProfile(res.data)));
}
