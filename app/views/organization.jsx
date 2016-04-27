import Table from "bootstrap-table-react";
import React, {Component, PropTypes} from "react";
import {Button, Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {listLambdas, removeLambda} from "actions/lambdas";
import Icon from "components/icon";
import history from "lib/history";

class Organization extends Component {

    static propTypes = {
        lambdasCollection: PropTypes.array,
        listLambdas: PropTypes.func.isRequired,
        organizationName: PropTypes.string.isRequired,
        removeLambda: PropTypes.func.isRequired
    }

    componentWillMount () {
        const {organizationName, listLambdas} = this.props;
        listLambdas(organizationName);
    }

    removeLambda (lambdaName) {
        const {organizationName, removeLambda} = this.props;
        removeLambda(organizationName, lambdaName);
    }

    render () {
        var {lambdasCollection, organizationName} = this.props;
        return organizationName ? (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => history.push("/organizations")}>
                        {"Organizations"}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active={true}>
                      {organizationName}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    collection={lambdasCollection}
                    columns={[
                        "name",
                        "sourceRepository",
                        {
                            key: "build",
                            valueFormatter: () => (
                                <Icon
                                    icon="cubes"
                                />
                            )
                        },
                        {
                            key: "deploy",
                            valueFormatter: () => (
                                <Icon
                                    icon="cogs"
                                />
                            )
                        },
                        {
                            key: "remove",
                            valueFormatter: (value, lambda) => (
                                <Icon
                                    icon="trash"
                                    onClick={() => {
                                        this.removeLambda(lambda.name);
                                    }}
                                />
                            )
                        }
                    ]}
                />
                <Button block={true} onClick={() => history.push(`/organization/${organizationName}/lambda`)}>
                    {"Add Lambda"}
                </Button>
            </div>
        ) : null;
    }
}

function mapStateToProps (state, props) {
    return {
        lambdasCollection: state.lambdas.collection,
        organizationName: props.params.organizationName
    };
}
function mapDispatchToProps (dispatch) {
    return {
        listLambdas: bindActionCreators(listLambdas, dispatch),
        removeLambda: bindActionCreators(removeLambda, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Organization);
