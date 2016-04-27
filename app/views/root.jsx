import {isEmpty} from "ramda";
import React, {Component, PropTypes} from "react";
import {Grid} from "react-bootstrap";
import {connect} from "react-redux";

import Auth0 from "components/auth0";
import Header from "components/header";
import measures from "lib/measures";
import Settings from "views/settings";

const styles = {
    header: {
        width: "100%",
        height: measures.headerHeightPx
    },
    content: {
        width: "100%"
    }
};

class Root extends Component {

    static propTypes = {
        auth0: PropTypes.any,
        children: PropTypes.node.isRequired,
        emptySettings: PropTypes.bool.isRequired,
        hasRehydrated: PropTypes.bool.isRequired,
        profile: PropTypes.any
    };

    logout () {
        window.localStorage.removeItem("auth0UserToken");
        location.reload();
    }

    renderApp () {
        const {auth0 : {profile}, children, emptySettings} = this.props;
        return (
            <div>
                <Grid>
                    <div style={styles.header}>
                        <Header
                            logout={::this.logout}
                            profile={profile}
                        />
                    </div>
                </Grid>
                <hr style={{marginTop: "0px"}} />
                <Grid>
                    <div style={styles.content}>
                        {emptySettings ? <Settings /> : children}
                    </div>
                </Grid>
            </div>
        );
    }

    renderAuth0 () {
        return (
            <Auth0 />
        );
    }

    render () {
        const {auth0, hasRehydrated} = this.props;
        return (hasRehydrated && auth0.loggedIn ? this.renderApp() : this.renderAuth0());
    }

}

function mapStateToProps (state) {
    return {
        auth0: state.auth0,
        emptySettings: isEmpty(state.settings),
        hasRehydrated: state.hasRehydrated
    };
}
export default connect(mapStateToProps)(Root);
