import Table from "bootstrap-table-react";
import {values} from "ramda";
import React, {Component, PropTypes} from "react";
import {Button, Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {listOrganizations, removeOrganization} from "actions/organizations";
import Icon from "components/icon";
import * as AppPropTypes from "lib/app-prop-types";
import history from "lib/history";

class Organizations extends Component {

    static propTypes = {
        listOrganizations: PropTypes.func.isRequired,
        organizations: AppPropTypes.organizations,
        removeOrganization: PropTypes.func.isRequired
    }

    componentWillMount () {
        this.props.listOrganizations();
    }

    render () {
        const {organizations, removeOrganization} = this.props;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item active={true}>
                      {"Organizations"}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    collection={values(organizations.collection)}
                    columns={[
                        "name",
                        {
                            key: "remove",
                            valueFormatter: (value, org) => (
                                <Icon
                                    icon="trash"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        removeOrganization(org.name);
                                    }}
                                />
                            )
                        }
                    ]}
                    onRowClick={(org) => history.push(`/organization/${org.name}`)}
                    tableOptions={{
                        hover: true,
                        responsive: true,
                        striped: true
                    }}
                />
                <Button block={true} onClick={() => history.push("/organization")}>
                    {"Create organization"}
                </Button>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        organizations: state.organizations
    };
}
function mapDispatchToProps (dispatch) {
    return {
        listOrganizations: bindActionCreators(listOrganizations, dispatch),
        removeOrganization: bindActionCreators(removeOrganization, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
