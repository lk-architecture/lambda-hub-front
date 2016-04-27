import React, {Component, PropTypes} from "react";
import {Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {upsertOrganization} from "actions/organizations";
import UpsertOrganizationForm from "components/upsert-organization-form";
import * as AppPropTypes from "lib/app-prop-types";
import history from "lib/history";

class CreateOrganization extends Component {

    static propTypes = {
        organizationCreation: AppPropTypes.creationReporter,
        upsertOrganization: PropTypes.func
    }

    handleSubmit (organization) {
        this.props.upsertOrganization(organization);
    }

    render () {
        var {organizationCreation} = this.props;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => history.push("/organizations")}>
                        {"Organizations"}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active={true}>
                      {"Add a new Organization"}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <UpsertOrganizationForm creationReporter={organizationCreation} onSubmit={::this.handleSubmit}/>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        organizationCreation: state.organizationCreation
    };
}
function mapDispatchToProps (dispatch) {
    return {
        upsertOrganization: bindActionCreators(upsertOrganization, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization);
