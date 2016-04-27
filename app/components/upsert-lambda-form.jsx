import {map} from "ramda";
import React, {Component, PropTypes} from "react";
import {Button, Input} from "react-bootstrap";
import {reduxForm} from "redux-form";

import * as AppPropTypes from  "lib/app-prop-types";

function validate (values) {
    return map((value) => {
        return (value != undefined && value.length > 0) ? null : "Required";
    }, values);
}

class UpsertLambdaForm extends Component {

    static propTypes = {
        creationReporter: AppPropTypes.creationReporter.isRequired,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    getFieldBsStyle (field) {
        return (field.touched && field.error ? "error" : null);
    }

    getFieldHelp (field) {
        return (field.touched && field.error);
    }

    render () {
        const {creationReporter, fields, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Input
                    bsStyle={this.getFieldBsStyle(fields.name)}
                    help={this.getFieldHelp(fields.name)}
                    label="Name"
                    placeholder="lambda-my-name"
                    type="text"
                    {...fields.name}
                />
                <Input
                    bsStyle={this.getFieldBsStyle(fields.sourceRepository)}
                    help={this.getFieldHelp(fields.sourceRepository)}
                    label="Source repository"
                    placeholder="https://github.com/organizations/lk-app-front.tar.gz"
                    type="text"
                    {...fields.sourceRepository}
                />
                <Button
                    bsStyle={creationReporter.completed ? "success" : "default"}
                    disabled={creationReporter.started}
                    type="submit"
                >
                    {creationReporter.completed ? "Succesfully saved" : creationReporter.started ? "Saving" : "Save"}
                </Button>
            </form>
        );
    }

}

export default reduxForm({
    form: "lambda",
    fields: [
        "name",
        "sourceRepository"
    ],
    validate: validate
})(UpsertLambdaForm);
