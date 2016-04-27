import {map} from "ramda";
import React, {Component, PropTypes} from "react";
import {Button, Input} from "react-bootstrap";
import {reduxForm} from "redux-form";

import AWSRegionSelect from "components/aws-region-select";
import CollapsibleParagraph from "components/collapsible-paragraph";
import Spacer from "components/spacer";

function validate (values) {
    return map(value => (
        typeof value === "string" && value.length > 0 ? null : "Required"
    ), values);
}

class SettingsForm extends Component {

    static propTypes = {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        saved: PropTypes.bool.isRequired
    }

    getFieldBsStyle (field) {
        return (field.touched && field.error ? "error" : null);
    }

    render () {
        const {fields, handleSubmit, saved} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Input
                    bsStyle={this.getFieldBsStyle(fields.awsAccessKeyId)}
                    help={fields.awsAccessKeyId.error}
                    label="AWS Access Key Id"
                    placeholder="AWS_ACCESS_KEY_ID"
                    type="text"
                    {...fields.awsAccessKeyId}
                />
                <Input
                    bsStyle={this.getFieldBsStyle(fields.awsSecretAccessKey)}
                    help={fields.awsSecretAccessKey.error}
                    label="AWS Secret Access Key"
                    placeholder="AWS_SECRET_ACCESS_KEY"
                    type="text"
                    {...fields.awsSecretAccessKey}
                />
                <AWSRegionSelect
                    bsStyle={this.getFieldBsStyle(fields.awsRegion)}
                    help={fields.awsRegion.error}
                    {...fields.awsRegion}
                />
                <Input
                    bsStyle={this.getFieldBsStyle(fields.backendEndpoint)}
                    help={fields.backendEndpoint.error}
                    label="Backend endpoint"
                    placeholder="https://api.lk-architecture.org"
                    type="text"
                    {...fields.backendEndpoint}
                />
                <CollapsibleParagraph title="Advanced">
                    <Input
                        bsStyle={this.getFieldBsStyle(fields.dynamodbEndpoint)}
                        help={fields.dynamodbEndpoint.error}
                        label="DynamoDB Endpoint"
                        placeholder="localhost:8000"
                        type="text"
                        {...fields.dynamodbEndpoint}
                    />
                    <Spacer direction={"h"} size={10} />
                </CollapsibleParagraph>
                <Button bsStyle={saved ? "success" : "default"} type="submit">
                    {saved ? "Succesfully saved" : "Save"}
                </Button>
            </form>
        );
    }

}

export default reduxForm({
    form: "settings",
    fields: [
        "awsAccessKeyId",
        "awsSecretAccessKey",
        "awsRegion",
        "backendEndpoint",
        "dynamodbEndpoint",
        "kinesisEndpoint",
        "s3Endpoint"
    ],
    validate: validate
})(SettingsForm);
