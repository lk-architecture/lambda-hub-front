import React, {Component, PropTypes} from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";

import history from "lib/history";

const styles = {
    header: {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        cursor: "pointer"
    },
    userMenu: {
        height: "100%",
        padding: "10px"
    },
    avatar: {
        borderRadius: "100%",
        height: "30px",
        marginRight: "5%"
    },
    userInfo: {
        border: "0px",
        backgroundColor: "white",
        boxShadow: "none",
        WebkitBoxShadow: "none"
    }
};

export default class Header extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        profile: PropTypes.object
    }

    render () {
        const {profile, logout} = this.props;
        return (
            <div style={styles.header}>
                <div>
                    <h4 onClick={() => history.push("/")} style={styles.logo}>
                        {"Lambda Hub™"}
                    </h4>
                </div>
                <div style={styles.userMenu}>
                    <DropdownButton
                        id={"user_dropdown"}
                        noCaret={true}
                        style={styles.userInfo}
                        title={
                            <div>
                                <img src={profile && profile.picture} style={styles.avatar} />
                                <span>{profile && profile.name || "user"}</span>
                            </div>
                        }
                    >
                        <MenuItem eventKey={1} onClick={logout}>
                            {"Logout"}
                        </MenuItem>
                    </DropdownButton>
                </div>
            </div>
        );
    }
}
