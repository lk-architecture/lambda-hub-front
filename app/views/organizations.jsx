import Table from "bootstrap-table-react";
import {values} from "ramda";
import React, {Component, PropTypes} from "react";
import {Button, Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {listOrganizations} from "actions/organizations";
import Icon from "components/icon";
import * as AppPropTypes from "lib/app-prop-types";
import history from "lib/history";

class Organizations extends Component {

    static propTypes = {
        listOrganizations: PropTypes.func.isRequired,
        organizations: AppPropTypes.organizations
    }

    componentWillMount () {
        this.props.listOrganizations();
    }

    render () {
        const {organizations} = this.props;
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
                            valueFormatter: () => (
                                <Icon
                                    icon="trash"
                                />
                            )
                        }
                    ]}
                    onRowClick={(event) => history.push(`/organization/${event.name}`)}
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
        listOrganizations: bindActionCreators(listOrganizations, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
