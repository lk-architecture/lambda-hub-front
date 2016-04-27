import React, {Component} from "react";
import {Button} from "react-bootstrap";

import Icon from "components/icon";
import * as config from "config";
import * as colors from "lib/colors";

const styles = {
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        padding: "20px",
        backgroundColor: colors.greyBackground
    },
    loginContainer: {
        display: "flex",
        justifyContent: "center"
    },
    loginButton: {
        width: "20%",
        marginTop: "35vh"
    }
};

export default class Auth0 extends Component {

    getAuth0URI () {
        return [
            `https://${config.AUTH0_DOMAIN}/authorize?`,
            "scope=openid",
            "&response_type=token",
            `&client_id=${config.AUTH0_CLIENT_ID}`,
            "&connection=github",
            `&redirect_uri=${location.protocol}//${location.host}/`,
            `&state=${location.pathname}`
        ].join("");
    }

    render () {
        return (
            <div style={styles.container}>
                <div>
                    <h2><strong>{"Lambda Hub™"}</strong></h2>
                </div>
                <div style={styles.loginContainer}>
                    <Button
                        className="btn btn-lg btn-block btn-social btn-github"
                        href={this.getAuth0URI()}
                        style={styles.loginButton}
                    >
                        <Icon icon="github" />
                        {"Login with github"}
                    </Button>
                </div>
            </div>
        );
    }
}
