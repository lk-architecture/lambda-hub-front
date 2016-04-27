import {map} from "ramda";
import React, {Component, PropTypes} from "react";
import {Alert, Button, Input} from "react-bootstrap";
import {reduxForm} from "redux-form";

import Spacer from "components/spacer";
import * as AppPropTypes from "lib/app-prop-types";

function validate (values) {
    return map((value) => {
        return (value != undefined && value.length > 0) ? null : "Required";
    }, values);
}

class UpsertOrganizationForm extends Component {

    static propTypes = {
        creationReporter: AppPropTypes.creationReporter,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired
    }

    getFieldBsStyle (field) {
        return (field.touched && field.error ? "error" : null);
    }

    getFieldHelp (field) {
        return (field.touched && field.error);
    }

    renderErrorMessage () {
        var {creationReporter} = this.props;
        return null === creationReporter.error ? null : (
            <div>
                <Spacer direction={"h"} size={10} />
                <Alert bsStyle="danger">
                    <strong>{"Errore: "}</strong> {creationReporter.error}
                </Alert>
            </div>
        );
    }

    render () {
        const {creationReporter, fields, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Input
                    bsStyle={this.getFieldBsStyle(fields.name)}
                    help={this.getFieldHelp(fields.name)}
                    label="Organization name"
                    placeholder="lk-architecture"
                    type="text"
                    {...fields.name}
                />
                <Button
                    bsStyle={creationReporter.completed ? "success" : "default"}
                    disabled={creationReporter.started}
                    type="submit"
                >
                    {creationReporter.completed ? "Succesfully saved" : creationReporter.started ? "Saving" : "Save"}
                </Button>
                {this.renderErrorMessage()}
            </form>
        );
    }
}

export default reduxForm({
    form: "organization",
    fields: [
        "name"
    ],
    validate: validate
})(UpsertOrganizationForm);
