import React, {Component, PropTypes} from "react";
import {Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import UpsertLambdaForm from "components/upsert-lambda-form";
import {upsertLambda} from "actions/lambdas";
import history from "lib/history";

class CreateLambda extends Component {

    static propTypes = {
        lambdaCreation: PropTypes.shape({
            completed : PropTypes.bool,
            error: PropTypes.string
        }),
        organizationName: PropTypes.string,
        upsertLambda: PropTypes.func.isRequired
    }

    handleSubmit (lambda) {
        const {organizationName, upsertLambda} = this.props;
        upsertLambda(organizationName, lambda);
    }

    render () {
        const {organizationName} = this.props;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => history.push("/organizations")}>
                        {"Organizations"}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => history.push(`/organization/${organizationName}`)}>
                      {this.props.organizationName}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active={true}>
                      {"Add a new Lambda"}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <UpsertLambdaForm creationReporter={this.props.lambdaCreation} onSubmit={::this.handleSubmit} />
            </div>
        );
    }
}

function mapStateToProps (state, props) {
    return {
        lambdaCreation: state.lambdaCreation,
        organizationName: props.params.organizationName
    };
}
function mapDispatchToProps (dispatch) {
    return {
        upsertLambda: bindActionCreators(upsertLambda, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateLambda);
